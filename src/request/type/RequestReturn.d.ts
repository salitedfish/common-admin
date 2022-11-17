// 定义接口返回类型
import type { Return } from "@/type/Common";

export type GetGoodsList = Promise<Return<[]>>;
export type GetCaptcha = Promise<Return<>>;
export type Login = Promise<
  Return<{
    authentication: string;
  }>
>;
export type Register = Promise<
  Return<{
    authentication: string;
  }>
>;
export type GetAuthRoutes = Promise<Return<{ menu: { name: string; route: string }[]; name: string; route: string }[]>>;
