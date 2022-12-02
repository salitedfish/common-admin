<template>
  <n-card>
    <screen-header @submitSearch="submitSearch" :searching="searching"></screen-header>
  </n-card>
  <n-data-table :single-line="false" :columns="createColumns()" :data="list" :scroll-x="listXWidth" :max-height="listYHeight" :loading="searching"></n-data-table>
  <n-card>
    <n-pagination v-model:page="searchParam.page" :page-count="totalPage" @update:page="getOrderList" />
  </n-card>
  <!-- 查看物流 -->
  <n-modal style="height: 600px; width: 1000px" :show="showLogisticsModal" @update:show="(state: boolean) => {showLogisticsModal = state }">
    <layoutScrollCard :loading="logisticsLoading">
      <div class="step-box" v-if="!logisticsLoading && logisticsInfo?.data && logisticsInfo?.data.length >= 1">
        <n-steps vertical :current="logisticsInfo?.data?.length">
          <n-step v-for="(item, index) in logisticsInfo?.data" :key="index" :title="item.time" :description="item.context">
            <template #icon>
              <customIcon name="wuliu" :size="14"></customIcon>
            </template>
          </n-step>
        </n-steps>
      </div>
      <div v-else-if="!logisticsLoading" style="text-align: center">未查询到物流信息，请稍后再试</div>
    </layoutScrollCard>
  </n-modal>

  <!-- 发货modal -->
  <n-modal :show="showExpressModal" @update:show="(state: boolean) => {showExpressModal = state }">
    <n-card style="width: 600px" :title="'发货' + currentOrder?.orderName" :bordered="false" size="huge" role="dialog" aria-modal="true">
      <template #header-extra>
        <customIcon name="guanbi" :size="16" @click="showExpressModal = false"></customIcon>
      </template>

      <n-form label-placement="left" label-width="80px" label-align="left">
        <n-form-item label="快递单号:">
          <n-input v-model="expressInfo.orderId" placeholder="请输入快递单号" :disabled="expressLoading"></n-input>
        </n-form-item>
        <n-form-item label="物流公司:">
          <expressCompanySelect v-model="expressInfo.expressName" :disabled="expressLoading"></expressCompanySelect>
        </n-form-item>
      </n-form>

      <template #footer>
        <div style="display: flex; justify-content: end">
          <n-button type="primary" inline-block @click="comfirmExpress" :disabled="expressLoading" :loading="expressLoading">确认</n-button>
        </div>
      </template>
    </n-card>
  </n-modal>
</template>

<script lang="ts" setup>
// 框架
import { computed, ref, onBeforeMount, h, reactive } from "vue";
// 组件库
import { NImage, NButton, NSpace, useDialog } from "naive-ui";
// 自定义组件
import screenHeader from "./screenHeader.vue";
import customIcon from "@/component/common/customIcon.vue";
import layoutScrollCard from "@/component/common/layoutScrollCard.vue";
import expressCompanySelect from "@/component/common/expressCompanySelect.vue";
// 工具库
// 自定义工具
import { commonNotify } from "@/util/common";
// 网络请求
import { getExpressOrderList as getExpressOrderListRequest, getExpressLogistics as getExpressLogisticsRequest, expressDelivery as expressDeliveryRequest } from "@/request/order";
// store
import { useCommonStore } from "@/store/commonStore";
import { useAuthStore } from "@/store/authStore";
import { ExpressOrderState } from "./expressListManagerStore";
// 类型
import type { VNode } from "vue";
import type { DataTableColumns } from "naive-ui";
import type { ExpressOrderListItem, ExpressOrderListParam, LogisticsInfo } from "@/type/Order";
import type * as RequestParam from "@/request/type/RequestParam";
import { expressOrderStateList } from "./expressListManagerStore";

const commonStore = useCommonStore();
const authStore = useAuthStore();
const dialog = useDialog();

// 列表宽度和高度
const listXWidth = computed(() => {
  let width = 0;
  const list = createColumns();
  for (const item of list) {
    width = (item.width as number) + width;
  }
  return width;
});
const listYHeight = computed(() => {
  return commonStore.pageContentHeight - 185;
});

// 筛选的参数
const searchParam = ref<RequestParam.GetExpressOrderList>({
  page: 1,
  size: 10,
});
// 数据总数
const totalPage = ref(0);
// 查询状态
const searching = ref(false);
// 展示的列表
const list = ref<ExpressOrderListItem[]>([]);
// 请求列表
const getOrderList = async () => {
  searching.value = true;
  const res = await getExpressOrderListRequest(searchParam.value);
  if (res) {
    list.value = res.data.data;
    totalPage.value = res.data.totalPage;
  }
  searching.value = false;
};

