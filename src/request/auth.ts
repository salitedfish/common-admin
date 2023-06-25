import { ultraFetch } from "./init";
import type { Return } from "@/type/Common";
import type { Auths } from "@/type/Auth";
import type * as RequestReturn from "@/request/type/RequestReturn";
import type * as RequestParam from "@/request/type/RequestParam";

// 获取注册验证码
export const getRegisterCaptcha = (params: RequestParam.GetCaptcha): RequestReturn.GetCaptcha => {
  return ultraFetch.get({
    URL: "/manager/captcha/register",
    params,
  });
};

// 获取登录验证码
export const getLoginCaptcha = (params: RequestParam.GetCaptcha): RequestReturn.GetCaptcha => {
  return ultraFetch.get({
    URL: "/manager/captcha/login",
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

// 获取用户信息
export const getUserInfo = (): RequestReturn.GetUserInfo => {
  return ultraFetch.get({
    URL: "/manager/user-admin/info",
  });
};

// 编辑用户信息
export const updateUserInfer = (data: RequestParam.UpdateUserInferParam) => {
  return ultraFetch.post({
    URL: "/manager/user-admin/merchant",
    body: JSON.stringify(data),
  });
};

// 退出
export const logout = (): RequestReturn.Logout => {
  return ultraFetch.get({
    URL: "/manager/access/logout",
  });
};

// 注册
export const register = (data: RequestParam.Register): RequestReturn.Register => {
  return ultraFetch.post({
    URL: "/manager/access/register",
    body: JSON.stringify(data),
  });
};

// 获取有权限的路由
export const getAuthRoutes = () => {
  return ultraFetch.get<Return<Auths>>({
    URL: "/manager/role-menu/detail",
  });
};

// 提交企业入驻信息
export const submitMerchantInfo = (data: RequestParam.SubmitMerchantInfo): RequestReturn.SubmitMerchantInfo => {
  return ultraFetch.post({
    URL: "/manager/merchant-wechat/apply/submit",
    body: JSON.stringify(data),
  });
};

// 获取企业申请结果信息
export const getMerchantApplyResult = (): RequestReturn.GetMerchantApplyResult => {
  return ultraFetch.get({
    URL: "/manager/merchant-wechat/apply/query",
  });
};

// 获取是否支持小微商户
export const getAllowMicro = () => {
  return ultraFetch.get<Return<boolean>>({
    URL: "/manager/merchant-wechat/apply/micro-allow",
  });
};

// 角色权限相关
// 获取所有的权限角色
export const getAuthRoles = () => {
  return ultraFetch.get<Return<{ id: number; name: string }[]>>({
    URL: "/manager/role-custom/list",
  });
};

export const addRole = (data: { name: string }) => {
  return ultraFetch.post({
    URL: "/manager/role-custom/submit",
    body: JSON.stringify(data),
  });
};

export const editRole = (data: { id: number; name: string }) => {
  return ultraFetch.post({
    URL: "/manager/role-custom/update",
    body: JSON.stringify(data),
  });
};

export const delRole = (data: { id: number }) => {
  return ultraFetch.post({
    URL: "/manager/role-custom/delete",
    body: JSON.stringify(data),
  });
};

// 获取指定角色的权限
export const getRoleAuth = (params: { id: number }) => {
  return ultraFetch.get<Return<Auths>>({
    URL: "/manager/role-menu/explicit",
    params,
  });
};

export const updateRoleAuth = (data: { id: number; menuIds: number[] }) => {
  return ultraFetch.post({
    URL: "/manager/role-menu/update",
    body: JSON.stringify(data),
  });
};
