import { ultraFetch } from "./init";
import type * as RequestReturn from "@/request/type/RequestReturn";
import type * as RequestParam from "@/request/type/RequestParam";

// 获取验证码
export const getCaptcha = (params: RequestParam.GetCaptcha): RequestReturn.GetCaptcha => {
  return ultraFetch.get({
    URL: "/manager/captcha/register",
    params,
  });
};

// 登录
export const login = (data: RequestParam.Login): RequestReturn.Login => {
  return ultraFetch.post({
    URL: "/manager/access/login",
    body: JSON.stringify(data),
  });
};

// 注册
export const register = (data: RequestParam.Register): RequestReturn.Register => {
  return ultraFetch.post({
    URL: "/manager/access/register",
    body: JSON.stringify(data),
  });
};
