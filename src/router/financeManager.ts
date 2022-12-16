import type { RouteRecordRaw } from "vue-router";

export default <RouteRecordRaw[]>[
  {
    path: "financeListManager",
    name: "financeListManager",
    component: () => import("@/view/financeManager/financeListManager/financeListManager.vue"),
    meta: {
      label: "资产流水",
      icon: "dingdan",
      // keepAlive: true,
      id: 6001,
    },
  },
  {
    path: "profitShareManager",
    name: "profitShareManager",
    component: () => import("@/view/financeManager/profitShareManager/profitShareManager.vue"),
    meta: {
      label: "分账管理",
      icon: "fenzhangguanli",
      // keepAlive: true,
      id: 6011,
    },
  },
  {
    path: "goodsBlockChainRecordManager",
    name: "goodsBlockChainRecordManager",
    component: () => import("@/view/financeManager/goodsBlockChainRecordManager/goodsBlockChainRecordManager.vue"),
    meta: {
      label: "商品区块链记录",
      icon: "qukuailian",
      // keepAlive: true,
      id: 6021,
    },
  },
  {
    path: "pointsBlockChainRecordManager",
    name: "pointsBlockChainRecordManager",
    component: () => import("@/view/financeManager/pointsBlockChainRecordManager/pointsBlockChainRecordManager.vue"),
    meta: {
      label: "积分区块链记录",
      icon: "qukuailian",
      // keepAlive: true,
      id: 6022,
    },
  },
];
