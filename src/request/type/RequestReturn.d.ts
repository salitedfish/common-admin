// 定义接口返回类型
import type { Return, ReturnList, CategoryTreeItem, WhiteListItem, RemoteRoute } from "@/type/Common";
import type { GoodsListItem, GoodsDetail } from "@/type/GoodsManager";
import type { UserListItem } from "@/type/User";
import type { OrderListItem, ExpressOrderListItem, LogisticsInfo, ExpressCompany } from "@/type/Order";
import type { PointsItem } from "@/type/Points";
import type { UserInfo } from "@/type/Auth";

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
export type GetAuthRoutes = Promise<Return<RemoteRoute[]>>;
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
export type GetUserInfo = Promise<Return<UserInfo>>;

export type GetCategoryTree = Promise<Return<CategoryTreeItem[]>>;
export type GetGoodsDetail = Promise<Return<GoodsDetail>>;
export type Upload = Promise<Return<{ fileUrl: string; hashName: string }>>;
export type GetUserList = Promise<Return<ReturnList<UserListItem>>>;
export type GetOrderList = Promise<Return<ReturnList<OrderListItem>>>;
export type GetExpressOrderList = Promise<Return<ReturnList<ExpressOrderListItem>>>;
export type GetExpressLogistics = Promise<Return<LogisticsInfo>>;
export type GetExpressCompanyList = Promise<
  Return<{
    allNum: number;
    expressList: ExpressCompany[];
    flag: boolean;
    maxSize: number;
    msg: string;
    page: number;
    ret_code: number;
  }>
>;
export type GetPointsList = Rromise<Return<ReturnList<PointsItem[]>>>;
export type GetPointsInfo = Promise<Return<PointsItem>>;
export type UploadWhiteList = Promise<
  Return<
    {
      errorMsg: string;
      phone: string;
      rowNum: number;
      uid: number;
      unitNum: number;
    }[]
  >
>;
export type GetWhiteList = Promise<Return<ReturnList<WhiteListItem>>>;
