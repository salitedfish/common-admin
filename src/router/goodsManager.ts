import type { RouteRecordRaw } from "vue-router";

export default <RouteRecordRaw[]>[
  {
    path: "goodsListManager",
    name: "goodsListManager",
    component: () => import("@/view/goodsManager/goodsListManager/goodsListManager.vue"),
    meta: {
      label: "商品管理",
      icon: "dingdan",
      keepAlive: true,
    },
  },
  {
    path: "goodsWhiteListManager",
    name: "goodsWhiteListManager",
    component: () => import("@/view/goodsManager/goodsWhiteListManager/goodsWhiteListManager.vue"),
    meta: {
      label: "商品白名单",
      icon: "dingdan",
    },
  },
  {
    path: "goodsAddManager",
    name: "goodsAddManager",
    component: () => import("@/view/goodsManager/goodsDetailManager/goodsDetailManager.vue"),
    meta: {
      label: "新增商品",
      icon: "dingdan",
      keepAlive: true,
    },
  },
  {
    path: "goodsCheckManager",
    name: "goodsCheckManager",
    component: () => import("@/view/goodsManager/goodsDetailManager/goodsDetailManager.vue"),
    meta: {
      label: "商品详情",
      icon: "dingdan",
      keepAlive: true,
    },
  },
  {
    path: "goodsEditManager",
    name: "goodsEditManager",
    component: () => import("@/view/goodsManager/goodsDetailManager/goodsDetailManager.vue"),
    meta: {
      label: "编辑商品",
      icon: "dingdan",
      keepAlive: true,
    },
  },
  {
    path: "goodsClazzManager",
    name: "goodsClazzManager",
    component: () => import("@/view/goodsManager/goodsClazzManager/goodsClazzManager.vue"),
    meta: {
      label: "商品类目",
      icon: "tubiaozhizuomoban",
    },
  },
];
