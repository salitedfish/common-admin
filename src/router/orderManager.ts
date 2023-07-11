import type { RouteRecordRaw } from "vue-router";

export default <RouteRecordRaw[]>[
  {
    path: "orderListManager",
    name: "orderListManager",
    component: () => import("@/view/orderManager/orderListManager/orderListManager.vue"),
    meta: {
      label: "订单管理",
      icon: "dingdan",
      keepAlive: true,
      id: 3001,
    },
  },
  {
    path: "orderPromoDetail",
    name: "orderPromoDetail",
    component: () => import("@/view/orderManager/orderPromoDetail/orderPromoDetail.vue"),
    meta: {
      label: "订单营销信息",
      icon: "dingdan",
      keepAlive: true,
    },
  },
  {
    path: "orderPayDetail",
    name: "orderPayDetail",
    component: () => import("@/view/orderManager/orderPayDetail/orderPayDetail.vue"),
    meta: {
      label: "订单支付信息",
      icon: "dingdan",
      keepAlive: true,
    },
  },
  {
    path: "invoiceListManager",
    name: "invoiceListManager",
    component: () => import("@/view/orderManager/invoiceListManager/invoiceListManager.vue"),
    meta: {
      label: "订单开票",
      icon: "fapiao",
      keepAlive: true,
      id: 3011,
    },
  },

  {
    path: "expressListManager",
    name: "expressListManager",
    component: () => import("@/view/orderManager/expressListManager/expressListManager.vue"),
    meta: {
      label: "提货管理",
      icon: "tihuoshenqing",
      keepAlive: true,
      id: 3021,
    },
  },

  {
    path: "refundFroceInfo",
    name: "refundFroceInfo",
    component: () => import("@/view/orderManager/refundFroceInfo/refundFroceInfo.vue"),
    meta: {
      label: "退款信息",
      icon: "tihuoshenqing",
      keepAlive: true,
    },
  },
];
