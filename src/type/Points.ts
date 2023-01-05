export type GetPointsListParams = Partial<{
  merchantUid: string;
  pointsId: string;
  pointsName: string;
  pointsState: number;
  // 筛选的时候赋值的是string，请求时转为number[]
  pointsStates: string | number[];
}>;

export type PointsItem = {
  auditorNote: string;
  auditorTime: string;
  chainHash: string;
  createTime: string;
  ercStandard: string;
  filePrefix: string;
  merchantName: string;
  merchantUid: string;
  pointsCover: string;
  pointsId: string;
  pointsName: string;
  pointsState: number;
  pointsStock: number;
  pointsTotal: number;
};

export type AddPointsParams = {
  pointsCover: string;
  pointsId: string;
  pointsName: string;
  pointsTotal: number | null;
};
