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
      keepAlive: true,
    },
  },
  {
    path: "manualAirdropManager",
    name: "manualAirdropManager",
    component: () => import("@/view/operactionManager/manualAirdropManager/manualAirdropManager.vue"),
    meta: {
      label: "空投管理",
      icon: "kongtou",
      keepAlive: true,
    },
  },
  {
    path: "addManualAirdrop",
    name: "addManualAirdrop",
    component: () => import("@/view/operactionManager/manualAirdropDetail/manualAirdropDetail.vue"),
    meta: {
      label: "新增空投",
      icon: "kongtou",
      keepAlive: true,
    },
  },
  {
    path: "editManualAirdrop",
    name: "editManualAirdrop",
    component: () => import("@/view/operactionManager/manualAirdropDetail/manualAirdropDetail.vue"),
    meta: {
      label: "编辑空投",
      icon: "kongtou",
      keepAlive: true,
    },
  },
  {
    path: "manaualAirdropWhiteListManager",
    name: "manaualAirdropWhiteListManager",
    component: () => import("@/view/operactionManager/manaualAirdropWhiteListManager/manaualAirdropWhiteListManager.vue"),
    meta: {
      label: "空投白名单",
      icon: "dingdan",
    },
  },
  {
    path: "timingAirdropManager",
    name: "timingAirdropManager",
    component: () => import("@/view/operactionManager/timingAirdropManager/timingAirdropManager.vue"),
    meta: {
      label: "定时空投任务",
      icon: "kongtou",
      keepAlive: true,
    },
  },
  {
    path: "addTimingAirdrop",
    name: "addTimingAirdrop",
    component: () => import("@/view/operactionManager/timingAirdropDetail/timingAirdropDetail.vue"),
    meta: {
      label: "新增空投任务",
      icon: "kongtou",
      keepAlive: true,
    },
  },
  {
    path: "checkTimingAirdrop",
    name: "checkTimingAirdrop",
    component: () => import("@/view/operactionManager/timingAirdropDetail/timingAirdropDetail.vue"),
    meta: {
      label: "查看空投任务",
      icon: "kongtou",
      keepAlive: true,
    },
  },
  {
    path: "editTimingAirdrop",
    name: "editTimingAirdrop",
    component: () => import("@/view/operactionManager/timingAirdropDetail/timingAirdropDetail.vue"),
    meta: {
      label: "编辑空投任务",
      icon: "kongtou",
      keepAlive: true,
    },
  },
  {
    path: "searchManager",
    name: "searchManager",
    component: () => import("@/view/operactionManager/searchManager/searchManager.vue"),
    meta: {
      label: "搜索管理",
      icon: "sousuo",
      keepAlive: true,
    },
  },
  {
    path: "bulletinBoardManager",
    name: "bulletinBoardManager",
    component: () => import("@/view/operactionManager/bulletinBoardManager/bulletinBoardManager.vue"),
    meta: {
      label: "公告管理",
      icon: "gonggao",
      keepAlive: true,
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
      keepAlive: true,
    },
  },
];
