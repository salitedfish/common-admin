import { ref } from "vue";
import { useSetLStorage, useGetLStorage, useRmLStorage } from "@ultra-man/noa";
import router from "@/router";
import { commonNotify } from "@/util/common";
import { login as loginRequest, logout as logoutRequest, getUserInfo as getUserInfoRequest } from "@/request";
import type * as RequestParam from "@/request/type/RequestParam";

// 登录hook
export const useLogin = () => {
  const loginState = ref(false);
  const loginDisabled = ref(false);

  const login = async (params: RequestParam.Login) => {
    loginState.value = true;
    loginDisabled.value = true;
    const res = await loginRequest(params);
    if (res && res.code === 0) {
      useSetLStorage("token")(res.data.authentication);
      await getUserInfo();
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
  const res = await getUserInfoRequest();
  if (res && res.code === 0) {
    useSetLStorage("userInfo")(res.data);
  }
  return res;
};

// 退出hook
export const useLogout = () => {
  const logoutState = ref(false);

  const logout = async () => {
    logoutState.value = true;
    const res = await logoutRequest();
    if (res && res.code === 0) {
      useRmLStorage("token");
    }
    logoutState.value = false;
    return res;
  };

  return {
    logoutState,
    logout,
  };
};

// 检查本地token和用户信息 hook
export const useNeedLogin = () => {
  const token = useGetLStorage("token")(null);
  const userInfo = useGetLStorage("userInfo")(null);
  if (!token || !userInfo) {
    commonNotify("warning", "未找到登录信息，请重新登录!");
    router.push({
      name: "login",
    });
  }
};
