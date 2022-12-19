import type { RouteRecordRaw } from "vue-router";

export default <RouteRecordRaw[]>[
  {
    path: "userListManager",
    name: "userListManager",
    component: () => import("@/view/userManager/userListManager/userListManager.vue"),
    meta: {
      label: "用户管理",
      icon: "yonghu1",
      keepAlive: true,
      id: 4001,
    },
  },
  {
    path: "userAssetManager",
    name: "userAssetManager",
    component: () => import("@/view/userManager/userAssetManager/userAssetsManager.vue"),
    meta: {
      label: "用户资产",
      icon: "zichan",
      id: 4011,
    },
  },
  {
    path: "userPointsManager",
    name: "userPointsManager",
    component: () => import("@/view/userManager/userPointsManager/userPointsManager.vue"),
    meta: {
      label: "用户积分",
      icon: "jifen",
      id: 4021,
    },
  },
  {
    path: "adminMerchantManager",
    name: "adminMerchantManager",
    component: () => import("@/view/userManager/adminMerchantManager/adminMerchantManager.vue"),
    meta: {
      label: "后台用户管理",
      icon: "shanghuguanli",
      keepAlive: true,
      id: 4031,
    },
  },
];
