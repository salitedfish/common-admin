import { createRouter, createWebHistory } from "vue-router";

import goodsManager from "./goodsManager";
import userManager from "./userManager";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/manager/goodsManager",
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
      redirect: "/manager/goodsManager",
    },
  ],
});

export default router;
