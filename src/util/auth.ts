import { ref } from "vue";
import { useSetLStorage, useGetLStorage, useRmLStorage } from "@ultra-man/noa";
import router from "@/router";
import { commonNotify } from "@/util/common";
import { login as loginRequest, logout as logoutRequest, getUserInfo as getUserInfoRequest } from "@/request";
import { useAuthStore } from "@/store/authStore";
import type * as RequestParam from "@/request/type/RequestParam";
import type { Auths } from "@/type/Auth";

// 登录hook
export const useLogin = () => {
  const loginState = ref(false);
  const loginDisabled = ref(false);

  const login = async (params: RequestParam.Login) => {
    loginState.value = true;
    loginDisabled.value = true;
    const res = await loginRequest(params);
    if (res) {
      useSetLStorage("token")(res.data.authentication);
    }
    loginState.value = false;
    loginDisabled.value = false;
    return res;
  };

  return {
    loginState,
    loginDisabled,
    login,
  };
};

// 获取用户信息
export const getUserInfo = async () => {
  const authStore = useAuthStore();
  const res = await getUserInfoRequest();
  if (res) {
    authStore.setUserInfo(res.data);
    return res;
  }
};

// 退出hook
export const useLogout = () => {
  const logoutState = ref(false);

  const logout = async () => {
    logoutState.value = true;
    const res = await logoutRequest();
    if (res) {
      useRmLStorage("token");
      useRmLStorage("userInfo");
    }
    logoutState.value = false;
    return res;
  };

  return {
    logoutState,
    logout,
  };
};

// 检查本地token和用户信息是否全，少一个就需要重新登录
export const useNeedLogin = () => {
  const token = useGetLStorage("token")(null);
  if (!token) {
    commonNotify("warning", "未找到登录信息，请重新登录!");
    router.push({
      name: "login",
    });
  }
  const userInfo = useGetLStorage("userInfo")(null);
  if (!userInfo) {
    getUserInfo();
  }
};

// 获取权限id列表
export const mapAuthIds = (remoteRote: Auths) => {
  const ids: number[] = [];

  const handler = (_remoteRote: Auths, i: number) => {
    const index = i + 1;
    if (index === 3) {
      for (const item of _remoteRote) {
        if (item.checked) ids.push(item.id);
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
