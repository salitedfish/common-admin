import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { UserRole } from "@/type/Common";
import type { UserInfo } from "@/type/Auth";

export const useAuthStore = defineStore("authStore", () => {
  // const devCompletedRoutes: string[] = ["homeManager", "goodsListManager"];

  const userInfo = ref<UserInfo | null>(null);
  const setUserInfo = (info: UserInfo) => {
    userInfo.value = info;
  };

  // 判断是不是管理员
  const isAdmin = computed(() => {
    return userInfo.value?.role === UserRole.ADMIN;
  });
  return {
    userInfo,
    setUserInfo,
    isAdmin,
  };
});
