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
  giftType: number;
};

export type AddPointsParams = {
  pointsCover: string;
  pointsId: string;
  pointsName: string;
  pointsTotal: number | null;
  giftType: number | null;
};

// 平行链代币
export type ParallelCoinListParams = Partial<{
  token: string;
  merchantUid: string;
}>;

export type ParallelCoinItem = {
  address: string;
  token: string;
  freezeNum: number;
  holdNum: number;
  merchantName: string;
  merchantUid: number;
  privateKey: string;

  id: number;
  label: string;
  giftType: number;
  type: number;
};

export type ParallelCoinDetail = Partial<{
  address: string;
  token: string;
  privateKey: string;

  giftType: number;
  id: number;
  label: string;
  type: number;
}>;
