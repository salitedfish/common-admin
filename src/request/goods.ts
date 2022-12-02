import { ultraFetch } from "./init";
import type * as RequestParam from "@/request/type/RequestParam";
import type * as RequestReturn from "@/request/type/RequestReturn";

export const getGoodsList = (params: RequestParam.GetGoodsList): RequestReturn.GetGoodsList => {
  return ultraFetch.post({
    URL: "/manager/goods/page",
    body: JSON.stringify(params),
  });
};

export const goodsSubmit = (params: RequestParam.GoodsSubmit) => {
  return ultraFetch.post({
    URL: "/manager/goods/submit",
    body: JSON.stringify(params),
  });
};

export const goodsEdit = (params: RequestParam.GoodsSubmit) => {
  return ultraFetch.post({
    URL: "/manager/goods/update",
    body: JSON.stringify(params),
  });
};

export const goodsDelete = (params: { goodsId: string }) => {
  return ultraFetch.post({
    URL: "/manager/goods/delete",
    body: JSON.stringify(params),
  });
};

export const getGoodsDetail = (goodsId: string): RequestReturn.GetGoodsDetail => {
  return ultraFetch.get({
    URL: "/manager/goods/detail",
    params: {
      goodsId,
    },
  });
};

// 改变商品状态，商户专用
export const updateGoodsState = (params: { auditNote?: string; goodsId: string; goodsState: number }) => {
  return ultraFetch.post({
    URL: "/manager/goods/state",
    body: JSON.stringify(params),
  });
};
// 改变商品状态，管理员专用
export const updateGoodsAudit = (params: { auditNote?: string; goodsId: string; goodsState: number }) => {
  return ultraFetch.post({
    URL: "/manager/goods/audit",
    body: JSON.stringify(params),
  });
};

export const updateGoodsCategory = (params: { goodsId: string; classifies: string[] }) => {
  return ultraFetch.post({
    URL: "/manager/goods/classify",
    body: JSON.stringify(params),
  });
};
