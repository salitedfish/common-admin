import { ultraFetch } from "./init";
import type * as RequestParam from "@/request/type/RequestParam";
import type * as RequestReturn from "@/request/type/RequestReturn";
import type { Return, Paging, ReturnList, MergeObject } from "@/type/Common";
import type { BlindBoxPrizeListItem, BlindBoxOpenRecordItem, GoodsPublishRecordItem, ConsignmentParams, SyntheticRule, GetSyntheticRule } from "@/type/GoodsManager";

export const getGoodsList = (params: RequestParam.GetGoodsList): RequestReturn.GetGoodsList => {
  if (typeof params.goodsStates === "string") {
    params.goodsStates = JSON.parse(params.goodsStates);
  }
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

// 修改二级参数与分账比例
export const updateGoodsConsignmentParams = (params: ConsignmentParams) => {
  return ultraFetch.post({
    URL: "/manager/goods/profit-sharing",
    body: JSON.stringify(params),
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

export const updateGoodsPoints = (params: { goodsId: string | null; needNum: number | null; pointsId: string | null }) => {
  return ultraFetch.post({
    URL: "/manager/goods/points",
    body: JSON.stringify(params),
  });
};

export const updateGoodsExtend = (params: RequestParam.GoodsSubmit) => {
  return ultraFetch.post({
    URL: "/manager/goods/extend",
    body: JSON.stringify(params),
  });
};

export const getBlindBoxPrizeList = (params: { goodsId: string }) => {
  return ultraFetch.get<Return<BlindBoxPrizeListItem[]>>({
    URL: "/manager/goods/mystery-box/list",
    params: params,
  });
};

export const submitBlindBoxPrize = (params: { boxGoodsIds: string[]; goodsId: string }) => {
  return ultraFetch.post<Return<unknown>>({
    URL: "/manager/goods/mystery-box/submit",
    body: JSON.stringify(params),
  });
};

export const clearBlindBoxPrize = (params: { goodsId: string }) => {
  return ultraFetch.post({
    URL: "/manager/goods/mystery-box/reset",
    body: JSON.stringify(params),
  });
};

export const getBlindBoxOpenRecord = (params: Paging & { goodsId?: string; uid?: string }) => {
  return ultraFetch.post<Return<ReturnList<BlindBoxOpenRecordItem>>>({
    URL: "/manager/goods/mystery-box/open-record/page",
    body: JSON.stringify(params),
  });
};

export const getGoodsPublishRecord = (params: { goodsId: string }) => {
  return ultraFetch.get<Return<GoodsPublishRecordItem[]>>({
    URL: "/manager/goods/issue/record",
    params: params,
  });
};

// 合成相关接口
export const getSyntheticList = async (params: { goodsId: string }) => {
  return ultraFetch.get<Return<GetSyntheticRule[]>>({
    URL: "/manager/goods/synthesis/list",
    params,
  });
};

export const submitSyntheticList = async (params: { goodsId: string; rules: SyntheticRule[] }) => {
  return ultraFetch.post({
    URL: "/manager/goods/synthesis/submit",
    body: JSON.stringify(params),
  });
};
