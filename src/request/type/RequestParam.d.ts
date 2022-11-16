// 定义接口参数类型
import type { Paging } from "@/type/Common";

export type GetGoodsList = Paging & { name: string };
export type Login = {
  captcha?: string;
  password?: string;
  phone: string;
};
