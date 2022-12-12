<template>
  <n-card>
    <screen-header @submitSearch="submitSearch" :searching="searching"></screen-header>
  </n-card>
  <n-data-table :single-line="false" :columns="createColumns()" :data="list" :scroll-x="listXWidth" :max-height="listYHeight" :loading="searching"></n-data-table>
  <n-card>
    <n-pagination v-model:page="searchParam.page" :page-count="totalPage" @update:page="getList" />
  </n-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "orderListManager",
});
</script>
<script lang="ts" setup>
// 框架
import { onBeforeMount, h } from "vue";
// 组件库
import { NImage, NButton, NSpace, useDialog } from "naive-ui";
// 自定义组件
import screenHeader from "./screenHeader.vue";
// 工具库
// 自定义工具
import { commonNotify, useListPage } from "@/util/common";
// 网络请求
import { getOrderList as getListRequest, orderOffLineComfirm as orderOffLineComfirmRequest, orderSyncComfirm as orderSyncComfirmRequest } from "@/request/order";
// store
import { useAuthStore } from "@/store/authStore";
import { invoiceState, orderStateList, orderTypeList, payChannelList, OrderState, PayChannel } from "./orderListManagerStore";
import { goodsTypeList } from "@/view/goodsManager/goodsListManager/goodsListManagerStore";
// 类型
import type { VNode } from "vue";
import type { DataTableColumns } from "naive-ui";
import type { OrderListItem } from "@/type/Order";
const dialog = useDialog();
const isAdmin = useAuthStore().isAdmin();

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
          width: 50,
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
        return payChannelList.getItem(order.payChannel)?.label;
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
    {
      title: "订单状态",
      key: "orderState",
      align: "center",
      width: 100,
      render(order) {
        return orderStateList.getItem(order.orderState)?.label;
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
                    orderOffLineComfirm(order.orderId);
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

const { totalPage, getList, searchParam, list, listXWidth, listYHeight, searching, submitSearch } = useListPage(getListRequest, createColumns, 1);

// 线下支付确认
const orderOffLineComfirm = (orderId: string) => {
  const dialogInfo = dialog.warning({
    title: "线下支付确认",
    content: "是否确认线下支付",
    positiveText: "确认",
    onPositiveClick: async () => {
      dialogInfo.loading = true;
      const res = await orderOffLineComfirmRequest({ orderId });
      if (res) {
        getList();
        commonNotify("success", "线下支付确认成功");
      }
      dialogInfo.loading = false;
    },
  });
};
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
        getList();
        commonNotify("success", "差错同步确认成功");
      }
      dialogInfo.loading = false;
    },
  });
};

// 初始获取一次列表
onBeforeMount(() => {
  getList();
});
</script>

<style scoped lang="less"></style>
