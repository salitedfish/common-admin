<template>
  <main-layout>
    <template v-slot:menu>
      <main-menu></main-menu>
    </template>

    <template v-slot:head>
      <main-head></main-head>
    </template>

    <template v-slot:tabs>
      <main-tabs></main-tabs>
    </template>

    <template v-slot:page>
      <page-layout>
        <RouterView></RouterView>
      </page-layout>
    </template>
  </main-layout>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { onBeforeRouteUpdate, useRoute } from "vue-router";
import type { RouteRecordNormalized, RouteLocationNormalized } from "vue-router";
import { useLoadingBar } from "naive-ui";

import mainLayout from "./mainLayout.vue";
import mainMenu from "./mainMenu.vue";
import mainHead from "./mainHead.vue";
import mainTabs from "./mainTabs.vue";
import pageLayout from "@/component/page/pageLayout.vue";

import { useRouteStore } from "@/store";

import { useCommonStore } from "@/store/commonStore";
import { useNeedLogin } from "@/util";

const routeStore = useRouteStore();
const route = useRoute();
const loadingBar = useLoadingBar();
const commonStore = useCommonStore();

// 初始化和路由改变时，设置当前路由路径(用于面包屑展示)
// 里面的loadingbar只是一个视觉效果
const updateRoutePath = (matched: RouteRecordNormalized[]) => {
  loadingBar.start();
  setTimeout(() => {
    loadingBar.finish();
  }, 500);
  routeStore.updateCurrentRoutePath(matched);
};

// 记录历史路由，用于tab切换
const updateHistoryRoutes = (to: RouteLocationNormalized) => {
  const route = {
    name: to.name as string,
    label: to.meta.label as string,
    query: to.query as Record<string, string>,
    key: to.fullPath,
    meta: to.meta as Record<string, string | boolean>,
  };

  routeStore.addHistoryRoutes(route);
};

// 初始化和每次路由更新时都检查一次，是否有token和用户信息，没有则需要重新登录
// 初始化和每次路由更新时都监听，更新路由路径和历史路由
onMounted(() => {
  useNeedLogin();
  updateHistoryRoutes(route);
  updateRoutePath(route.matched);
});

onBeforeRouteUpdate((to) => {
  useNeedLogin();
  updateHistoryRoutes(to);
  updateRoutePath(to.matched);
});
</script>

<style scoped lang="less"></style>
