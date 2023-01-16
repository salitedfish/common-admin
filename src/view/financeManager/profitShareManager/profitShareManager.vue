<template>
  <n-card>
    <screen-section @submitSearch="submitSearch" :searching="searching"></screen-section>
  </n-card>
  <n-data-table :single-line="false" :columns="createColumns()" :data="list" :scroll-x="listXWidth" :max-height="listYHeight" :loading="searching"></n-data-table>
  <n-card>
    <n-pagination v-model:page="searchParam.page" :page-count="totalPage" @update:page="getList" />
  </n-card>

  <n-modal :show="showDialog" @update:show="(state: boolean) => (showDialog = state)">
    <n-card style="width: 700px" title="差错同步确认" :bordered="false" size="huge" role="dialog" aria-modal="true">
      <template #header-extra>
        <custom-icon name="guanbi" :size="16" @click="showDialog = false"></custom-icon>
      </template>

      <n-form label-placement="left" label-width="100px" label-align="left">
        <n-form-item label="更换分账金额:">
          <n-select v-model:value="syncInfo.accept" placeholder="待分账金额大于微信未分账金额时，是否使用微信未分账金进行分账" :options="acceptList" />
        </n-form-item>
        <n-form-item label="处理结果:">
          <n-select v-model:value="syncInfo.state" placeholder="请选择处理结果" :options="asyncActionList" />
        </n-form-item>
      </n-form>

      <template #footer>
        <div style="display: flex; justify-content: end">
          <n-button type="primary" inline-block @click="comfirmSync" :disabled="syncing" :loading="syncing">确认</n-button>
        </div>
      </template>
    </n-card>
  </n-modal>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "profitShareManager",
});
</script>
<script lang="ts" setup>
// 框架
import { h, ref, reactive } from "vue";
// 组件库
import { NSpace, NButton, NEllipsis } from "naive-ui";
// 自定义组件
import screenSection from "./screenSection.vue";
// 工具库
// 自定义工具
import { useListPage, commonNotify } from "@/util/common";
import customIcon from "@/component/common/customIcon.vue";
// 网络请求
import { getProfitShareList, syncProfitShare } from "@/request/finance";
// store
import { useAuthStore } from "@/store/authStore";
import { payChannelList, shareStateList, acceptList, asyncActionList, ShareState, PayChannel } from "./profitShareManagerStore";
import { orderTypeList } from "@/view/orderManager/orderListManager/orderListManagerStore";
// 类型
import type { VNode } from "vue";
import type { DataTableColumns } from "naive-ui";
import type { ProfitShareListItem } from "@/type/Finance";

const isAdmin = useAuthStore().isAdmin;

// 列表项
const createColumns = () => {
  const list: DataTableColumns<ProfitShareListItem> = [
    {
      title: "分账编号",
      key: "inOrderId",
      width: 180,
      align: "center",
    },
    {
      title: "订单编号",
      key: "orderId",
      width: 180,
      align: "center",
    },
    {
      title: "订单类型",
      key: "orderType",
      width: 120,
      align: "center",

      render: (row) => {
        return orderTypeList.getItem(row.orderType)?.label;
      },
    },
    {
      title: "订单总价",
      key: "orderTotalAmount",
      width: 120,
      align: "center",
    },

    // {
    //   title: "商户分账金额",
    //   key: "merchantAmount",
    //   width: 120,
    //   align: "center",
    // },
    // {
    //   title: "商户分账比例(%)",
    //   key: "merchantRate",
    //   width: 140,
    //   align: "center",
    // },
    {
      title: "平台分账比例(%)",
      key: "platformRate",
      width: 140,
      align: "center",
    },
    {
      title: "平台分账金额",
      key: "platformAmount",
      width: 120,
      align: "center",
    },
    {
      title: "分账渠道",
      key: "channelType",
      width: 100,
      align: "center",

      render: (row) => {
        return payChannelList.getItem(row.channelType)?.label;
      },
    },
    {
      title: "第三方分账编号",
      key: "outOrderId",
      width: 180,
      align: "center",
      render(row) {
        return h(
          NEllipsis,
          {},
          {
            default: () => row.outOrderId,
          }
        );
      },
    },
    {
      title: "分账状态",
      key: "state",
      width: 120,
      align: "center",

      render: (row) => {
        return shareStateList.getItem(row.state)?.label;
      },
    },
    {
      title: "分账备注",
      key: "note",
      width: 180,
      align: "center",
    },
    {
      title: "分账时间",
      key: "createTime",
      width: 180,
      align: "center",

      render: (row) => {
        return row.createTime || "-";
      },
    },

    {
      title: "操作",
      key: "operaction",
      width: 120,
      align: "center",

      fixed: "right",
      render(row) {
        const list: VNode[] = [];
        const size = "small";

        if (row.state === ShareState.FAIL && isAdmin) {
          if (row.channelType === PayChannel.WX) {
            list.push(
              h(
                NButton,
                {
                  type: "warning",
                  size,
                  secondary: true,
                  onClick: () => {
                    syncComfirm(row);
                  },
                },
                { default: () => "差错同步确认" }
              )
            );
          }
        }

        // 用来放按钮的容器
        const btnBox = h(NSpace, {}, { default: () => list });
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
      render: (row) => {
        return row.merchantUid === 0 ? "平台" : row.merchantName;
      },
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

// 差错同步确认
const showDialog = ref(false);
const syncing = ref(false);
const syncInfo = reactive({
  accept: null,
  inOrderId: "",
  state: null,
});
const syncComfirm = (row: ProfitShareListItem) => {
  syncInfo.inOrderId = row.inOrderId;
  showDialog.value = true;
};
const comfirmSync = async () => {
  syncing.value = true;
  const res = await syncProfitShare(syncInfo);
  if (res) {
    await getList();
    showDialog.value = false;
    commonNotify("success", "差错同步成功");
  }
  syncing.value = false;
};

const { totalPage, getList, searchParam, list, listXWidth, listYHeight, searching, submitSearch } = useListPage(getProfitShareList, createColumns);
</script>

<style scoped lang="less"></style>
