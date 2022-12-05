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
  {
    path: "addPoints",
    name: "addPoints",
    component: () => import("@/view/pointsManager/pointsDetailManager/pointsDetailManager.vue"),
    meta: {
      label: "新增积分",
      icon: "jifen",
      keepAlive: true,
    },
  },
  {
    path: "editPoints",
    name: "editPoints",
    component: () => import("@/view/pointsManager/pointsDetailManager/pointsDetailManager.vue"),
    meta: {
      label: "编辑积分",
      icon: "jifen",
      keepAlive: true,
    },
  },
];
