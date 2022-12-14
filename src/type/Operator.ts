import type { CategoryTreeItem } from "@/type/Common";

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
  itemType: number;
  name: string;
  startTime: string | null;
};

export type TimingAirDropListSearchParams = {
  itemId?: string;
  itemType?: number;
  merchantUid?: string;
  name?: string;
  timeType?: number;
};
export type TimingAirDropListItem = {
  createTime: string;
  expireMinute: number;
  id: number;
  itemId: string;
  itemType: number;
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
    holdNum: number;
    holdTime: number;
    holdTimeType: number;
    itemId: string;
    limitNum: number;
    type: number;
    unitNum: number;
  }[];
};
export type TimingAirDropAddParams = {
  info: {
    expireMinute: number | null;
    id?: number;
    itemId: string;
    itemType: number | null;
    name: string;
    timeDay: number | null;
    timeHour: number | null;
    timeType: number | null;
    totalNum: number | null;
  };
  rules: {
    holdNum: number | null;
    holdTime: number | null;
    holdTimeType: number | null;
    itemId: string;
    limitNum: number | null;
    type: number | null;
    unitNum: number | null;
    categoryList: CategoryTreeItem[];
  }[];
};

export type GoodsRecommendListParams = {
  goodsId?: string;
  goodsName?: string;
  merchantUid?: string;
};
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

export type BulletinBoardListParams = {
  classify?: number;
  merchantUid?: string;
  state?: number;
  title?: string;
  topState?: number;
  type?: number;
};
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
export type BannerListParams = {
  merchantUid?: string;
  state?: number;
  title?: string;
};
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
export type AddBannerParams = {
  cover?: string;
  endTime?: string;
  id?: number;
  order?: number;
  startTime?: string;
  target?: string;
  title?: string;
  type?: number;
};
