import { ultraFetch } from "./init";
import type { Return, ReturnList, Paging } from "@/type/Common";
import type {
  GetProfitShareListParams,
  ProfitShareListItem,
  ChainRecordParams,
  GoodsChainRecordItem,
  PointsChainRecordItem,
  FinanceData,
  ParallelRecordParams,
  ParallelRecordItem,
  ParallelCoinWithdrawListScreenParams,
  ParallelCoinWithdrawListItem,
} from "@/type/Finance";

export const getProfitShareList = (params: Paging & GetProfitShareListParams) => {
  return ultraFetch.post<Return<ReturnList<ProfitShareListItem>>>({
    URL: "/manager/order/profit-sharing/page",
    body: JSON.stringify(params),
  });
};

export const syncProfitShare = (params: { accept: number | null; inOrderId: string; state: number | null }) => {
  return ultraFetch.post<Return<unknown>>({
    URL: "/manager/order/profit-sharing/sync",
    body: JSON.stringify(params),
  });
};

export const getGoodsChainRecord = (params: Paging & ChainRecordParams) => {
  return ultraFetch.post<Return<ReturnList<GoodsChainRecordItem>>>({
    URL: "/manager/chain-transfer/asset/page",
    body: JSON.stringify(params),
  });
};

export const exportGoodsChainRecord = (params: ChainRecordParams) => {
  return ultraFetch.get<Blob>({
    URL: "/manager/chain-transfer/asset/excel",
    params,
  });
};

export const getBalanceByToken = (params: { address: string; token: string }) => {
  return ultraFetch.post<Return<number>>({
    URL: "/manager/chain-transfer/asset/balance",
    body: JSON.stringify(params),
  });
};

export const syncGoodsChainRecord = (params: { transferId: string }) => {
  return ultraFetch.post<Return<unknown>>({
    URL: "/manager/chain-transfer/asset/sync",
    body: JSON.stringify(params),
  });
};

export const getPointsChainRecord = (params: Paging & ChainRecordParams) => {
  return ultraFetch.post<Return<ReturnList<PointsChainRecordItem>>>({
    URL: "/manager/chain-transfer/points/page",
    body: JSON.stringify(params),
  });
};

export const syncPointsChainRecord = (params: { transferId: string }) => {
  return ultraFetch.post<Return<unknown>>({
    URL: "/manager/chain-transfer/points/sync",
    body: JSON.stringify(params),
  });
};

export const exportPointsChainRecord = (params: ChainRecordParams) => {
  return ultraFetch.get<Blob>({
    URL: "/manager/chain-transfer/points/excel",
    params,
  });
};

// 资产数据
export const getFinanceToday = (): Promise<Return<FinanceData>> => {
  return ultraFetch.get({
    URL: "/manager/finance/today",
  });
};

export const getFinanceYesterday = (): Promise<Return<FinanceData>> => {
  return ultraFetch.get({
    URL: "/manager/finance/yesterday",
  });
};

export const getWechatBalance = () => {
  return ultraFetch.get<Return<{ availableAmount: number; pendingAmount: number }>>({
    URL: "/manager/finance/wechat-balance ",
  });
};

export const getWaitFinance = () => {
  return ultraFetch.get<Return<{ countExpressWait: number; countGoodsAuditWait: number }>>({
    URL: "/manager/finance/wait",
  });
};

export const getParallelRecord = (params: Paging & ParallelRecordParams) => {
  return ultraFetch.post<Return<ReturnList<ParallelRecordItem>>>({
    URL: "/manager/chain-transfer/parallel-coin/page",
    body: JSON.stringify(params),
  });
};

export const exportParallelRecord = (params: ParallelRecordParams) => {
  return ultraFetch.get<Blob>({
    URL: "/manager/chain-transfer/parallel-coin/excel",
    params,
  });
};

export const syncParallelCoin = (params: { transferId: string }) => {
  return ultraFetch.post({
    URL: "/manager/chain-transfer/parallel-coin/sync",
    body: JSON.stringify(params),
  });
};

export const getParallelCoinWithdrawList = (params: Paging & ParallelCoinWithdrawListScreenParams) => {
  return ultraFetch.post<Return<ReturnList<ParallelCoinWithdrawListItem>>>({
    URL: "/manager/user-parallel-coin/record/page",
    body: JSON.stringify(params),
  });
};

export const approvialParallelCoinWithdraw = (params: { id: number; state: number }) => {
  return ultraFetch.post({
    URL: "/manager/user-parallel-coin/record/audit",
    body: JSON.stringify(params),
  });
};
