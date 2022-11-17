<template>
  <main-layout>
    <template v-slot:menu>
      <main-menu></main-menu>
    </template>

    <template v-slot:head>
      <main-head></main-head>
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
import type { RouteRecordNormalized } from "vue-router";
import { useLoadingBar } from "naive-ui";

import mainLayout from "./mainLayout.vue";
import mainMenu from "./mainMenu.vue";
import mainHead from "./mainHead.vue";
import pageLayout from "@/component/page/pageLayout.vue";

import { useRouteStore } from "@/store";
import { useNeedLogin } from "@/util";

const routeStore = useRouteStore();
const route = useRoute();
const loadingBar = useLoadingBar();

// 初始化和路由改变时，设置当前路由路径(用于面包屑展示)
// 里面的loadingbar只是一个视觉效果
const updateRoutePath = (matched: RouteRecordNormalized[]) => {
  loadingBar.start();
  setTimeout(() => {
    loadingBar.finish();
  }, 500);
  routeStore.updateCurrentRoutePath(matched);
};

// 初始化和每次路由更新时都检查一次，是否有token，没有则需要重新登录
onMounted(() => {
  useNeedLogin();
  updateRoutePath(route.matched);
});

onBeforeRouteUpdate((to) => {
  useNeedLogin();
  updateRoutePath(to.matched);
});
</script>

<style scoped lang="less"></style>
