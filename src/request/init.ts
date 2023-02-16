import { UltraFetch, useGetLStorage } from "@ultra-man/noa";
import router from "@/router";

// 这里请求的提示只处理异常和错误的提示，成功的提示在具体的业务里处理
import { commonNotify } from "@/util";

import type { Return } from "@/type/Common";

export enum RequestCodeState {
  SUCCESS = 0,
  ERROR = -1,
  SETTLE_TWO = 351,
  SETTLE_THREE = 352,
  LOGGED_IN_EXPIRED = 301,
  NOT_LOGGED_IN = 302,
  ACCOUNT_FROZEN = 303,
}

// 如果message是个json则获取message中的message，否则直接用message
const getMessage = (response: Return<unknown>) => {
  let message = "";
  try {
    const messageOrigin = JSON.parse(response.message);
    if (messageOrigin.message) {
      message = messageOrigin.message;
    } else {
      message = response.message;
    }
  } catch (err) {
    message = response.message;
  }
  return message;
};

export const ultraFetch = new UltraFetch(
  {
    baseURL: import.meta.env.VITE_SERVICE_URL,
    // baseURL: "/api",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  },
  {
    reqHandler: (config) => {
      config.headers = { ...config.headers, ...{ authentication: useGetLStorage("token")("") as string } };

      return config;
    },
    resHandler: (response) => {
      // 这里后端返回的message有时候是个json，解析json里面才是message
      const message = getMessage(response);

      if (!response) {
        commonNotify("error", "网络异常！");
        return;
      } else if (response.code === RequestCodeState.SUCCESS) {
        return response;
      } else if (response.code === RequestCodeState.ERROR) {
        commonNotify("warning", message || "网络异常！");
      } else if (response.code === RequestCodeState.SETTLE_TWO) {
        router.push({ name: "settle", query: { step: 2 } });
        commonNotify("warning", message || "网络异常！");
      } else if (response.code === RequestCodeState.SETTLE_THREE) {
        router.push({ name: "settle", query: { step: 3 } });
        commonNotify("warning", message || "网络异常！");
      } else if ([RequestCodeState.LOGGED_IN_EXPIRED, RequestCodeState.NOT_LOGGED_IN, RequestCodeState.ACCOUNT_FROZEN].includes(response.code)) {
        // 301：登录过期，302：未登录，303：账号冻结
        router.push({ name: "login" });
        commonNotify("warning", message || "网络异常！");
      } else if (response instanceof Blob) {
        return response;
      } else {
        commonNotify("warning", message || "网络异常！");
      }
    },
    errHandler: () => {
      commonNotify("error", "未知异常，可尝试刷新页面！");
    },
  }
);
