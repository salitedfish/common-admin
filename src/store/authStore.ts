import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { UserRole, type RemoteRoute } from "@/type/Common";

import type { UserInfo } from "@/type/Auth";
import { useSetLStorage, useGetLStorage } from "@ultra-man/noa";

export const useAuthStore = defineStore("authStore", () => {
  // const devCompletedRoutes: string[] = ["homeManager", "goodsListManager"];

  const userInfo = ref<UserInfo | null>(<UserInfo | null>useGetLStorage("userInfo")(null));
  // 将用户信息同时保存在store和storage
  const setUserInfo = (info: UserInfo) => {
    userInfo.value = info;
    useSetLStorage("userInfo")(info);
  };

  // 判断是不是管理员
  const isAdmin = computed(() => {
    return userInfo.value?.role === UserRole.ADMIN;
  });

  // 每个账号涉及到的具体权限
  const authIds = ref<number[]>([]);
  const setAuthList = (remoteRote: RemoteRoute[]) => {
    // for(const item of remoteRote) {
    //   for() {
    //   }
    // }
    // authIds.value = remoteRote;
  };
  return {
    userInfo,
    setUserInfo,
    isAdmin,

    authIds,
    setAuthList,
  };
});
