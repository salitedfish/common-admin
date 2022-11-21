import type { RouteRecordRaw } from "vue-router";

export default <RouteRecordRaw[]>[
  {
    path: "pointsListManager",
    name: "pointsListManager",
    component: () => import("@/view/pointsManager/pointsListManager/pointsListManager.vue"),
    meta: {
      label: "积分管理",
      icon: "jifen",
    },
  },
];
