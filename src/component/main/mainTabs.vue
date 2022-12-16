<template>
  <div class="tabs">
    <n-dropdown trigger="hover" :options="options" @select="handleSelect">
      <custom-icon name="cuowuguanbiquxiao-yuankuang" :size="20" style="margin-right: 10px; cursor: pointer"></custom-icon>
    </n-dropdown>

    <n-tabs :value="routeStore.currentRoute.key" @update:value="handleClick" type="card" :closable="closableRef" tab-style="min-width: 80px;" @close="handleClose">
      <n-tab-pane v-for="(item, index) in routeStore.historyRoutes" :key="index" :name="item.key" :tab="item.label"> </n-tab-pane>
    </n-tabs>
  </div>
</template>

<script lang="ts" setup>
// 框架
// 组件库
// 自定义组件
import customIcon from "../common/customIcon.vue";
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

const options = [
  {
    label: "关闭其他页面",
    key: "clearOthers",
  },
];

const handleSelect = () => {
  routeStore.clearHistoryRoute();
};
</script>

<style scoped lang="less">
.tabs {
  display: flex;
  padding: 0 18px;
  align-items: center;
}
.n-tabs {
  flex: 1;
  width: 0;
}
.n-tab-pane {
  display: none;
}
</style>
