import type { RouteRecordRaw } from "vue-router";

export default <RouteRecordRaw[]>[
  {
    path: "goodsListManager",
    name: "goodsListManager",
    component: () => import("@/view/goodsManager/goodsListManager/goodsListManager.vue"),
    meta: {
      label: "商品管理",
      icon: "dingdan",
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
