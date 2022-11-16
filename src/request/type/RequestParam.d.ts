// 定义接口参数类型
import type { Paging } from "@/type/Common";

export type GetGoodsList = Paging & { name: string };
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
