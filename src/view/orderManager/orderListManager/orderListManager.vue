<template>
  <n-card>
    <screen-header @submitSearch="submitSearch" :searching="searching"></screen-header>
  </n-card>
  <n-data-table :single-line="false" :columns="createColumns()" :data="list" :scroll-x="listXWidth" :max-height="listYHeight" :loading="searching"></n-data-table>
  <n-card>
    <n-pagination v-model:page="searchParam.page" :page-count="totalPage" @update:page="getList" />
  </n-card>

  <n-modal :show="showRefundDialog" @update:show="(state: boolean) => (showRefundDialog = state)">
    <n-card style="width: 600px" title="退款审核" :bordered="false" size="huge" role="dialog" aria-modal="true">
      <template #header-extra>
        <custom-icon name="guanbi" :size="16" @click="showRefundDialog = false"></custom-icon>
      </template>

      <n-form label-placement="left" label-width="80px" label-align="left">
        <n-form-item label="审核备注:">
          <n-input v-model:value="refundInfo.note" placeholder="请输入审核备注"></n-input>
        </n-form-item>
        <n-form-item label="审核结果:">
          <n-select v-model:value="refundInfo.state" :options="refundExamStateList" placeholder="请选择审核结果" />
        </n-form-item>
      </n-form>

      <template #footer>
        <div style="display: flex; justify-content: end">
          <n-button type="primary" inline-block @click="handleRefund" :disabled="refundIng" :loading="refundIng">确认</n-button>
        </div>
      </template>
    </n-card>
  </n-modal>

  <n-modal :show="offlinePayComfirmDialog" @update:show="(state: boolean) => (offlinePayComfirmDialog = state)">
    <n-card style="width: 600px" title="线下支付确认" :bordered="false" size="huge" role="dialog" aria-modal="true">
      <template #header-extra>
        <custom-icon name="guanbi" :size="16" @click="offlinePayComfirmDialog = false"></custom-icon>
      </template>

      <n-form label-placement="left" label-width="80px" label-align="left">
        <n-form-item label="是否同意:">
          <n-select v-model:value="offlinePayComfirmInfo.state" :options="refundExamStateList" placeholder="请选择是否同意" />
        </n-form-item>
      </n-form>

      <template #footer>
        <div style="display: flex; justify-content: end">
          <n-button type="primary" inline-block @click="handleOfflinePayComfirm" :disabled="offlinePayComfirming" :loading="offlinePayComfirming">确认</n-button>
        </div>
      </template>
    </n-card>
  </n-modal>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "orderListManager",
});
</script>
<script lang="ts" setup>
// 框架
import { h, ref, reactive } from "vue";
// 组件库
import { NImage, NButton, NSpace, useDialog } from "naive-ui";
// 自定义组件
import screenHeader from "./screenHeader.vue";
import customIcon from "@/component/common/customIcon.vue";
// 工具库
// 自定义工具
import { commonNotify, useListPage } from "@/util/common";
// 网络请求
import {
  getOrderList as getListRequest,
  orderOffLineComfirm as orderOffLineComfirmRequest,
  orderSyncComfirm as orderSyncComfirmRequest,
  orderRefundSyncComfirm as orderRefundSyncComfirmRequest,
  orderRefundComfirm,
} from "@/request/order";
// store
import { useAuthStore } from "@/store/authStore";
import { orderStateList, orderTypeList, payChannelList, OrderState, PayChannel, orderRefundStateList, OrderRefundState, refundExamStateList } from "./orderListManagerStore";
import { goodsTypeList } from "@/view/goodsManager/goodsListManager/goodsListManagerStore";
// 类型
import type { VNode } from "vue";
import type { DataTableColumns } from "naive-ui";
import type { OrderListItem } from "@/type/Order";
const dialog = useDialog();
const isAdmin = useAuthStore().isAdmin;

