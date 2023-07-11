import type { CategoryTreeItem, DeepPartial } from "@/type/Common";

export type ManualAirDropListSearchParams = {
  rewardId?: string;
  rewardType?: number;
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
  rewardId: string;
  rewardName: string;
  rewardType: number;
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
  rewardId: string;
  rewardName: string;
  rewardType: number;
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
  rewardId: string;
  rewardName: string;
  rewardType: number;
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
  merchantName: string;
  merchantUid: string;
  name: string;
  runNum: number;
  state: number;
  timeDay: number;
  timeHour: number;
  timeType: number;
  totalNum: number;
  type: number;
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
    timeMonth: number;
    totalNum: number;
    type: number;
  };
  rules: {
    id: number;
    holdNum: number;
    limitNum: number;
    totalUnitNum: number;
    unitNum: number;
    itemId: string;
    itemType: number;
    itemName: string;
    rewardId: string;
    rewardType: number;
    rewardName: string;
    holdType: number;
    holdDay: number;
    holdDayType: number;
    holdProvideTotalNum: number;
    holdRepeatType: number;
  }[];
};
export type TimingAirDropAddParams = {
  info: {
    expireMinute: number | null;
    id?: number;
    name: string;
    timeDay: number | null;
    timeHour: number | null;
    timeType: number | null;
    totalNum: number | null;
    timeMonth: number | null;
    type: number | null;
  };
  rules: {
    id?: number;
    holdNum: number | null;
    limitNum: number | null;
    unitNum: number | null;
    categoryList: CategoryTreeItem[];
    itemId: string | null;
    itemType: number | null;
    itemName: string | null;
    rewardId: string | null;
    rewardType: number | null;
    rewardName: string | null;
    holdType: number | null;
    holdDay: number | null;
    holdDayType: number | null;
    holdProvideTotalNum: number | null;
    holdRepeatType: number | null;

    rewardGoods: { goodsId: string; goodsName: string }[];
    rewardPoints: { pointsId: string; pointsName: string }[];
    rewardCoin: { coinId: string; coinName: string }[];
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
  holdNum?: number;
  itemId?: string;
  limitNum?: number;
  itemType?: number;
  unitNum?: number;

  holdDay?: number;
  holdDayType?: number;
  holdType?: number;
  id?: number;

  startTime?: string;
  endTime?: string;

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
  goodsIds: string[];

  bindAirdropTaskId: number;
  createTime: string;
  merchantName: string;
  merchantUid: number;
  state: number;
  timeMonth: number;
  timeDay: number;
  timeHour: number;
  timeType: number;
};
export type GoodsActivityRule = {
  id: number;
  orderAmount: number;
  inviteLevel: number;
  minVipLevel: number;

  provideType: number;
  rewardId: string;
  rewardName: string;
  rewardPrice: number;
  rewardType: number;
  totalUnitAmount: number;
  tradeType: number;
  unitAmount: number;
  unitType: number;
  userType: number;
  vipType: number;
  regionType: number;
  regionAmount: number;

  rewardGoods: { goodsId: string; goodsName: string }[];
  rewardPoints: { pointsId: string; pointsName: string }[];
  rewardCoin: { coinId: string; coinName: string }[];
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

// 规则白名单
export type GetRuleWhiteListParams = Partial<{
  orderId: string;
  ruleId: number;
  token: string;
  uid: string;
}>;
export type RuleWhiteListItem = {
  orderId: string;
  token: string;
  totalNum: number;
  uid: number;
  unitNum: number;
  unusedNum: number;
  userType: number;
};

export type HoldTypeRuleWhiteListItem = {
  id: number;
  provideNum: number;
  provideTime: string;
  provideTotalNum: number;
  ruleId: number;
  token: string;
};