// 组合请求参数
const submitSearch = (params: ExpressOrderListParam) => {
  searchParam.value = { ...searchParam.value, ...params };
  getOrderList();
};

// 列表渲染函数
const createColumns = () => {
  const list: DataTableColumns<ExpressOrderListItem> = [
    {
      title: "订单名称",
      key: "orderName",
      width: 180,
      fixed: "left",
    },
    {
      title: "订单编号",
      key: "orderId",
      width: 180,
    },
    {
      title: "订单状态",
      key: "orderState",
      width: 100,
      render(order) {
        return expressOrderStateList[order.orderState].label;
      },
    },
    {
      title: "商品名称",
      key: "goodsName",
      width: 180,
    },
    {
      title: "商品编号",
      key: "goodsId",
      width: 180,
    },
    {
      title: "商品封面",
      key: "goodsCover",
      width: 100,
      render(row) {
        return h(NImage, {
          width: 50,
          src: row.goodsCover,
        });
      },
    },
    {
      title: "用户编号",
      key: "uid",
      width: 100,
    },
    {
      title: "收货人",
      key: "userName",
      width: 80,
    },
    {
      title: "收货号码",
      key: "userPhone",
      width: 120,
    },
    {
      title: "详细地址",
      key: "userLocation",
      width: 180,
    },
    {
      title: "所在地区",
      key: "userRegion",
      width: 180,
    },
    {
      title: "提货备注",
      key: "userNote",
      width: 180,
    },
    {
      title: "快递单号",
      key: "expressCode",
      width: 180,
    },
    {
      title: "快递名称",
      key: "expressName",
      width: 100,
    },
    {
      title: "提货时间",
      key: "orderTime",
      width: 180,
    },
    {
      title: "发货时间",
      key: "deliveryTime",
      width: 180,
    },
    {
      title: "完成时间",
      key: "finishTime",
      width: 180,
    },
    {
      title: "取消时间",
      key: "cancelTime",
      width: 180,
    },

    {
      title: "商铺名称",
      key: "merchantName",
      width: 100,
    },
    {
      title: "商铺Uid",
      key: "merchantUid",
      width: 100,
    },
    {
      title: "操作",
      key: "operaction",
      width: 100,
      fixed: "right",
      render(order) {
        const btnList: VNode[] = [];
        if (order.orderState === ExpressOrderState.BEFORE_EXPRESS && !authStore.isAdmin()) {
          btnList.push(
            h(
              NButton,
              {
                type: "primary",
                size: "small",
                secondary: true,
                onClick: () => {
                  handleExpress(order);
                },
              },
              {
                default: () => "发货确认",
              }
            )
          );
        }
        if ([ExpressOrderState.AFTER_EXPRESS, ExpressOrderState.RECEICED].includes(order.orderState)) {
          btnList.push(
            h(
              NButton,
              {
                type: "primary",
                size: "small",
                secondary: true,
                onClick: () => {
                  checkLogistics(order);
                },
              },
              {
                default: () => "查看物流",
              }
            )
          );
        }
        // 用来放按钮的容器
        const btnBox = h(NSpace, {}, { default: () => btnList });
        return btnBox;
      },
    },
  ];
  return list;
};

const currentOrder = ref<ExpressOrderListItem | null>(null);

// 发货
const showExpressModal = ref(false);
const expressLoading = ref(false);
const expressInfo = reactive({
  expressCode: "",
  expressName: "",
  orderId: "",
});
const handleExpress = async (order: ExpressOrderListItem) => {
  currentOrder.value = order;
  showExpressModal.value = true;
  expressInfo.orderId = currentOrder.value.orderId;
};
const comfirmExpress = async () => {
  expressLoading.value = true;
  const res = await expressDeliveryRequest(expressInfo);
  if (res) {
    commonNotify("success", "确认发货成功");
    await getOrderList();
    showExpressModal.value = false;
  }
  expressLoading.value = false;
};

// 查看物流
const showLogisticsModal = ref(false);
const logisticsInfo = ref<LogisticsInfo | null>(null);
const logisticsLoading = ref(false);
const checkLogistics = async (order: ExpressOrderListItem) => {
  currentOrder.value = order;
  showLogisticsModal.value = true;
  logisticsLoading.value = true;
  const res = await getExpressLogisticsRequest({ orderId: order.orderId });
  if (res) {
    logisticsInfo.value = res.data;
  }
  logisticsLoading.value = false;
};

// 初始获取一次列表
onBeforeMount(() => {
  getOrderList();
});
</script>

<style scoped lang="less">
.step-box {
  padding: 4px;
}
</style>
