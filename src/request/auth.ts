import { ultraFetch } from "./init";
import type * as RequestReturn from "@/request/type/RequestReturn";
import type * as RequestParam from "@/request/type/RequestParam";

// 获取验证码
export const getCaptcha = (phone: number): RequestReturn.GetCaptcha => {
  return ultraFetch.get({
    URL: "/manager/captcha/register",
    params: {
      phone,
    },
  });
};

// 登录、注册
export const login = (data: RequestParam.Login): RequestReturn.Login => {
  return ultraFetch.post({
    URL: "/manager/access/login",
    body: JSON.stringify(data),
  });
};
