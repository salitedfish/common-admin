<template>
  <n-config-provider :locale="zhCN" :date-locale="dateZhCN" :theme="themeList[activeTheme].lib" :theme-overrides="themeList[activeTheme].libThemeOverrides">
    <!-- <n-theme-editor> -->
    <n-global-style />
    <n-loading-bar-provider>
      <n-dialog-provider>
        <n-notification-provider>
          <RouterView />
        </n-notification-provider>
      </n-dialog-provider>
    </n-loading-bar-provider>
    <!-- </n-theme-editor> -->
  </n-config-provider>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { zhCN, dateZhCN } from "naive-ui";
import { useGetLStorage } from "@ultra-man/noa";
import { storeToRefs } from "pinia";
import { useThemeStore } from "@/store";
import { useCommonStore } from "@/store/commonStore";

// 根据env配置的VITE_APP_NAME修改title和ico
const commonStore = useCommonStore();
onMounted(() => {
  const titleDoms = document.getElementsByTagName("title");
  for (let i = 0; i <= titleDoms.length - 1; i++) {
    titleDoms[i].innerHTML = commonStore.appName;
  }

  const iconDom = document.getElementById("logoIco") as HTMLLinkElement;
  iconDom ? (iconDom.href = import.meta.env.VITE_APP_ICO) : null;
});

// 获取主题
const themeStore = useThemeStore();
const { themeList, activeTheme } = storeToRefs(themeStore);
themeStore.switchTheme(Number(useGetLStorage("theme")(0)));
</script>

<style scoped lang="less"></style>
