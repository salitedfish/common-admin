<template>
  <n-config-provider :theme="themeList[activeTheme].lib" :theme-overrides="themeList[activeTheme].libThemeOverrides">
    <n-global-style />
    <n-loading-bar-provider>
      <n-notification-provider>
        <RouterView />
      </n-notification-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useThemeStore } from "@/store";

// 获取主题
const themeStore = useThemeStore();
const { themeList, activeTheme } = storeToRefs(themeStore);
</script>

<style scoped lang="less"></style>
