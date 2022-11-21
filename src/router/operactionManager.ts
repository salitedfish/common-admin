import type { RouteRecordRaw } from "vue-router";

export default <RouteRecordRaw[]>[
  {
    path: "goodsRecommendManager",
    name: "goodsRecommendManager",
    component: () => import("@/view/operactionManager/goodsRecommendManager/goodsRecommendManager.vue"),
    meta: {
      label: "商品推荐",
      icon: "tuijian",
    },
  },
  {
    path: "lotteryManager",
    name: "lotteryManager",
    component: () => import("@/view/operactionManager/lotteryManager/lotteryManager.vue"),
    meta: {
      label: "抽签管理",
      icon: "choujiang",
    },
  },
  {
    path: "airdropManager",
    name: "airdropManager",
    component: () => import("@/view/operactionManager/airdropManager/airdropManager.vue"),
    meta: {
      label: "空投管理",
      icon: "kongtou",
    },
  },
  {
    path: "searchManager",
    name: "searchManager",
    component: () => import("@/view/operactionManager/searchManager/searchManager.vue"),
    meta: {
      label: "搜索管理",
      icon: "sousuo",
    },
  },
  {
    path: "bulletinBoardManager",
    name: "bulletinBoardManager",
    component: () => import("@/view/operactionManager/bulletinBoardManager/bulletinBoardManager.vue"),
    meta: {
      label: "公告管理",
      icon: "gonggao",
    },
  },
  {
    path: "bulletinBoardCalzzManager",
    name: "bulletinBoardCalzzManager",
    component: () => import("@/view/operactionManager/bulletinBoardCalzzManager/bulletinBoardCalzzManager.vue"),
    meta: {
      label: "公告类目",
      icon: "tubiaozhizuomoban",
    },
  },
  {
    path: "bannerManager",
    name: "bannerManager",
    component: () => import("@/view/operactionManager/bannerManager/bannerManager.vue"),
    meta: {
      label: "Banner管理",
      icon: "shuffling-banner",
    },
  },
];
