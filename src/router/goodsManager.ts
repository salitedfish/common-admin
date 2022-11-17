import type { RouteRecordRaw } from "vue-router";

export default <RouteRecordRaw[]>[
  {
    path: "goodsListManager",
    name: "goodsListManager",
    component: () => import("@/view/goodsManager/goodsListManager/goodsListManager.vue"),
    meta: {
      label: "商品列表",
      icon: "shangpinliebiao",
      show: true,
    },
  },
  {
    path: "goodsCategoryManager",
    name: "goodsCategoryManager",
    component: () => import("@/view/goodsManager/goodsCategoryManager/goodsCategoryManager.vue"),
    meta: {
      label: "商品类目",
      icon: "leimu2",
    },
  },
];
