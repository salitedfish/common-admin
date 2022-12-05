<template>
  <router-view v-slot="{ Component }">
    <keep-alive :include="cacheList">
      <component :is="Component" :key="$route.fullPath"></component>
    </keep-alive>
  </router-view>
</template>

<script lang="ts" setup>
// 框架
import { computed } from "vue";
// 组件库
// 自定义组件
// 工具库
// 自定义工具
// 网络请求
// store
import { useRouteStore } from "@/store/routeStore";
// 类型

const routeStore = useRouteStore();

// 1、缓存出现在tab栏里的路由组件
// 2、要求组件名和列表的路由名称一致, 且路由meta设置了keepAlive
// 3、如果多个路由使用了同一个组件，则只有当路由名和组件名一致的组件缓存时，其他路由组件才能缓存！！！
const cacheList = computed(() => {
  return routeStore.historyRoutes
    .filter((item) => {
      return item.meta.keepAlive;
    })
    .map((item) => {
      return item.name;
    });
});
</script>

<style scoped lang="less"></style>
