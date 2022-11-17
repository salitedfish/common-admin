import { ref } from "vue";
import { useSetLStorage, useGetLStorage } from "@ultra-man/noa";
import router from "@/router";
import { commonNotify } from "@/util/common";
import { login as loginRequest } from "@/request";
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

// 检查本地token hook
export const useNeedLogin = () => {
  const token = useGetLStorage("token")(null);
  if (!token) {
    commonNotify("warning", "未找到登录信息，请重新登录!");
    router.push({
      name: "login",
    });
  }
};
