import { ref } from "vue";
import { defineStore } from "pinia";

export const useCommonStore = defineStore("commonStore", () => {
  const pageContentHeight = ref(600);
  const pageLoading = ref(false);
  const setPageContentHeight = (height: number) => {
    pageContentHeight.value = height;
  };
  return {
    pageContentHeight,
    setPageContentHeight,
    pageLoading,
  };
});
