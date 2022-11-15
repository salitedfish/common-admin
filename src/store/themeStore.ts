import { reactive, ref } from "vue";
import { defineStore } from "pinia";
import { lightTheme, darkTheme } from "naive-ui";
import type { GlobalThemeOverrides, GlobalTheme } from "naive-ui";

export const useThemeStore = defineStore("themt", () => {
  // 主题列表
  const themeList = reactive<{ lib: GlobalTheme; libThemeOverrides: GlobalThemeOverrides; custom: string }[]>([
    {
      lib: lightTheme,
      libThemeOverrides: {
        common: {
          primaryColor: "#2d8cf0",
        },
      },
      custom: "custom-light",
    },
    {
      lib: darkTheme,
      libThemeOverrides: {
        common: {
          primaryColor: "#2d8cf0",
        },
      },
      custom: "custom-dark",
    },
  ]);
  // 当前主题
  const activeTheme = ref(1);

  const switchNaiveUITheme = () => {
    activeTheme.value++;
    if (activeTheme.value >= themeList.length) activeTheme.value = 0;
    // document.body.className = themeList[activeTheme.value].custom;
  };

  // document.body.className = themeList[activeTheme.value].custom;

  return {
    themeList,
    activeTheme,
    switchNaiveUITheme,
  };
});
