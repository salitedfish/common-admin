<template>
  <div class="tabs">
    <n-tabs :value="routeStore.currentRoute.label" @update:value="handleClick" type="card" :closable="closableRef" tab-style="min-width: 80px;" @close="handleClose">
      <n-tab-pane v-for="(item, index) in routeStore.historyRoutes" :key="index" :name="item.label"> </n-tab-pane>
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

const handleClose = (label: string) => {
  routeStore.deleteHistoryRoutes(label);
};
const handleClick = (label: string) => {
  routeStore.selectHistoryRoutes(label);
};
</script>

<style scoped lang="less">
.tabs {
  padding: 0 18px;
}
</style>
