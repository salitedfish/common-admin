import type { RouteRecordRaw } from "vue-router";

export default <RouteRecordRaw[]>[
  {
    path: "financeListManager",
    name: "financeListManager",
    component: () => import("@/view/financeManager/financeListManager/financeListManager.vue"),
    meta: {
      label: "资产流水",
      icon: "dingdan",
      keepAlive: true,
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
    },
  },
  {
    path: "blockChainRecordManager",
    name: "blockChainRecordManager",
    component: () => import("@/view/financeManager/blockChainRecordManager/blockChainRecordManager.vue"),
    meta: {
      label: "区块链记录",
      icon: "qukuailian",
      keepAlive: true,
    },
  },
];
