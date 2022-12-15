import { ultraFetch } from "./init";
import type { Paging, Return, ReturnList } from "@/type/Common";
import type { AdminMerchantListParam, AdminMerchantListItem } from "@/type/User";
import type * as RequestParam from "@/request/type/RequestParam";
import type * as RequestReturn from "@/request/type/RequestReturn";

// 普通用户
export const getUserList = (params: RequestParam.GetUserList): RequestReturn.GetUserList => {
  return ultraFetch.post({
    URL: "/manager/user/page",
    body: JSON.stringify(params),
  });
};

export const updateUserState = (params: { state: number; uid: number }) => {
  return ultraFetch.post({
    URL: "/manager/user/state",
    body: JSON.stringify(params),
  });
};

export const updateUserTab = (params: { tab: number; uid: number }) => {
  return ultraFetch.post({
    URL: "/manager/user/tab",
    body: JSON.stringify(params),
  });
};

// 系统用户（管理员、商户）
export const getAdminMerchantList = (params: Paging & AdminMerchantListParam): Promise<Return<ReturnList<AdminMerchantListItem>>> => {
  return ultraFetch.post({
    URL: "/manager/admin-merchant/page",
    body: JSON.stringify(params),
  });
};

export const updateAdminMerchantState = (params: { uid: number; state: number }) => {
  return ultraFetch.post({
    URL: "/manager/admin-merchant/state",
    body: JSON.stringify(params),
  });
};

export const resetAdminMerchantPassword = (params: { uid: number }): Promise<Return<{ password: string }>> => {
  return ultraFetch.post({
    URL: "/manager/admin-merchant/reset-password",
    body: JSON.stringify(params),
  });
};