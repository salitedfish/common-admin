import { ultraFetch } from "./init";
import type { Return, ReturnList, Paging } from "@/type/Common";
import type { GetProfitShareListParams, ProfitShareListItem, ChainRecordParams, GoodsChainRecordItem, PointsChainRecordItem } from "@/type/Finance";

export const getProfitShareList = (params: Paging & GetProfitShareListParams): Promise<Return<ReturnList<ProfitShareListItem>>> => {
  return ultraFetch.post({
    URL: "/manager/order/profit-sharing/page",
    body: JSON.stringify(params),
  });
};

export const syncProfitShare = (params: { accept: number | null; inOrderId: string; state: number | null }): Promise<Return<unknown>> => {
  return ultraFetch.post({
    URL: "/manager/order/profit-sharing/sync",
    body: JSON.stringify(params),
  });
};

export const getGoodsChainRecord = (params: Paging & ChainRecordParams): Promise<Return<ReturnList<GoodsChainRecordItem>>> => {
  return ultraFetch.post({
    URL: "/manager/chain-transfer/asset/page",
    body: JSON.stringify(params),
  });
};

export const exportGoodsChainRecord = (params: ChainRecordParams): Promise<Blob> => {
  return ultraFetch.get({
    URL: "/manager/chain-transfer/asset/excel",
    params,
  });
};

export const getBalanceByToken = (params: { address: string; token: string }): Promise<Return<number>> => {
  return ultraFetch.post({
    URL: "/manager/chain-transfer/asset/balance",
    body: JSON.stringify(params),
  });
};

export const syncGoodsChainRecord = (params: { transferId: string }): Promise<Return<unknown>> => {
  return ultraFetch.post({
    URL: "/manager/chain-transfer/asset/sync",
    body: JSON.stringify(params),
  });
};

export const getPointsChainRecord = (params: Paging & ChainRecordParams): Promise<Return<ReturnList<PointsChainRecordItem>>> => {
  return ultraFetch.post({
    URL: "/manager/chain-transfer/points/page",
    body: JSON.stringify(params),
  });
};

export const syncPointsChainRecord = (params: { transferId: string }): Promise<Return<unknown>> => {
  return ultraFetch.post({
    URL: "/manager/chain-transfer/points/sync",
    body: JSON.stringify(params),
  });
};

export const exportPointsChainRecord = (params: ChainRecordParams): Promise<Blob> => {
  return ultraFetch.get({
    URL: "/manager/chain-transfer/points/excel",
    params,
  });
};
