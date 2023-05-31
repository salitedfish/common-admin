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
  UserParallelCoinListScreenParams,
  UserParallelCoinListItem,
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

export const updateUserTab = (params: { tab: number; uid: number }) => {
  return ultraFetch.post({
    URL: "/manager/user/tab",
    body: JSON.stringify({
      uid: params.uid,
      tab: params.tab,
    }),
  });
};

export const updateUserPhone = (params: { uid: number; phone: string }) => {
  return ultraFetch.post({
    URL: "/manager/user/phone",
    body: JSON.stringify({
      uid: params.uid,
      phone: params.phone,
    }),
  });
};

export const updateUserRegisterCode = (params: { uid: number; registerCode: string }) => {
  return ultraFetch.post({
    URL: "/manager/user/register-code",
    body: JSON.stringify({
      uid: params.uid,
      registerCode: params.registerCode,
    }),
  });
};

export const getUserRealInfo = (params: { uid: number }) => {
  return ultraFetch.get<Return<UserRealInfo>>({
    URL: "/manager/user/identity-verification",
    params,
  });
};

// 系统用户（管理员、商户）
export const getAdminMerchantList = (params: Paging & AdminMerchantListParam) => {
  return ultraFetch.post<Return<ReturnList<AdminMerchantListItem>>>({
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

export const resetAdminMerchantPassword = (params: { uid: number }) => {
  return ultraFetch.post<Return<{ password: string }>>({
    URL: "/manager/admin-merchant/reset-password",
    body: JSON.stringify(params),
  });
};

// 用户资产
export const getUserAssetsList = (params: Paging & GetUserAssetsListParams) => {
  return ultraFetch.post<Return<ReturnList<UserAssetsListItem>>>({
    URL: "/manager/user-asset/page",
    body: JSON.stringify(params),
  });
};
export const exportUserAssestList = (params: GetUserAssetsListParams) => {
  return ultraFetch.get<Blob>({
    URL: "/manager/user-asset/excel",
    params,
  });
};
// 用户积分
export const getUserPointsList = (params: Paging & GetUserPointsListParams) => {
  return ultraFetch.post<Return<ReturnList<UserPointsListItem>>>({
    URL: "/manager/user-points/page",
    body: JSON.stringify(params),
  });
};
export const exportUserPointsList = (params: GetUserPointsListParams) => {
  return ultraFetch.get<Blob>({
    URL: "/manager/user-points/excel",
    params,
  });
};

//vip设置
export const getVipLevelList = () => {
  return ultraFetch.get<Return<VipLevelItem[]>>({
    URL: "/manager/vip/level/list",
  });
};

export const updateVipLevelList = (params: VipLevelItem[]) => {
  return ultraFetch.post({
    URL: "/manager/vip/level/submit",
    body: JSON.stringify(params),
  });
};

// 用户平行链代币管理
export const getUserParallelCoinList = (params: Paging & UserParallelCoinListScreenParams) => {
  return ultraFetch.post<Return<ReturnList<UserParallelCoinListItem>>>({
    URL: "/manager/user-parallel-coin/page",
    body: JSON.stringify(params),
  });
};
