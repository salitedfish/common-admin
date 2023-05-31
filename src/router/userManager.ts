import type { RouteRecordRaw } from "vue-router";

export default <RouteRecordRaw[]>[
  // {
  //   path: "authManager",
  //   name: "authManager",
  //   component: () => import("@/view/userManager/authManager/authManager.vue"),
  //   meta: {
  //     label: "权限管理",
  //     icon: "quanxian",
  //     keepAlive: true,
  //     id: 4001,
  //   },
  // },
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
    path: "vipLevelManager",
    name: "vipLevelManager",
    component: () => import("@/view/userManager/vipLevelManager/vipLevelManager.vue"),
    meta: {
      label: "vip设置",
      icon: "vip",
      keepAlive: true,
      id: 4002,
    },
  },
  {
    path: "userAssetManager",
    name: "userAssetManager",
    component: () => import("@/view/userManager/userAssetManager/userAssetsManager.vue"),
    meta: {
      label: "用户资产",
      icon: "zichan",
      keepAlive: true,
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
      keepAlive: true,
      id: 4021,
    },
  },
  {
    path: "userParallelCoinManager",
    name: "userParallelCoinManager",
    component: () => import("@/view/userManager/userParallelCoinManager/userParallelCoinManager.vue"),
    meta: {
      label: "用户代币",
      icon: "taojinbi",
      keepAlive: true,
      id: 4022,
    },
  },
  {
    path: "adminMerchantManager",
    name: "adminMerchantManager",
    component: () => import("@/view/userManager/adminMerchantManager/adminMerchantManager.vue"),
    meta: {
      label: "后台用户",
      icon: "shanghuguanli",
      keepAlive: true,
      id: 4031,
    },
  },
];
