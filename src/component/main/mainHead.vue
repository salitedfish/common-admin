<template>
  <section class="main-head">
    <section class="head-left">
      <n-breadcrumb separator="/">
        <n-breadcrumb-item v-for="(item, key) in routeStore.currentRoutePath" :key="key">
          <custom-icon :name="item.meta.icon as string || ''" :size="14"></custom-icon>
          {{ item.meta.label }}
        </n-breadcrumb-item>
      </n-breadcrumb>
    </section>
    <n-button @click="handleClick" type="primary">主题切换</n-button>
  </section>
</template>

<script lang="ts" setup>
import customIcon from "@/component/common/customIcon.vue";
import { useThemeStore, useRouteStore } from "@/store";

const routeStore = useRouteStore();

// 主题控制
const themeStore = useThemeStore();
const handleClick = () => {
  themeStore.switchTheme();
};
</script>

<style scoped lang="less">
.main-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 18px;
}
</style>
