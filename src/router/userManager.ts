import type { RouteRecordRaw } from "vue-router";

export default <RouteRecordRaw[]>[
  {
    path: "userListManager",
    name: "userListManager",
    component: () => import("@/view/userManager/userListManager/userListManager.vue"),
    meta: {
      label: "用户管理",
      icon: "yonghu1",
    },
  },
  {
    path: "userAssetManager",
    name: "userAssetManager",
    component: () => import("@/view/userManager/userAssetManager/userAssetManager.vue"),
    meta: {
      label: "用户资产",
      icon: "zichan",
    },
  },
  {
    path: "userPointsManager",
    name: "userPointsManager",
    component: () => import("@/view/userManager/userPointsManager/userPointsManager.vue"),
    meta: {
      label: "用户积分",
      icon: "jifen",
    },
  },
  {
    path: "merchantManager",
    name: "merchantManager",
    component: () => import("@/view/userManager/merchantManager/merchantManager.vue"),
    meta: {
      label: "商户管理",
      icon: "sahnghuguanli",
    },
  },
];
