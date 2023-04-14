import type { CategoryTreeItem, DeepPartial } from "@/type/Common";

export type ManualAirDropListSearchParams = {
  itemId?: string;
  itemType?: number;
  merchantUid?: string;
  name?: string;
  state?: number;
  taskState?: number;
  type?: number;
};
export type ManualAirDropListItem = {
  createTime: string;
  hitUsers: number;
  id: number;
  itemId: string;
  itemName: string;
  itemType: number;
  merchantName: string;
  merchantUid: string;
  name: string;
  note: string;
  startTime: string;
  state: number;
  taskState: number;
  totalUsers: number;
  type: number;
};
export type ManualAirDropDetail = {
  createTime: string;
  hitUsers: number;
  id: number;
  itemId: string;
  itemName: string;
  itemType: number;
  merchantName: string;
  merchantUid: string;
  name: string;
  note: string;
  startTime: string;
  state: number;
  taskState: number;
  totalUsers: number;
  type: number;
};
export type ManualAirDropAddParams = {
  id?: number;
  itemId: string;
  itemName: string;
  itemType: number;
  name: string;
  startTime: string | null;
};

export type TimingAirDropListSearchParams = Partial<{
  itemId: string;
  itemType: number;
  merchantUid: string;
  name: string;
  timeType: number;
}>;
export type TimingAirDropListItem = {
  createTime: string;
  expireMinute: number;
  id: number;
  itemId: string;
  itemType: number;
  itemName: string;
  merchantName: string;
  merchantUid: string;
  name: string;
  runNum: number;
  state: number;
  timeDay: number;
  timeHour: number;
  timeType: number;
  totalNum: number;
};
export type TimingAirDropDetail = {
  info: {
    createTime: string;
    expireMinute: number;
    id: number;
    itemId: string;
    itemName: string;
    itemType: number;
    merchantName: string;
    merchantUid: number;
    name: string;
    runNum: number;
    state: number;
    timeDay: number;
    timeHour: number;
    timeType: number;
    totalNum: number;
  };
  rules: {
    id: number;
    holdNum: number;
    holdTime: number;
    holdTimeType: number;
    itemId: string;
    limitNum: number;
    totalUnitNum: number;

    type: number;
    unitNum: number;
  }[];
};
export type TimingAirDropAddParams = {
  info: {
    expireMinute: number | null;
    id?: number;
    itemId: string;
    itemName: string;
    itemType: number | null;
    name: string;
    timeDay: number | null;
    timeHour: number | null;
    timeType: number | null;
    totalNum: number | null;
  };
  rules: {
    id?: number;
    holdNum: number | null;
    holdTime: number | null;
    holdTimeType: number | null;
    itemId: string;
    limitNum: number | null;
    totalUnitNum: number | null;
    type: number | null;
    unitNum: number | null;
    categoryList: CategoryTreeItem[];
  }[];
};

export type GoodsRecommendListParams = Partial<{
  goodsId: string;
  goodsName: string;
  merchantUid: string;
}>;
export type GoodsRecommendListItem = {
  goodsCover: string;
  goodsId: string;
  goodsName: string;
  goodsSales: number;
  goodsStock: number;
  goodsTotal: number;
  id: number;
  merchantName: string;
  merchantUid: number;
  topState: number;
};

export type BulletinBoardListParams = Partial<{
  classify: number;
  merchantUid: string;
  state: number;
  title: string;
  topState: number;
  type: number;
}>;
export type BulletinBoardListItem = {
  activeTime: string;
  classifies: [];
  content: string;
  cover: string;
  createTime: string;
  id: number;
  merchantName: string;
  merchantUid: number;
  state: number;
  summary: string;
  title: string;
  topState: number;
  type: number;
};
export type AddBulletinBoard = {
  classifies: number[];
  content: string;
  cover: string;
  id?: string;
  summary: string;
  title: string;
  type: number | null;
};

