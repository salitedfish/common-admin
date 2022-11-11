<template>
  <n-config-provider :theme="themeStore.naiveUITheme" :theme-overrides="themeStore.naiveUIThemeOverrides">
    <RouterView />
  </n-config-provider>
</template>

<script lang="ts" setup>
import { NConfigProvider } from "naive-ui";
import { useThemeStore } from "@/store";

// 获取主题
const themeStore = useThemeStore();
</script>

<style scoped lang="less"></style>
