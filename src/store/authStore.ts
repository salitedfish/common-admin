import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { UserRole } from "@/type/Common";
import type { Auths, UserInfo } from "@/type/Auth";
import { useSetLStorage, useGetLStorage } from "@ultra-man/noa";

// 获取权限id列表
export const mapAuthIds = (remoteRote: Auths) => {
  const ids: number[] = [];
  const handler = (_remoteRote: Auths, i: number) => {
    const index = i + 1;
    if (index === 3) {
      for (const item of _remoteRote) {
        ids.push(item.id);
      }
    } else {
      for (const item of _remoteRote) {
        if (item.menu) {
          handler(item.menu, index);
        }
      }
    }
  };
  handler(remoteRote, 0);
  return ids;
};

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

  // 权限是否初始化完成，要等到权限初始化完成后才能进行页面的初始化
  const authInited = ref(false);
  // 收集每个账号涉及到的具体权限id
  const authIds = ref<number[]>([]);
  const setAuthIds = (remoteRote: Auths) => {
    authIds.value = mapAuthIds(remoteRote);
    authInited.value = true;
  };

  return {
    userInfo,
    setUserInfo,
    isAdmin,

    authIds,
    setAuthIds,
    authInited,
  };
});
