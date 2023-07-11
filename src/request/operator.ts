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
  BannerListParams,
  BannerListItem,
  AddBannerParams,
  SearchKeywordsListItem,
  LotteryListParams,
  LotteryListItem,
  LotteryDetail,
  LotteryFormDetail,
  GoodsActivityListParams,
  GoodsActivityListItem,
  GoodsActivityDetailAPI,
  GetRuleWhiteListParams,
  RuleWhiteListItem,
  HoldTypeRuleWhiteListItem,
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
export const updateTimingAirDropState = (params: { id: number; state: number }) => {
  return ultraFetch.post<Return<unknown>>({
    URL: "/manager/airdrop/task/state",
    body: JSON.stringify(params),
  });
};
export const addTimingAirDrop = (params: TimingAirDropAddParams) => {
  return ultraFetch.post<Return<unknown>>({
    URL: "/manager/airdrop/task/submit",
    body: JSON.stringify(params),
  });
};
export const editTimingAirDrop = (params: TimingAirDropAddParams) => {
  return ultraFetch.post<Return<unknown>>({
    URL: "/manager/airdrop/task/update",
    body: JSON.stringify(params),
  });
};

// 商品推荐相关
export const getGoodsRecommendList = (params: GoodsRecommendListParams & Paging) => {
  return ultraFetch.post<Return<ReturnList<GoodsRecommendListItem>>>({
    URL: "/manager/goods/recommend/page",
    body: JSON.stringify(params),
  });
};
export const deleteGoodsRecommend = (params: { goodsId: string }) => {
  return ultraFetch.post<Return<unknown>>({
    URL: "/manager/goods/recommend/delete",
    body: JSON.stringify(params),
  });
};
export const updateGoodsRecommendState = (params: { goodsId: string; topState: number }) => {
  return ultraFetch.post<Return<unknown>>({
    URL: "/manager/goods/recommend/state",
    body: JSON.stringify(params),
  });
};
export const addGoodsRecommend = () => null;

// 公告相关
export const getBulletinBoardList = (params: BulletinBoardListParams & Paging) => {
  return ultraFetch.post<Return<ReturnList<BulletinBoardListItem>>>({
    URL: "/manager/bulletin-board/page",
    body: JSON.stringify(params),
  });
};
export const deleteBulletinBoard = (params: { id: number }) => {
  return ultraFetch.post<Return<unknown>>({
    URL: "/manager/bulletin-board/delete",
    body: JSON.stringify(params),
  });
};
export const updateBulletinBoardClassify = (params: { id: number; classifies: number[] }) => {
  return ultraFetch.post<Return<unknown>>({
    URL: "/manager/bulletin-board/classify",
    body: JSON.stringify(params),
  });
};
export const updateBulletinBoardState = (params: { id: number; state: number; topState: number }) => {
  return ultraFetch.post<Return<unknown>>({
    URL: "/manager/bulletin-board/state",
    body: JSON.stringify(params),
  });
};
export const addEditBulletinBoard = (params: AddBulletinBoard) => {
  return ultraFetch.post<Return<unknown>>({
    URL: "/manager/bulletin-board/submit",
    body: JSON.stringify(params),
  });
};
export const getBulletinBoard = (params: { id: string }) => {
  return ultraFetch.get<Return<BulletinBoardListItem>>({
    URL: "/manager/bulletin-board/detail",
    params,
  });
};

// banner管理
export const getBannerList = (params: Paging & BannerListParams) => {
  return ultraFetch.post<Return<ReturnList<BannerListItem>>>({
    URL: "/manager/banner/page",
    body: JSON.stringify(params),
  });
};
export const addEditBanner = (params: AddBannerParams) => {
  return ultraFetch.post<Return<unknown>>({
    URL: "/manager/banner/submit",
    body: JSON.stringify(params),
  });
};
export const getBanner = (params: { id: number }) => {
  return ultraFetch.get<Return<BannerListItem>>({
    URL: "/manager/banner/detail",
    params,
  });
};
export const updateBannerState = (params: { id: number; state: number }) => {
  return ultraFetch.post<Return<unknown>>({
    URL: "/manager/banner/state",
    body: JSON.stringify(params),
  });
};
export const deleteBanner = (params: { id: number }) => {
  return ultraFetch.post<Return<unknown>>({
    URL: "/manager/banner/delete",
    body: JSON.stringify(params),
  });
};