// banner管理
export type BannerListParams = Partial<{
  merchantUid: string;
  state: number;
  title: string;
}>;
export type BannerListItem = {
  cover: string;
  endTime: string;
  id: number;
  merchantName: string;
  merchantUid: string;
  order: number;
  startTime: string;
  state: number;
  target: string;
  title: string;
  type: number;
};
export type AddBannerParams = Partial<{
  cover: string;
  endTime: string;
  id: number;
  order: number;
  startTime: string;
  target: string;
  title: string;
  type: number;
}>;

// 搜索管理
export type SearchKeywordsListItem = {
  id: number;
  keyword: string;
  order: number;
};

// 抽签
export type LotteryListParams = Partial<{
  lotteryTabType: LotteryTabType;
  merchantUid: string;
  name: string;
  state: LotteryState;
  taskState: LotteryTaskState;
  useType: number;
}>;
export type LotteryListItem = {
  acquireDes: string;
  activeTime: string;
  adImage: string;
  auditorNote: string;
  auditorTime: string;
  auditorUid: number;
  blockHash: string;
  blockHeight: number;
  createTime: string;
  distributeTime: string;
  lotteryTabType: number;
  endTime: string;
  goodsId: string;
  goodsName: string;
  id: number;
  joinNum: number;
  lotteryRule: string;
  lotteryTime: string;
  merchantName: string;
  merchantUid: number;
  name: string;
  numLen: number;
  overReduce: number;
  rate: number;
  rateType: number;
  realHitNum: number;
  siteRepeat: number;
  startTime: string;
  state: number;
  taskState: number;
  totalNum: number;
  hitType: number;
  useType: number;
};
export enum LotteryTabType {
  ALL = -1,
  NORMAL,
  TEST,
  APPROVE,
}
export enum LotteryState {
  ALL = -1,
  DRAFT,
  TO_BE_APPROVIAL,
  APPROVIAL_FAILED,
  TO_BE_SHELVES,
  ON_THE_SHELF,
}
export enum LotteryTaskState {
  ALL = -1,
  INIT,
  ISSUED,
  AVARDED,
}
export enum LotteryUseType {
  NONE,
  PRIORIT_PURCHASE,
  AIR_DROP,
}

export type lotteryRule = {
  endTime?: string;
  holdNum?: number;
  itemId?: string;
  limitNum?: number;
  startTime?: string;
  type?: number;
  unitNum?: number;

  categoryList: CategoryTreeItem[];
  goodsList: { goodsId: string | number; goodsName: string }[];
};
export type LotteryFormDetail = {
  info: Partial<{
    acquireDes: string;
    adImage: string;
    endTime: string;
    goodsId: string;
    id: number;
    lotteryRule: string;
    lotteryTabType: number;
    name: string;
    numLen: number;
    overReduce: number;
    rate: number;
    rateType: number;
    siteRepeat: number;
    startTime: string;
    hitType: number;
    useType: number;
  }>;
  rules: lotteryRule[];
};
export type LotteryDetail = {
  info: Partial<LotteryListItem>;
  rules: lotteryRule[];
};

// 商品活动
export type GoodsActivityListParams = Partial<{
  goodsId: string;
  goodsName: string;
  itemId: string;
  itemType: number;
  merchantUid: string;
  name: string;
  timeType: number;
}>;
export type GoodsActivityListItem = {
  id: number;
  name: string;
  goodsId: string;
  goodsName: string;
  itemType: number;
  itemId: string;
  itemName: string;

  bindAirdropTaskId: number;
  createTime: string;
  merchantName: string;
  merchantUid: number;
  state: number;
  timeDay: number;
  timeHour: number;
  timeType: number;
};
export type GoodsActivityRule = {
  id: number;
  belowOrderNum: number;
  inviteLevel: number;
  minVipLevel: number;
  totalUnitNum: number;
  type: number;
  unitNum: number;
};
export type GoodsActivityDetailAPI = {
  info: Partial<GoodsActivityListItem>;
  rules: Partial<GoodsActivityRule>[];
};
export type GoodsActivityDetailViewRule = Partial<{
  belowOrderNum: number;
  rule: Partial<GoodsActivityRule>[];
}>;
export type GoodsActivityDetailView = {
  info: Partial<GoodsActivityListItem>;
  rules: GoodsActivityDetailViewRule[];
};
