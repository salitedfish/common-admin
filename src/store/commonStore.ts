import { ref } from "vue";
import { defineStore } from "pinia";

export const useCommonStore = defineStore("commonStore", () => {
  // app的名字
  const appName = import.meta.env.VITE_APP_NAME;
  // 页面减去padding后主要内容的高度
  const pageContentHeight = ref(0);
  const pageLoading = ref(false);
  const setPageContentHeight = (height: number) => {
    // 减去padding
    pageContentHeight.value = height - 60;
  };
  // 年
  const yearMap = [
    { label: "1月", value: 1 },
    { label: "2月", value: 2 },
    { label: "3月", value: 3 },
    { label: "4月", value: 4 },
    { label: "5月", value: 5 },
    { label: "6月", value: 6 },
    { label: "7月", value: 7 },
    { label: "8月", value: 8 },
    { label: "9月", value: 9 },
    { label: "10月", value: 10 },
    { label: "11月", value: 11 },
    { label: "12月", value: 12 },
  ];
  // 周
  const weekMap = [
    { label: "周一", value: 1 },
    { label: "周二", value: 2 },
    { label: "周三", value: 3 },
    { label: "周四", value: 4 },
    { label: "周五", value: 5 },
    { label: "周六", value: 6 },
    { label: "周日", value: 7 },
  ];
  // 月
  const monthMap = [
    { label: "1号", value: 1 },
    { label: "2号", value: 2 },
    { label: "3号", value: 3 },
    { label: "4号", value: 4 },
    { label: "5号", value: 5 },
    { label: "6号", value: 6 },
    { label: "7号", value: 7 },
    { label: "8号", value: 8 },
    { label: "9号", value: 9 },
    { label: "10号", value: 10 },
    { label: "11号", value: 11 },
    { label: "12号", value: 12 },
    { label: "13号", value: 13 },
    { label: "14号", value: 14 },
    { label: "15号", value: 15 },
    { label: "16号", value: 16 },
    { label: "17号", value: 17 },
    { label: "18号", value: 18 },
    { label: "19号", value: 19 },
    { label: "20号", value: 20 },
    { label: "21号", value: 21 },
    { label: "22号", value: 22 },
    { label: "23号", value: 23 },
    { label: "24号", value: 24 },
    { label: "25号", value: 25 },
    { label: "26号", value: 26 },
    { label: "27号", value: 27 },
    { label: "28号", value: 28 },
  ];
  // 小时
  const hourMap = [
    { label: "0：00", value: 0 },
    { label: "1：00", value: 1 },
    { label: "2：00", value: 2 },
    { label: "3：00", value: 3 },
    { label: "4：00", value: 4 },
    { label: "5：00", value: 5 },
    { label: "6：00", value: 6 },
    { label: "7：00", value: 7 },
    { label: "8：00", value: 8 },
    { label: "9：00", value: 9 },
    { label: "10：00", value: 10 },
    { label: "11：00", value: 11 },
    { label: "12：00", value: 12 },
    { label: "13：00", value: 13 },
    { label: "14：00", value: 14 },
    { label: "15：00", value: 15 },
    { label: "16：00", value: 16 },
    { label: "17：00", value: 17 },
    { label: "18：00", value: 18 },
    { label: "19：00", value: 19 },
    { label: "20：00", value: 20 },
    { label: "21：00", value: 21 },
    { label: "22：00", value: 22 },
    { label: "23：00", value: 23 },
  ];

  return {
    appName,
    pageContentHeight,
    setPageContentHeight,
    pageLoading,
    yearMap,
    weekMap,
    monthMap,
    hourMap,
  };
});
