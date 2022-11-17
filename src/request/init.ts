import { UltraFetch } from "@ultra-man/noa";
import { useGetLStorage } from "@ultra-man/noa";
import router from "@/router";

// 这里请求的提示只处理异常和错误的提示，成功的提示在具体的业务里处理
import { commonNotify } from "@/util";

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
      } else if (response.code === 0) {
        return response;
      } else if (response.code === -1) {
        commonNotify("warning", response.message || "网络异常！");
      } else if (response.code === 351) {
        router.push({ name: "settle", query: { step: 2 } });
        commonNotify("warning", response.message || "网络异常！");
      } else if (response.code === 352) {
        router.push({ name: "settle", query: { step: 3 } });
        commonNotify("warning", response.message || "网络异常！");
      } else {
        // 302：未登录，303：账号冻结
        router.push({ name: "login" });
        commonNotify("warning", response.message || "网络异常！");
      }
    },
    errHandler: (err) => {
      console.log("请求错误", err);
      commonNotify("error", err);
    },
  }
);
