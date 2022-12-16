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
  // {
  //   path: "homeManager",
  //   name: "homeManager",
  //   component: () => import("@/view/homeManager/homeManager.vue"),
  //   meta: {
  //     label: "主页",
  //     icon: "zhuye",
  //     divider: "divider_1",
  //     show: true,
  //     id: 0,
  //   },
  // },
  {
    path: "goodsManager",
    name: "goodsManager",
    component: () => import("@/component/page/pageView.vue"),
    children: goodsManager,
    meta: {
      label: "商品中心",
      icon: "shangpin",
      id: 1000,
    },
  },
  {
    path: "pointsManager",
    name: "pointsManager",
    component: () => import("@/component/page/pageView.vue"),
    children: pointsManager,
    meta: {
      label: "积分中心",
      icon: "jifen",
      id: 2000,
    },
  },
  {
    path: "userManager",
    name: "userManager",
    component: () => import("@/component/page/pageView.vue"),
    children: userManager,
    meta: {
      label: "用户中心",
      icon: "yonghu1",
      id: 4000,
    },
  },
  {
    path: "orderManager",
    name: "orderManager",
    component: () => import("@/component/page/pageView.vue"),
    children: orderManager,
    meta: {
      label: "订单中心",
      icon: "dingdan",
      id: 3000,
    },
  },
  {
    path: "financeManager",
    name: "financeManager",
    component: () => import("@/component/page/pageView.vue"),
    children: financeManager,
    meta: {
      label: "财务中心",
      icon: "zichan",
      id: 6000,
    },
  },
  {
    path: "operactionManager",
    name: "operactionManager",
    component: () => import("@/component/page/pageView.vue"),
    children: operactionManager,
    meta: {
      label: "运营中心",
      icon: "yunyingguanli",
      id: 5000,
    },
  },
  {
    path: "systemManager",
    name: "systemManager",
    component: () => import("@/component/page/pageView.vue"),
    children: systemManager,
    meta: {
      label: "平台中心",
      icon: "xitong",
      id: 7000,
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
