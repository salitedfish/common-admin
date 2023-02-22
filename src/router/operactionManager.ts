import type { RouteRecordRaw } from "vue-router";

export default <RouteRecordRaw[]>[
  {
    path: "goodsRecommendManager",
    name: "goodsRecommendManager",
    component: () => import("@/view/operactionManager/goodsRecommendManager/goodsRecommendManager.vue"),
    meta: {
      label: "商品推荐",
      icon: "tuijian",
      id: 5001,
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
      id: 5011,
    },
  },
  {
    path: "lotteryDetail",
    name: "lotteryDetail",
    component: () => import("@/view/operactionManager/lotteryDetail/lotteryDetail.vue"),
    meta: {
      label: "抽签详情",
      icon: "choujiang",
      keepAlive: true,
    },
  },
  {
    path: "lotteryWhiteListAll",
    name: "lotteryWhiteListAll",
    component: () => import("@/view/operactionManager/lotteryWhiteListAll/lotteryWhiteListAll.vue"),
    meta: {
      label: "参与名单",
      icon: "choujiang",
      keepAlive: true,
    },
  },
  {
    path: "lotteryWhiteListUpload",
    name: "lotteryWhiteListUpload",
    component: () => import("@/view/operactionManager/lotteryWhiteLIstUpload/lotteryWhiteListUpload.vue"),
    meta: {
      label: "白名单",
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
      id: 5021,
    },
  },
  {
    path: "manualAirdropManager/addManualAirdrop",
    name: "addManualAirdrop",
    component: () => import("@/view/operactionManager/manualAirdropDetail/manualAirdropDetail.vue"),
    meta: {
      label: "新增空投",
      icon: "kongtou",
      keepAlive: true,
    },
  },
  {
    path: "manualAirdropManager/editManualAirdrop",
    name: "editManualAirdrop",
    component: () => import("@/view/operactionManager/manualAirdropDetail/manualAirdropDetail.vue"),
    meta: {
      label: "编辑空投",
      icon: "kongtou",
      keepAlive: true,
    },
  },
  {
    path: "manualAirdropManager/manaualAirdropWhiteListManager",
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
      id: 5022,
    },
  },
  {
    path: "timingAirdropManager/addTimingAirdrop",
    name: "addTimingAirdrop",
    component: () => import("@/view/operactionManager/timingAirdropDetail/timingAirdropDetail.vue"),
    meta: {
      label: "新增空投任务",
      icon: "kongtou",
      keepAlive: true,
    },
  },
  {
    path: "timingAirdropManager/checkTimingAirdrop",
    name: "checkTimingAirdrop",
    component: () => import("@/view/operactionManager/timingAirdropDetail/timingAirdropDetail.vue"),
    meta: {
      label: "查看空投任务",
      icon: "kongtou",
      keepAlive: true,
    },
  },
  {
    path: "timingAirdropManager/editTimingAirdrop",
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
      id: 5031,
    },
  },
  {
    path: "addSearchKeywords",
    name: "addSearchKeywords",
    component: () => import("@/view/operactionManager/searchKeywordsDetail/searchKeywordsDetail.vue"),
    meta: {
      label: "添加关键词",
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
      id: 5041,
    },
  },
  {
    path: "bulletinBoardManager/addBulletinBoard",
    name: "addBulletinBoard",
    component: () => import("@/view/operactionManager/bulletinBoardDetailManager/bulletinBoardDetailManager.vue"),
    meta: {
      label: "新增公告",
      icon: "gonggao",
      keepAlive: true,
    },
  },
  {
    path: "bulletinBoardManager/checkBulletinBoard",
    name: "checkBulletinBoard",
    component: () => import("@/view/operactionManager/bulletinBoardDetailManager/bulletinBoardDetailManager.vue"),
    meta: {
      label: "查看公告",
      icon: "gonggao",
      keepAlive: true,
    },
  },
  {
    path: "bulletinBoardManager/editBulletinBoard",
    name: "editBulletinBoard",
    component: () => import("@/view/operactionManager/bulletinBoardDetailManager/bulletinBoardDetailManager.vue"),
    meta: {
      label: "编辑公告",
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
      id: 5051,
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
      id: 5061,
    },
  },
  {
    path: "bannerManager/addBanner",
    name: "addBanner",
    component: () => import("@/view/operactionManager/bannerDetail/bannerDetail.vue"),
    meta: {
      label: "添加Banner",
      icon: "shuffling-banner",
      keepAlive: true,
    },
  },
  {
    path: "bannerManager/editBanner",
    name: "editBanner",
    component: () => import("@/view/operactionManager/bannerDetail/bannerDetail.vue"),
    meta: {
      label: "编辑Banner",
      icon: "shuffling-banner",
      keepAlive: true,
    },
  },
];
