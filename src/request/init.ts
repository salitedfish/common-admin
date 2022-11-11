import { UltraFetch } from "@ultra-man/noa";

export const ultraFetch = new UltraFetch(
  {
    baseURL: "api",
  },
  {
    reqHandler: (reqConfig) => {
      return reqConfig;
    },
    resHandler: (response, shallowResponse) => {
      console.log(response, shallowResponse);
    },
  }
);
