// 定义接口返回类型
import type { Return, ReturnList, CategoryTreeItem } from "@/type/Common";
import type { GoodsListItem } from "@/type/GoodsManager";

export type GetGoodsList = Promise<Return<ReturnList<GoodsListItem>>>;
export type GetCaptcha = Promise<Return<>>;
export type Login = Promise<
  Return<{
    authentication: string;
  }>
>;
export type Logout = Promise<Return<Record<string, unknown>>>;
export type Register = Promise<
  Return<{
    authentication: string;
  }>
>;
export type GetAuthRoutes = Promise<Return<{ menu: { name: string; route: string }[]; name: string; route: string }[]>>;
export type GetProvinces = Promise<
  Return<
    {
      province_code: number;
      province_name: string;
    }[]
  >
>;
export type GetCities = Promise<
  Return<
    {
      city_code: number;
      city_name: string;
    }[]
  >
>;
export type SubmitMerchantInfo = Promise<Return<Record<string, unknown>>>;
export type GetMerchantApplyResult = Promise<
  Return<{
    state: number;
    result: any;
  }>
>;
export type GetUserInfo = Promise<
  Return<{
    chainAddress: string;
    chainPublicKey: string;
    headUrl: string;
    lastLoginTime: string;
    loginPassword: string;
    nickName: string;
    phone: string;
    role: number;
    state: number;
    subMchid: string;
    uid: number;
  }>
>;

export type GetCategoryTree = Promise<Return<CategoryTreeItem[]>>;
