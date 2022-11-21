import { createRouter, createWebHistory } from "vue-router";

import goodsManager from "./goodsManager";
import orderManager from "./orderManager";
import financeManager from "./financeManager";
import operactionManager from "./operactionManager";
import pointsManager from "./pointsManager";
import userManager from "./userManager";
import systemManager from "./systemManager";

// 具体的页面路由
export const routes = [
  {
    path: "homeManager",
    name: "homeManager",
    component: () => import("@/view/homeManager/homeManager.vue"),
    meta: {
      label: "主页",
      icon: "zhuye",
      divider: "divider_1",
      show: true,
    },
  },
  {
    path: "goodsManager",
    name: "goodsManager",
    component: () => import("@/view/goodsManager/goodsManager.vue"),
    children: goodsManager,
    meta: {
      label: "商品中心",
      icon: "shangpin",
    },
  },
  {
    path: "pointsManager",
    name: "pointsManager",
    component: () => import("@/view/pointsManager/pointsManager.vue"),
    children: pointsManager,
    meta: {
      label: "积分中心",
      icon: "jifen",
    },
  },
  {
    path: "userManager",
    name: "userManager",
    component: () => import("@/view/userManager/userManager.vue"),
    children: userManager,
    meta: {
      label: "用户中心",
      icon: "yonghu1",
    },
  },
  {
    path: "orderManager",
    name: "orderManager",
    component: () => import("@/view/orderManager/orderManager.vue"),
    children: orderManager,
    meta: {
      label: "订单中心",
      icon: "dingdan",
    },
  },
  {
    path: "financeManager",
    name: "financeManager",
    component: () => import("@/view/financeManager/financeManager.vue"),
    children: financeManager,
    meta: {
      label: "财务中心",
      icon: "zichan",
    },
  },
  {
    path: "operactionManager",
    name: "operactionManager",
    component: () => import("@/view/operactionManager/operactionManager.vue"),
    children: operactionManager,
    meta: {
      label: "运营中心",
      icon: "yunyingguanli",
    },
  },
  {
    path: "systemManager",
    name: "systemManager",
    component: () => import("@/view/systemManager/systemManager.vue"),
    children: systemManager,
    meta: {
      label: "平台中心",
      icon: "xitong",
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/login",
      meta: {
        label: "登录",
        icon: "zhuye",
      },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/component/login/loginPage.vue"),
      meta: {
        label: "登录",
        icon: "zhuye",
      },
    },
    {
      path: "/settle",
      name: "settle",
      component: () => import("@/component/settle/settlePage.vue"),
      meta: {
        label: "企业入驻",
        icon: "zhuye",
      },
    },
    {
      path: "/manager",
      name: "manager",
      redirect: "/manager/homeManager",
      component: () => import("@/component/main/mainPage.vue"),
      children: routes,
      meta: {
        label: "管理后台",
        icon: "zhuye",
      },
    },
    {
      path: "/:catchAll(.*)",
      redirect: "/login",
    },
  ],
});

export default router;
