<template>
  <n-config-provider :locale="zhCN" :date-locale="dateZhCN" :theme="themeList[activeTheme].lib" :theme-overrides="themeList[activeTheme].libThemeOverrides">
    <n-global-style />
    <n-loading-bar-provider>
      <n-dialog-provider>
        <n-notification-provider>
          <RouterView />
        </n-notification-provider>
      </n-dialog-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<script lang="ts" setup>
import { zhCN, dateZhCN } from "naive-ui";
import { storeToRefs } from "pinia";
import { useThemeStore } from "@/store";

// 获取主题
const themeStore = useThemeStore();
const { themeList, activeTheme } = storeToRefs(themeStore);
themeStore.switchTheme(activeTheme.value);
</script>

<style scoped lang="less"></style>
