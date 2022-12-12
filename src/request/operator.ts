import { ultraFetch } from "./init";
import type { Return, ReturnList, Paging } from "@/type/Common";
import type {
  ManualAirDropDetail,
  ManualAirDropListSearchParams,
  ManualAirDropListItem,
  ManualAirDropAddParams,
  TimingAirDropListSearchParams,
  TimingAirDropListItem,
  TimingAirDropDetail,
  TimingAirDropAddParams,
  GoodsRecommendListItem,
  GoodsRecommendListParams,
  BulletinBoardListParams,
  BulletinBoardListItem,
  AddBulletinBoard,
} from "@/type/Operator";

// 以下是空投管理相关
export const deleteManualAirDrop = (params: { id: number }): Promise<Return<unknown>> => {
  return ultraFetch.post({
    URL: "/manager/airdrop/delete",
    body: JSON.stringify(params),
  });
};

export const getDetailManualAirDrop = (params: { id: number }): Promise<Return<ManualAirDropDetail>> => {
  return ultraFetch.get({
    URL: "/manager/airdrop/detail",
    params,
  });
};

export const getListManualAirDrop = (params: Paging & ManualAirDropListSearchParams): Promise<Return<ReturnList<ManualAirDropListItem>>> => {
  return ultraFetch.post({
    URL: "/manager/airdrop/page",
    body: JSON.stringify(params),
  });
};

export const updateManualAirDropState = (params: { id: number; state: number }): Promise<Return<unknown>> => {
  return ultraFetch.post({
    URL: "/manager/airdrop/state",
    body: JSON.stringify(params),
  });
};

export const syncManualAirDrop = (params: { id: number }): Promise<Return<unknown>> => {
  return ultraFetch.post({
    URL: "/manager/airdrop/sync",
    body: JSON.stringify(params),
  });
};

export const addManualAirDrop = (params: ManualAirDropAddParams): Promise<Return<unknown>> => {
  return ultraFetch.post({
    URL: "/manager/airdrop/submit",
    body: JSON.stringify(params),
  });
};

export const editManualAirDrop = (params: ManualAirDropAddParams): Promise<Return<unknown>> => {
  return ultraFetch.post({
    URL: "/manager/airdrop/update",
    body: JSON.stringify(params),
  });
};

// 以下是定时空投任务相关
export const deleteTimingAirDrop = (params: { id: number }): Promise<Return<unknown>> => {
  return ultraFetch.post({
    URL: "/manager/airdrop/task/delete",
    body: JSON.stringify(params),
  });
};
export const getDetailTimingAirDrop = (params: { id: number }): Promise<Return<TimingAirDropDetail>> => {
  return ultraFetch.get({
    URL: "/manager/airdrop/task/detail",
    params,
  });
};
export const getListTimingAirDrop = (params: Paging & TimingAirDropListSearchParams): Promise<Return<ReturnList<TimingAirDropListItem>>> => {
  return ultraFetch.post({
    URL: "/manager/airdrop/task/page",
    body: JSON.stringify(params),
  });
};
export const updateTimingAirDropState = (params: { id: number; state: number }): Promise<Return<unknown>> => {
  return ultraFetch.post({
    URL: "/manager/airdrop/task/state",
    body: JSON.stringify(params),
  });
};
export const addTimingAirDrop = (params: TimingAirDropAddParams): Promise<Return<unknown>> => {
  return ultraFetch.post({
    URL: "/manager/airdrop/task/submit",
    body: JSON.stringify(params),
  });
};
export const editTimingAirDrop = (params: TimingAirDropAddParams): Promise<Return<unknown>> => {
  return ultraFetch.post({
    URL: "/manager/airdrop/task/update",
    body: JSON.stringify(params),
  });
};

// 商品推荐相关
export const getGoodsRecommendList = (params: GoodsRecommendListParams & Paging): Promise<Return<ReturnList<GoodsRecommendListItem>>> => {
  return ultraFetch.post({
    URL: "/manager/goods/recommend/page",
    body: JSON.stringify(params),
  });
};
export const deleteGoodsRecommend = (params: { goodsId: string }): Promise<Return<unknown>> => {
  return ultraFetch.post({
    URL: "/manager/goods/recommend/delete",
    body: JSON.stringify(params),
  });
};
export const updateGoodsRecommendState = (params: { goodsId: string; topState: number }): Promise<Return<unknown>> => {
  return ultraFetch.post({
    URL: "/manager/goods/recommend/state",
    body: JSON.stringify(params),
  });
};
export const addGoodsRecommend = () => null;

// 公告相关
export const getBulletinBoardList = (params: BulletinBoardListParams & Paging): Promise<Return<ReturnList<BulletinBoardListItem>>> => {
  return ultraFetch.post({
    URL: "/manager/bulletin-board/page",
    body: JSON.stringify(params),
  });
};
export const deleteBulletinBoard = (params: { id: number }): Promise<Return<unknown>> => {
  return ultraFetch.post({
    URL: "/manager/bulletin-board/delete",
    body: JSON.stringify(params),
  });
};
export const updateBulletinBoardClassify = (params: { id: number; classifies: number[] }): Promise<Return<unknown>> => {
  return ultraFetch.post({
    URL: "/manager/bulletin-board/classify",
    body: JSON.stringify(params),
  });
};
export const updateBulletinBoardState = (params: { id: number; state: number; topState: number }): Promise<Return<unknown>> => {
  return ultraFetch.post({
    URL: "/manager/bulletin-board/state",
    body: JSON.stringify(params),
  });
};
export const addEditBulletinBoard = (params: AddBulletinBoard): Promise<Return<unknown>> => {
  return ultraFetch.post({
    URL: "/manager/bulletin-board/submit",
    body: JSON.stringify(params),
  });
};
export const getBulletinBoard = (params: { id: string }): Promise<Return<BulletinBoardListItem>> => {
  return ultraFetch.get({
    URL: "/manager/bulletin-board/detail",
    params,
  });
};
