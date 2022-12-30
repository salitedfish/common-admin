<template>
  <n-card>
    <screen-header @submitSearch="submitSearch" :searching="searching"></screen-header>
  </n-card>
  <n-data-table :single-line="false" :columns="createColumns()" :data="list" :scroll-x="listXWidth" :max-height="listYHeight" :loading="searching"></n-data-table>
  <n-card>
    <n-pagination v-model:page="searchParam.page" :page-count="totalPage" @update:page="getList" />
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

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "expressListManager",
});
</script>
<script lang="ts" setup>
// 框架
import { ref, h, reactive } from "vue";
// 组件库
import { NImage, NButton, NSpace, NEllipsis } from "naive-ui";
// 自定义组件
import screenHeader from "./screenHeader.vue";
import customIcon from "@/component/common/customIcon.vue";
import layoutScrollCard from "@/component/common/layoutScrollCard.vue";
import expressCompanySelect from "@/component/common/expressCompanySelect.vue";
// 工具库
// 自定义工具
import { commonNotify, useListPage } from "@/util/common";
// 网络请求
import { getExpressOrderList as getExpressOrderListRequest, getExpressLogistics as getExpressLogisticsRequest, expressDelivery as expressDeliveryRequest } from "@/request/order";
// store
import { useAuthStore } from "@/store/authStore";
import { ExpressOrderState } from "./expressListManagerStore";
// 类型
import type { VNode } from "vue";
import type { DataTableColumns } from "naive-ui";
import type { ExpressOrderListItem, LogisticsInfo } from "@/type/Order";
import { expressOrderStateList } from "./expressListManagerStore";

const authStore = useAuthStore();
const isAdmin = authStore.isAdmin;

// 列表渲染函数
const createColumns = () => {
  const list: DataTableColumns<ExpressOrderListItem> = [
    {
      title: "订单编号",
      key: "orderId",
      align: "center",
      width: 180,
    },
    {
      title: "商品编号",
      key: "goodsId",
      align: "center",
      width: 180,
    },
    {
      title: "商品名称",
      key: "goodsName",
      width: 180,
      align: "center",
      fixed: "left",
    },
    // {
    //   title: "订单名称",
    //   key: "orderName",
    //   width: 180,
    //   fixed: "left",
    // },
    {
      title: "商品封面",
      key: "goodsCover",
      align: "center",
      width: 100,
      render(row) {
        return h(NImage, {
          width: 30,
          src: row.goodsCover,
        });
      },
    },

    {
      title: "用户编号",
      key: "uid",
      align: "center",
      width: 100,
    },
    {
      title: "收货人",
      key: "userName",
      align: "center",
      width: 80,
    },
    {
      title: "收货号码",
      key: "userPhone",
      align: "center",
      width: 120,
    },
    {
      title: "所在地区",
      key: "userRegion",
      align: "center",
      width: 180,
      render(order) {
        return h(
          NEllipsis,
          {},
          {
            default: () => order.userRegion,
          }
        );
      },
    },
    {
      title: "详细地址",
      key: "userLocation",
      align: "center",
      width: 180,
    },
    {
      title: "提货备注",
      key: "userNote",
      align: "center",
      width: 180,
    },
    {
      title: "快递名称",
      key: "expressName",
      align: "center",
      width: 100,
    },
    {
      title: "快递单号",
      key: "expressCode",
      align: "center",
      width: 180,
    },
    {
      title: "订单状态",
      key: "orderState",
      align: "center",
      width: 100,
      render(order) {
        return expressOrderStateList.getItem(order.orderState)?.label;
      },
    },
    {
      title: "提货时间",
      key: "orderTime",
      align: "center",
      width: 180,
      render(order) {
        return order.orderTime || "-";
      },
    },
    {
      title: "发货时间",
      key: "deliveryTime",
      align: "center",
      width: 180,
      render(order) {
        return order.deliveryTime || "-";
      },
    },
    {
      title: "完成时间",
      key: "finishTime",
      align: "center",
      width: 180,
      render(order) {
        return order.finishTime || "-";
      },
    },
    // {
    //   title: "取消时间",
    //   key: "cancelTime",
    //   align: "center",
    //   width: 180,
    //   render(order) {
    //     return order.cancelTime || "-";
    //   },
    // },

    {
      title: "操作",
      key: "operaction",
      width: 100,
      align: "center",
      fixed: "right",
      render(order) {
        const btnList: VNode[] = [];
        if (order.orderState === ExpressOrderState.BEFORE_EXPRESS && !authStore.isAdmin) {
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

  if (isAdmin) {
    list.splice(0, 0, {
      title: "商户名称",
      key: "merchantName",
      align: "center",
      width: 100,
    });
    list.splice(0, 0, {
      title: "商户编号",
      key: "merchantUid",
      align: "center",
      width: 100,
    });
  }
  return list;
};

const { totalPage, getList, searchParam, list, listXWidth, listYHeight, searching, submitSearch } = useListPage(getExpressOrderListRequest, createColumns);

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
    await getList();
    commonNotify("success", "确认发货成功");
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
    logisticsInfo.value.data.reverse();
  }
  logisticsLoading.value = false;
};
</script>

<style scoped lang="less">
.step-box {
  padding: 4px;
}
</style>
