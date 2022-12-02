<template>
  <div class="tabs">
    <n-tabs :value="routeStore.currentRoute.key" @update:value="handleClick" type="card" :closable="closableRef" tab-style="min-width: 80px;" @close="handleClose">
      <n-tab-pane v-for="(item, index) in routeStore.historyRoutes" :key="index" :name="item.key" :tab="item.label"> </n-tab-pane>
    </n-tabs>
  </div>
</template>

<script lang="ts" setup>
// 框架
// 组件库
// 自定义组件
// 工具库
// 自定义工具
import { useRouteStore } from "@/store/routeStore";
// 网络请求

const routeStore = useRouteStore();
const closableRef = true;

const handleClose = (key: string) => {
  routeStore.deleteHistoryRoutes(key);
};
const handleClick = (key: string) => {
  routeStore.selectHistoryRoutes(key);
};
</script>

<style scoped lang="less">
.tabs {
  padding: 0 18px;
}
.n-tab-pane {
  display: none;
}
</style>
