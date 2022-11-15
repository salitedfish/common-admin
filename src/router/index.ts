import { createRouter, createWebHistory } from "vue-router";

import goodsManager from "./goodsManager";
import userManager from "./userManager";

export const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/component/login/loginPage.vue"),
  },
  {
    path: "/manager",
    name: "manager",
    component: () => import("@/component/main/mainPage.vue"),
    children: [
      {
        path: "goodsManager",
        name: "goodsManager",
        component: () => import("@/view/goodsManager/goodsManager.vue"),
        children: goodsManager,
      },
      {
        path: "userManager",
        name: "userManager",
        component: () => import("@/view/userManager/userManager.vue"),
        children: userManager,
      },
    ],
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/login",
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
