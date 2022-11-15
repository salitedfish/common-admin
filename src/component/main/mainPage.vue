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

import mainLayout from "./mainLayout.vue";
import mainMenu from "./mainMenu.vue";
import mainHead from "./mainHead.vue";
import pageLayout from "@/component/common/pageLayout.vue";

import { useRouteStore } from "@/store";

const routeStore = useRouteStore();
const route = useRoute();

// 初始化和路由改变时，设置当前路由路径(用于面包屑展示)
onMounted(() => {
  routeStore.updateCurrentRoutePath(route.matched);
});

onBeforeRouteUpdate((to) => {
  routeStore.updateCurrentRoutePath(to.matched);
});
</script>

<style scoped lang="less"></style>
