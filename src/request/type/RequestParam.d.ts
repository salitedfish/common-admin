// 定义接口参数类型
import type { Paging, WhiteListSearchParams } from "@/type/Common";
import type { GoodsAddParams } from "@/type/GoodsManager";
import type { SearchParams as GoodsListSearchParams } from "@/type/GoodsManager";
import type { UserListParam as UserListSearchParams } from "@/type/User";
import type { OrderListParam as OrderListSearchParams, ExpressOrderListParam as ExpressOrderListSearchParams } from "@/type/Order";
import type { GetPointsListParams, AddPointsParams } from "@/type/Points";

export type GetGoodsList = Paging & GoodsListSearchParams;
export type GetCaptcha = {
  phone: string;
  randstr: string;
  ticket: string;
};
export type Login = {
  captcha?: string;
  password?: string;
  phone: string;
};
export type Register = {
  captcha: string;
  password: string;
  phone: string;
};
export type UpdateUserInferParam = {
  merchantAddress?: string;
  merchantContact?: string;
  merchantDescription?: string;
  merchantLicense?: string;
};
export type SubmitMerchantInfo = {
  organizationType: number;
  //
  businessLicense?: string;
  businessLicenseNumber?: string;
  merchantName?: string;
  legalPerson?: string;
  //
  idCardName: string;
  idCardNumber: string;
  idCardFrontImage: string;
  idCardBackImage: string;
  idCardStart: string;
  idCardEnd: string;
  idCardAddress: string;
  //
  bankAccountType: number;
  accountBank?: string;
  accountName: string;
  accountNumber: string;
  bankAddressCode: string;
  bankName: string;
  //
  contactType: number;
  contactPhone: string;
  contactEmail: string;
  contactName: string;
  contactIdCardNumber: string;
  //
  contactIdCardFrontImage?: string;
  contactIdCardBackImage?: string;
  contactIdCardStart?: string;
  contactIdCardEnd?: string;
  businessAuthorizationLetter?: string;
  //
  storeName: string;
  shortName: string;
  storeDescription: string;
  storeAddress: string;
  storeContact: string;
  storeLicense: string;
};
export type GoodsSubmit = GoodsAddParams;
export type EditCategory = { id: number | null; name: string; order: number | null; parentId: number | null; type: number | null };
export type GetUserList = Paging & UserListSearchParams;
export type GetOrderList = Paging & OrderListSearchParams;
export type GetExpressOrderList = Paging & ExpressOrderListSearchParams;
export type GetPointsList = Paging & GetPointsListParams;
export type AddPoints = AddPointsParams;
export type GetWhiteList = Paging & WhiteListSearchParams;
