import type { RouteRecordRaw } from "vue-router";

export default <RouteRecordRaw[]>[
  {
    path: "financeListManager",
    name: "financeListManager",
    component: () => import("@/view/financeManager/financeListManager/financeListManager.vue"),
    meta: {
      label: "资产数据",
      icon: "dingdan",
      keepAlive: true,
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
      keepAlive: true,
      id: 6011,
    },
  },
  {
    path: "parallelCoinWithdrawManager",
    name: "parallelCoinWithdrawManager",
    component: () => import("@/view/financeManager/parallelCoinWithdrawManager/parallelCoinWithdrawManager.vue"),
    meta: {
      label: "提币管理",
      icon: "fenzhangguanli",
      keepAlive: true,
      id: 6013,
    },
  },
  {
    path: "goodsBlockChainRecordManager",
    name: "goodsBlockChainRecordManager",
    component: () => import("@/view/financeManager/goodsBlockChainRecordManager/goodsBlockChainRecordManager.vue"),
    meta: {
      label: "商品区块链记录",
      icon: "qukuailian",
      keepAlive: true,
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
      keepAlive: true,
      id: 6022,
    },
  },
  {
    path: "parallelRecordManager",
    name: "parallelRecordManager",
    component: () => import("@/view/financeManager/parallelRecordManager/parallelRecordManager.vue"),
    meta: {
      label: "代币区块链记录",
      icon: "qukuailian",
      keepAlive: true,
      id: 6023,
    },
  },
];
