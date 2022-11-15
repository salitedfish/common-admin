import type { RouteRecordRaw } from "vue-router";

export default <RouteRecordRaw[]>[
  {
    path: "goodsListManager",
    name: "goodsListManager",
    component: () => import("@/view/goodsManager/goodsListManager/goodsListManager.vue"),
  },
];
