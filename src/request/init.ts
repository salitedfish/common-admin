import { UltraFetch } from "@ultra-man/noa";
import { useGetLStorage } from "@ultra-man/noa";
import { createDiscreteApi } from "naive-ui";

const { notification } = createDiscreteApi(["notification"]);

export const ultraFetch = new UltraFetch(
  {
    baseURL: "api",
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
      if (response.code === 0) {
        console.log("请求成功结果", response);
      } else {
        console.log("请求失败结果", response);
        notification.warning({
          content: response.message,
          duration: 2000,
          keepAliveOnHover: true,
        });
      }

      return response;
    },
    errHandler: (err) => {
      console.log("请求错误", err);
      notification.error({
        content: err,
        duration: 2000,
        keepAliveOnHover: true,
      });
    },
  }
);
