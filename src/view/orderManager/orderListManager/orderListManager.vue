<template>
  <n-card>
    <screen-header @submitSearch="submitSearch" :searching="searching"></screen-header>
  </n-card>
  <n-data-table :single-line="false" :columns="createColumns()" :data="list" :scroll-x="listXWidth" :max-height="listYHeight" :loading="searching"></n-data-table>
  <n-card>
    <n-pagination v-model:page="searchParam.page" :page-count="totalPage" @update:page="getList" />
  </n-card>
</template>

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
import type { OrderListItem, OrderListParam } from "@/type/Order";
const dialog = useDialog();
const isAdmin = useAuthStore().isAdmin();

// 列表渲染函数
const createColumns = () => {
  const list: DataTableColumns<OrderListItem> = [
    {
      title: "订单编号",
      key: "orderId",
      width: 180,
    },
    {
      title: "商品名称",
      key: "goodsName",
      width: 100,
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
      width: 100,
      render(order) {
        return h(NImage, {
          width: 50,
          src: order.goodsCover,
        });
      },
    },
    {
      title: "商品编号",
      key: "goodsId",
      width: 180,
    },
    {
      title: "商品类型",
      key: "goodsType",
      width: 100,
      render(order) {
        return goodsTypeList[order.goodsType].label;
      },
    },
    {
      title: "订单类型",
      key: "orderType",
      width: 100,
      render(order) {
        return orderTypeList[order.orderType].label;
      },
    },
    {
      title: "购买数量",
      key: "orderNum",
      width: 100,
    },
    {
      title: "订单单价",
      key: "orderPrice",
      width: 100,
    },
    {
      title: "订单总价",
      key: "orderTotalAmount",
      width: 100,
    },

    {
      title: "付款渠道",
      key: "payChannel",
      width: 100,
      render(order) {
        return payChannelList[order.payChannel].label;
      },
    },
    {
      title: "订单创建时间",
      key: "orderTime",
      width: 180,
    },
    {
      title: "订单支付时间",
      key: "payTime",
      width: 180,
    },
    {
      title: "订单状态",
      key: "orderState",
      width: 100,
      render(order) {
        return orderStateList[order.orderState].label;
      },
    },
    {
      title: "开票状态",
      key: "invoiceState",
      width: 100,
      render(order) {
        return invoiceState[order.invoiceState].label;
      },
    },

    // {
    //   title: "邀请人UID",
    //   key: "inviterUid",
    //   width: 140,
    // },
    {
      title: "操作",
      key: "operaction",
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
                  default: "线下支付确认",
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
                { default: "差错同步确认" }
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
      width: 100,
    });
    list.splice(0, 0, {
      title: "商户编号",
      key: "merchantUid",
      width: 100,
    });
  }
  return list;
};

const { totalPage, getList, searchParam, list, listXWidth, listYHeight, searching, submitSearch } = useListPage<OrderListParam, OrderListItem>(getListRequest, createColumns, 228);

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