// 列表渲染函数
const createColumns = () => {
  const list: DataTableColumns<OrderListItem> = [
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
      width: 100,
      align: "center",
      fixed: "left",
    },
    // {
    //   title: "商品名称",
    //   key: "goodsName",
    //   width: 100,
    // },
    {
      title: "商品封面",
      key: "goodsCover",
      align: "center",
      width: 100,
      render(order) {
        return h(NImage, {
          width: 30,
          src: order.goodsCover,
        });
      },
    },

    {
      title: "商品类型",
      key: "goodsType",
      align: "center",
      width: 100,
      render(order) {
        return goodsTypeList.getItem(order.goodsType)?.label;
      },
    },
    {
      title: "订单类型",
      key: "orderType",
      align: "center",
      width: 100,
      render(order) {
        return orderTypeList.getItem(order.orderType)?.label;
      },
    },
    {
      title: "购买数量",
      key: "orderNum",
      align: "center",
      width: 100,
    },
    {
      title: "订单单价",
      key: "orderPrice",
      align: "center",
      width: 100,
    },
    {
      title: "订单总价",
      key: "orderTotalAmount",
      align: "center",
      width: 100,
    },

    {
      title: "付款渠道",
      key: "payChannel",
      align: "center",
      width: 100,
      render(order) {
        return payChannelList.getItem(order.payChannel)?.label || "-";
      },
    },
    {
      title: "订单状态",
      key: "orderState",
      align: "center",
      width: 100,
      render(order) {
        return orderStateList.getItem(order.orderState)?.label;
      },
    },
    {
      title: "退款状态",
      key: "refundState",
      align: "center",
      width: 100,
      render(order) {
        return orderRefundStateList.getItem(order.refundState)?.label || "-";
      },
    },
    {
      title: "订单创建时间",
      key: "orderTime",
      align: "center",
      width: 180,
      render(order) {
        return order.orderTime || "-";
      },
    },
    {
      title: "订单支付时间",
      key: "payTime",
      align: "center",
      width: 180,
      render(order) {
        return order.payTime || "-";
      },
    },
    // {
    //   title: "开票状态",
    //   key: "invoiceState",
    //   align: "center",
    //   width: 100,
    //   render(order) {
    //     return invoiceState.getItem(order.invoiceState)?.label;
    //   },
    // },

    // {
    //   title: "邀请人UID",
    //   key: "inviterUid",
    //   width: 140,
    // },
    {
      title: "操作",
      key: "operaction",
      align: "center",
      width: 140,
      fixed: "right",
      render(order) {
        const btnList: VNode[] = [];
        if (order.orderState === OrderState.IN_PAY) {
          if (order.payChannel === PayChannel.OFF_LINE) {
            btnList.push(
              h(
                NButton,
                {
                  type: "warning",
                  size: "small",
                  secondary: true,
                  onClick: () => {
                    offlinePayComfirmDialog.value = true;
                    offlinePayComfirmInfo.orderId = order.orderId;
                  },
                },
                {
                  default: () => "线下支付确认",
                }
              )
            );
          }
          if (order.payChannel === PayChannel.WX) {
            btnList.push(
              h(
                NButton,
                {
                  type: "warning",
                  size: "small",
                  secondary: true,
                  onClick: () => {
                    orderSyncComfirm(order.orderId);
                  },
                },
                { default: () => "差错同步确认" }
              )
            );
          }
        }
        if (order.refundState === OrderRefundState.REFUND_APPLY) {
          btnList.push(
            h(
              NButton,
              {
                type: "warning",
                size: "small",
                secondary: true,
                onClick: () => {
                  showRefundDialog.value = true;
                  refundInfo.orderId = order.orderId;
                },
              },
              {
                default: () => "退款审核",
              }
            )
          );
        }
        if (order.refundState === OrderRefundState.REFUND_ING) {
          btnList.push(
            h(
              NButton,
              {
                type: "warning",
                size: "small",
                secondary: true,
                onClick: () => {
                  orderRefundSyncComfirm(order.orderId);
                },
              },
              {
                default: () => "退款差错同步确认",
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

const { totalPage, getList, searchParam, list, listXWidth, listYHeight, searching, submitSearch } = useListPage(getListRequest, createColumns, { heightLevel: 1 });

// 差错同步确认
const orderSyncComfirm = (orderId: string) => {
  const dialogInfo = dialog.warning({
    title: "差错同步确认",
    content: "是否确认差错同步",
    positiveText: "确认",
    onPositiveClick: async () => {
      dialogInfo.loading = true;
      const res = await orderSyncComfirmRequest({ orderId });
      if (res) {
        commonNotify("success", "差错同步确认成功");
        await getList();
      }
      dialogInfo.loading = false;
    },
  });
};
// 退款差错同步确认
const orderRefundSyncComfirm = (orderId: string) => {
  const dialogInfo = dialog.warning({
    title: "退款差错同步确认",
    content: "是否确认腿款差错同步",
    positiveText: "确认",
    onPositiveClick: async () => {
      dialogInfo.loading = true;
      const res = await orderRefundSyncComfirmRequest({ orderId });
      if (res) {
        commonNotify("success", "退款差错同步确认成功");
        await getList();
      }
      dialogInfo.loading = false;
    },
  });
};
// 退款相关
const showRefundDialog = ref(false);
const refundIng = ref(false);
const refundInfo = reactive({
  state: null,
  note: "",
  orderId: "",
});
const handleRefund = async () => {
  refundIng.value = true;
  const res = await orderRefundComfirm(refundInfo);
  if (res) {
    commonNotify("success", "退款审核完成");
    await getList();
    showRefundDialog.value = false;
  }
  refundIng.value = false;
};
// 线下支付确认
const offlinePayComfirmDialog = ref(false);
const offlinePayComfirming = ref(false);
const offlinePayComfirmInfo = reactive({
  state: null,
  orderId: "",
});
const handleOfflinePayComfirm = async () => {
  offlinePayComfirming.value = true;
  const res = await orderOffLineComfirmRequest(offlinePayComfirmInfo);
  if (res) {
    commonNotify("success", "线下支付确认操作成功");
    await getList();
    offlinePayComfirmDialog.value = false;
  }
  offlinePayComfirming.value = false;
};
</script>

<style scoped lang="less"></style>
