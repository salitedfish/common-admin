// 定义接口参数类型
import type { Paging } from "@/type/Common";
import type { GoodsDetail } from "@/type/GoodsManager";
import type { SearchParams as GoodsListSearchParams } from "@/type/GoodsManager";

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
  accountBank: string;
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
};
export type GoodsSubmit = GoodsDetail;
