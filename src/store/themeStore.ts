import { reactive, ref } from "vue";
import { defineStore } from "pinia";
import { lightTheme, darkTheme, useThemeVars } from "naive-ui";
import type { GlobalThemeOverrides, GlobalTheme } from "naive-ui";

export const useThemeStore = defineStore("themeStore", () => {
  // 主题列表
  const themeList = reactive<{ lib: GlobalTheme; libThemeOverrides: GlobalThemeOverrides; custom: string }[]>([
    {
      lib: lightTheme,
      libThemeOverrides: {
        common: {
          // primaryColor: "#2d8cf0",
        },
      },
      custom: "custom-light",
    },
    {
      lib: darkTheme,
      libThemeOverrides: {
        common: {
          // primaryColor: "#2d8cf0",
        },
      },
      custom: "custom-dark",
    },
  ]);
  // 当前主题
  const activeTheme = ref(0);

  // 切换主题
  const switchTheme = (index?: number) => {
    if (index !== undefined && index >= 0) {
      activeTheme.value = index;
      document.body.className = themeList[activeTheme.value].custom;
      return;
    }
    activeTheme.value++;
    if (activeTheme.value >= themeList.length) {
      activeTheme.value = 0;
    }
    document.body.className = themeList[activeTheme.value].custom;
  };

  // 获取ui库的css变量
  const themeVar = useThemeVars();

  return {
    themeList,
    activeTheme,
    switchTheme,
    themeVar,
  };
});
