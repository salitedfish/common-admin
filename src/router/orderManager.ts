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
    path: "addInvoice",
    name: "addInvoice",
    component: () => import("@/view/orderManager/addInvoice/addInvoice.vue"),
    meta: {
      label: "开票",
      icon: "fapiao",
      keepAlive: true,
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
];
