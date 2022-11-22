export type SearchParams = {
  classify?: number;
  goodsId?: string;
  goodsName?: string;
  goodsState?: number;
  goodsType?: number;
  merchantUid?: string;
};

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
};
