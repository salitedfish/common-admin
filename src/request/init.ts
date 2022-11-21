import { UltraFetch } from "@ultra-man/noa";
import { useGetLStorage } from "@ultra-man/noa";
import router from "@/router";

// 这里请求的提示只处理异常和错误的提示，成功的提示在具体的业务里处理
import { commonNotify } from "@/util";

enum RequestCodeState {
  SUCCESS = 0,
  ERROR = -1,
  SETTLE_TWO = 351,
  SETTLE_THREE = 352,
  NOT_LOGGED_IN = 302,
  ACCOUNT_FROZEN = 303,
}

export const ultraFetch = new UltraFetch(
  {
    baseURL: "/api",
    headers: {
      "Content-Type": "application/json",
    },
  },
  {
    reqHandler: (config) => {
      if (config.headers) {
        config.headers = { ...config.headers, ...{ token: useGetLStorage("token")("") as string } };
      }
      return config;
    },
    resHandler: (response, shallowResponse) => {
      if (!response) {
        commonNotify("error", "网络异常！");
        return;
      } else if (response.code === RequestCodeState.SUCCESS) {
        return response;
      } else if (response.code === RequestCodeState.ERROR) {
        commonNotify("warning", response.message || "网络异常！");
      } else if (response.code === RequestCodeState.SETTLE_TWO) {
        router.push({ name: "settle", query: { step: 2 } });
        commonNotify("warning", response.message || "网络异常！");
      } else if (response.code === RequestCodeState.SETTLE_THREE) {
        router.push({ name: "settle", query: { step: 3 } });
        commonNotify("warning", response.message || "网络异常！");
      } else if ([RequestCodeState.NOT_LOGGED_IN, RequestCodeState.ACCOUNT_FROZEN].includes(response.code)) {
        // 302：未登录，303：账号冻结
        router.push({ name: "login" });
        commonNotify("warning", response.message || "网络异常！");
      } else {
        commonNotify("warning", response.message || "网络异常！");
      }
    },
    errHandler: (err) => {
      console.log("请求错误", err);
      commonNotify("error", err);
    },
  }
);
