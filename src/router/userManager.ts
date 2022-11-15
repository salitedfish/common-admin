import type { RouteRecordRaw } from "vue-router";

export default <RouteRecordRaw[]>[
  {
    path: "userListManager",
    name: "userListManager",
    component: () => import("@/view/goodsManager/goodsListManager/goodsListManager.vue"),
    meta: {
      label: "用户列表",
      icon: "wenjianguanli",
    },
  },
];
