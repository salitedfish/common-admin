export type GetPointsListParams = {
  merchantUid?: string;
  pointsId?: string;
  pointsName?: string;
  pointsState?: number;
};

export type PointsItem = {
  chainHash: string;
  createTime: string;
  ercStandard: string;
  filePrefix: string;
  merchantName: string;
  merchantUid: number;
  pointsCover: string;
  pointsId: string;
  pointsName: string;
  pointsState: number;
  pointsStock: number;
  pointsTotal: number;
};
