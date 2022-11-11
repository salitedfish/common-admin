import { ref } from "vue";
import { defineStore } from "pinia";
import { lightTheme, darkTheme } from "naive-ui";
import type { GlobalThemeOverrides, GlobalTheme } from "naive-ui";

export const useThemeStore = defineStore("themt", () => {
  // native-ui的主题管理
  const naiveUIThemeOverrides: GlobalThemeOverrides = {};
  const naiveUITheme = ref<GlobalTheme>(lightTheme);

  const switchNaiveUITheme = () => {
    naiveUITheme.value = naiveUITheme.value === lightTheme ? darkTheme : lightTheme;
  };

  return {
    naiveUITheme,
    naiveUIThemeOverrides,
    switchNaiveUITheme,
  };
});
