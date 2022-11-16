import { createRouter, createWebHistory } from "vue-router";

import goodsManager from "./goodsManager";
import userManager from "./userManager";

// 具体的页面路由
export const routes = [
  {
    path: "goodsManager",
    name: "goodsManager",
    component: () => import("@/view/goodsManager/goodsManager.vue"),
    children: goodsManager,
    meta: {
      label: "商品管理",
      icon: "goods-copy",
    },
  },
  {
    path: "userManager",
    name: "userManager",
    component: () => import("@/view/userManager/userManager.vue"),
    children: userManager,
    meta: {
      label: "用户管理",
      icon: "yonghuguanli-yonghuguanli",
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
