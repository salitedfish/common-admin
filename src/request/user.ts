import { ultraFetch } from "./init";
import type { Paging, Return, ReturnList } from "@/type/Common";
import type {
  AdminMerchantListParam,
  AdminMerchantListItem,
  GetUserAssetsListParams,
  GetUserPointsListParams,
  UserAssetsListItem,
  UserPointsListItem,
  UserRealInfo,
  VipLevelItem,
} from "@/type/User";
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

export const updateUserTab = (params: { tab: number; uid: number; phone?: string }) => {
  return ultraFetch.post({
    URL: "/manager/user/tab",
    body: JSON.stringify(params),
  });
};

export const updateUserPhone = (params: { tab: number; uid?: number; phone: string }) => {
  return ultraFetch.post({
    URL: "/manager/user/phone",
    body: JSON.stringify(params),
  });
};

export const getUserRealInfo = (params: { uid: number }): Promise<Return<UserRealInfo>> => {
  return ultraFetch.get({
    URL: "/manager/user/identity-verification",
    params,
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

// 用户资产
export const getUserAssetsList = (params: Paging & GetUserAssetsListParams): Promise<Return<ReturnList<UserAssetsListItem>>> => {
  return ultraFetch.post({
    URL: "/manager/user-asset/page",
    body: JSON.stringify(params),
  });
};
export const exportUserAssestList = (params: GetUserAssetsListParams): Promise<Blob> => {
  return ultraFetch.get({
    URL: "/manager/user-asset/excel",
    params,
  });
};
// 用户积分
export const getUserPointsList = (params: Paging & GetUserPointsListParams): Promise<Return<ReturnList<UserPointsListItem>>> => {
  return ultraFetch.post({
    URL: "/manager/user-points/page",
    body: JSON.stringify(params),
  });
};
export const exportUserPointsList = (params: GetUserPointsListParams): Promise<Blob> => {
  return ultraFetch.get({
    URL: "/manager/user-points/excel",
    params,
  });
};

//vip设置
export const getVipLevelList = (): Promise<Return<VipLevelItem[]>> => {
  return ultraFetch.get({
    URL: "/manager/vip/level/list",
  });
};

export const updateVipLevelList = (params: VipLevelItem[]) => {
  const amounts = params.map((item) => item.amount);
  return ultraFetch.post({
    URL: "/manager/vip/level/submit",
    body: JSON.stringify(amounts),
  });
};
