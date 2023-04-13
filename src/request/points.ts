import { ultraFetch } from "./init";
import type * as RequestParam from "@/request/type/RequestParam";
import type * as RequestReturn from "@/request/type/RequestReturn";
import type { Return, ReturnList, Paging } from "@/type/Common";
import type { ParallelCoinListParams, ParallelCoinItem, ParallelCoinDetail } from "@/type/Points";

export const getPointsList = (params: RequestParam.GetPointsList): RequestReturn.GetPointsList => {
  if (typeof params.pointsStates === "string") {
    params.pointsStates = JSON.parse(params.pointsStates);
  }
  return ultraFetch.post({
    URL: "/manager/points/page",
    body: JSON.stringify(params),
  });
};

export const deletePoints = (params: { pointsId: string }) => {
  return ultraFetch.post({
    URL: "/manager/points/delete",
    body: JSON.stringify(params),
  });
};

export const updatePointsAudit = (params: { auditNote?: string; pointsState: number; pointsId: string }) => {
  return ultraFetch.post({
    URL: "/manager/points/audit",
    body: JSON.stringify(params),
  });
};

export const updatePointsState = (params: { auditNote?: string; pointsState: number; pointsId: string }) => {
  return ultraFetch.post({
    URL: "/manager/points/state",
    body: JSON.stringify(params),
  });
};

export const addPoints = (params: RequestParam.AddPoints) => {
  return ultraFetch.post({
    URL: "/manager/points/submit",
    body: JSON.stringify(params),
  });
};

export const editPoints = (params: RequestParam.AddPoints) => {
  return ultraFetch.post({
    URL: "/manager/points/update",
    body: JSON.stringify(params),
  });
};

export const getPointsInfo = (params: { pointsId: string }): RequestReturn.GetPointsInfo => {
  return ultraFetch.get({
    URL: "/manager/points/detail",
    params: params,
  });
};

// 平行链代币
export const getParallelCoinList = (params: Paging & ParallelCoinListParams): Promise<Return<ReturnList<ParallelCoinItem>>> => {
  return ultraFetch.post({
    URL: "/manager/parallel/coin/page",
    body: JSON.stringify(params),
  });
};

export const delParallelCoin = (params: { coin: string }) => {
  return ultraFetch.post({
    URL: "/manager/parallel/coin/delete",
    body: JSON.stringify(params),
  });
};

export const addParallelCoin = (params: ParallelCoinDetail) => {
  return ultraFetch.post({
    URL: "/manager/parallel/coin/submit",
    body: JSON.stringify(params),
  });
};
export const updateParallelCoin = (params: ParallelCoinDetail) => {
  return ultraFetch.post({
    URL: "/manager/parallel/coin/update",
    body: JSON.stringify(params),
  });
};