// 搜索关键字管理
export const getSearchKeywordsList = () => {
  return ultraFetch.get<Return<SearchKeywordsListItem[]>>({
    URL: "/manager/search-keyword/list",
  });
};

export const deleteSearchKeywords = (params: { id: number }) => {
  return ultraFetch.post<Return<unknown>>({
    URL: "/manager/search-keyword/delete",
    body: JSON.stringify(params),
  });
};

export const addEditSearchKeywords = (params: { id?: number; keyword: string; order: number | null }) => {
  return ultraFetch.post<Return<unknown>>({
    URL: "/manager/search-keyword/submit",
    body: JSON.stringify(params),
  });
};

// 抽签管理
export const getLotteryList = (params: Paging & LotteryListParams) => {
  return ultraFetch.post<Return<ReturnList<LotteryListItem>>>({
    URL: "/manager/lottery/page",
    body: JSON.stringify(params),
  });
};
export const deleteLottery = (params: { id: number }) => {
  return ultraFetch.post({
    URL: "/manager/lottery/delete",
    body: JSON.stringify(params),
  });
};
//
export const updateLotteryApply = (params: { id: number; state: number }) => {
  return ultraFetch.post({
    URL: "/manager/lottery/apply",
    body: JSON.stringify(params),
  });
};
export const updateLotteryState = (params: { id: number; state: number }) => {
  return ultraFetch.post({
    URL: "/manager/lottery/state",
    body: JSON.stringify(params),
  });
};
//
export const lotteryApprovial = (params: { id: number; auditNote: string; state: number }) => {
  return ultraFetch.post({
    URL: "/manager/lottery/audit",
    body: JSON.stringify(params),
  });
};
export const updateLotteryStateAdmin = (params: { id: number; state: number }) => {
  return ultraFetch.post({
    URL: "/manager/lottery/state-admin",
    body: JSON.stringify(params),
  });
};

export const calcLottery = (params: { id: number }) => {
  return ultraFetch.post({
    URL: "/manager/lottery/calc",
    body: JSON.stringify(params),
  });
};

export const getRuleWhiteList = (params: Paging & GetRuleWhiteListParams) => {
  return ultraFetch.post<Return<ReturnList<RuleWhiteListItem>>>({
    URL: "/manager/rule/allow/page",
    body: JSON.stringify(params),
  });
};

export const getHoldTypeRuleWhiteList = (params: Paging & GetRuleWhiteListParams) => {
  return ultraFetch.post<Return<ReturnList<HoldTypeRuleWhiteListItem>>>({
    URL: "/manager/airdrop/task/allow/page",
    body: JSON.stringify(params),
  });
};

// 抽签详情相关
export const getLotteryDetail = (params: { id: number }) => {
  return ultraFetch.get<Return<LotteryDetail>>({
    URL: "/manager/lottery/detail",
    params,
  });
};
export const addLottery = (params: LotteryFormDetail) => {
  return ultraFetch.post({
    URL: "/manager/lottery/submit",
    body: JSON.stringify(params),
  });
};
export const editLottery = (params: LotteryFormDetail) => {
  return ultraFetch.post({
    URL: "/manager/lottery/update",
    body: JSON.stringify(params),
  });
};

// 商品活动相关
export const getGoodsActivityList = (params: Paging & GoodsActivityListParams) => {
  return ultraFetch.post<Return<ReturnList<GoodsActivityListItem>>>({
    URL: "/manager/goods/promo/page",
    body: JSON.stringify(params),
  });
};

export const delGoodsActivity = (params: { id: number }) => {
  return ultraFetch.post({
    URL: "/manager/goods/promo/delete",
    body: JSON.stringify(params),
  });
};

export const updateGoodsActivityState = (params: { id: number; state?: number }) => {
  return ultraFetch.post({
    URL: "/manager/goods/promo/state",
    body: JSON.stringify(params),
  });
};

export const getGoodsActivityDetail = (params: { id: string }) => {
  return ultraFetch.get<Return<GoodsActivityDetailAPI>>({
    URL: "/manager/goods/promo/detail",
    params,
  });
};

export const updateGoodsActivityDetail = (params: GoodsActivityDetailAPI) => {
  return ultraFetch.post({
    URL: "/manager/goods/promo/update",
    body: JSON.stringify(params),
  });
};

export const addGoodsActivityDetail = (params: GoodsActivityDetailAPI) => {
  return ultraFetch.post({
    URL: "/manager/goods/promo/submit",
    body: JSON.stringify(params),
  });
};
