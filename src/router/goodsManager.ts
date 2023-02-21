import type { RouteRecordRaw } from "vue-router";

export default <RouteRecordRaw[]>[
  {
    path: "goodsListManager",
    name: "goodsListManager",
    component: () => import("@/view/goodsManager/goodsListManager/goodsListManager.vue"),
    meta: {
      label: "商品管理",
      icon: "dingdan",
      keepAlive: true,
      id: 1001,
    },
  },
  {
    path: "goodsListManager/editBlindBox",
    name: "editBlindBox",
    component: () => import("@/view/goodsManager/blindBoxDetail/blindBoxDetail.vue"),
    meta: {
      label: "编辑盲盒",
      icon: "dingdan",
      keepAlive: true,
    },
  },
  {
    path: "goodsListManager/checkBlindBox",
    name: "checkBlindBox",
    component: () => import("@/view/goodsManager/blindBoxDetail/blindBoxDetail.vue"),
    meta: {
      label: "查看盲盒",
      icon: "dingdan",
      keepAlive: true,
    },
  },
  {
    path: "goodsListManager/blindBoxOpenRecord",
    name: "blindBoxOpenRecord",
    component: () => import("@/view/goodsManager/blindBoxOpenRecord/blindBoxOpenRecord.vue"),
    meta: {
      label: "查看开盒记录",
      icon: "dingdan",
      keepAlive: true,
    },
  },
  {
    path: "goodsListManager/goodsPublishRecord",
    name: "goodsPublishRecord",
    component: () => import("@/view/goodsManager/goodsPublishRecord/goodsPublishRecord.vue"),
    meta: {
      label: "发行记录",
      icon: "dingdan",
      keepAlive: true,
    },
  },
  {
    path: "goodsListManager/goodsWhiteListManager",
    name: "goodsWhiteListManager",
    component: () => import("@/view/goodsManager/goodsWhiteListManager/goodsWhiteListManager.vue"),
    meta: {
      label: "商品白名单",
      icon: "dingdan",
    },
  },
  {
    path: "goodsListManager/goodsAddManager",
    name: "goodsAddManager",
    component: () => import("@/view/goodsManager/goodsDetailManager/goodsDetailManager.vue"),
    meta: {
      label: "新增商品",
      icon: "dingdan",
      keepAlive: true,
    },
  },
  {
    path: "goodsListManager/goodsCheckManager",
    name: "goodsCheckManager",
    component: () => import("@/view/goodsManager/goodsDetailManager/goodsDetailManager.vue"),
    meta: {
      label: "商品详情",
      icon: "dingdan",
      keepAlive: true,
    },
  },
  {
    path: "goodsListManager/goodsEditManager",
    name: "goodsEditManager",
    component: () => import("@/view/goodsManager/goodsDetailManager/goodsDetailManager.vue"),
    meta: {
      label: "编辑商品",
      icon: "dingdan",
      keepAlive: true,
    },
  },
  {
    path: "goodsListManager/consignmentParameter",
    name: "consignmentParameter",
    component: () => import("@/view/goodsManager/consignmentParameter/ConsignmentParameter.vue"),
    meta: {
      label: "修改转赠类型与分账比例",
      icon: "dingdan",
      keepAlive: true,
    },
  },
  {
    path: "goodsClazzManager",
    name: "goodsClazzManager",
    component: () => import("@/view/goodsManager/goodsClazzManager/goodsClazzManager.vue"),
    meta: {
      label: "商品类目",
      icon: "tubiaozhizuomoban",
      keepAlive: true,
      id: 1011,
    },
  },
  {
    path: "goodsListManager/syntheticDetail",
    name: "syntheticDetail",
    component: () => import("@/view/goodsManager/syntheticDetail/syntheticDetail.vue"),
    meta: {
      label: "合成规则",
      icon: "tubiaozhizuomoban",
      keepAlive: true,
    },
  },
];
