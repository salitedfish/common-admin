import type { CategoryTreeItem } from "@/type/Common";
export type SearchParams = Partial<{
  classify: number;
  goodsId: string;
  goodsName: string;
  goodsState: number;
  goodsType: number;
  merchantUid: string;
}>;

export type GoodsListItem = {
  activeTime: string;
  auditorNote: string;
  auditorTime: string;
  auditorUid: number;
  ercStandard: string;
  goodsCollections: number;
  goodsCover: string;
  goodsId: string;
  goodsName: string;
  goodsPrice: number;
  goodsSaleTime: string;
  goodsSales: number;
  goodsType: number;
  goodsState: number;
  goodsStock: number;
  goodsTotal: number;
  merchantHeadUrl: string;
  merchantName: string;
  merchantUid: number;
  saleType: number;
  classifies: number[];
};

export type GoodsDetail = {
  spu: {
    classifies: number[];
    ercStandard: string | null;
    goodsCover: string;
    goodsDes: string;
    goodsDetail: string;
    goodsId: string | null;
    goodsImages: string[];
    goodsName: string;
    goodsPrice: number | null;
    goodsProps: Record<string, unknown>;
    goodsPropsList: { key: string; value: string }[];
    goodsTotal: number | null;
    goodsVideo: string;
    goodsVideoCover: string;
    goodsState?: number;
  };
  extend: {
    expressEndTime: string | null;
    expressTime: string | null;
    expressType: number | null;
    goodsId: string | null;
    goodsLevel: number | null;
    goodsSaleTime: string | null;
    goodsTabType: number | null;
    goodsType: number | null;
    normalSaleTime: string | null;
    orderLimit: number | null;
    priorityPrice: number | null;
    ruleCalcTime: string | null;
    saleType: number | null;
    traceHash: string | null;
  };
  points: {
    goodsId: string | null;
    needNum: number | null;
    pointsId: string | null;
    pointsCover?: string;
    pointsName?: string;
  };
  rules: {
    endTime: string | null;
    holdNum: number | null;
    itemId: string | null;
    categoryList: CategoryTreeItem[];
    limitNum: number | null;
    startTime: string | null;
    type: number | null;
    unitNum: number | null;
  }[];
};
