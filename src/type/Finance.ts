export type GetProfitShareListParams = Partial<{
  channelType: number;
  merchantUid: string;
  orderId: string;
  orderType: number;
  state: number;
  endTime: string;
  startTime: string;
}>;

export type ProfitShareListItem = {
  channelType: number;
  createTime: string;
  id: number;
  inOrderId: string;
  merchantAmount: number;
  merchantName: string;
  merchantRate: number;
  merchantUid: number;
  note: string;
  orderId: string;
  orderTotalAmount: number;
  orderType: number;
  outOrderId: string;
  platformAmount: number;
  platformRate: number;
  state: number;
};

export type ChainRecordParams = Partial<{
  chainAddress: string;
  goodsId: string;
  pointsId: string;
  token: string;
  transState: number;
  uid: string;
  userType: number;
  endTime: string;
  startTime: string;
}>;

export type GoodsChainRecordItem = {
  chainHash: string;
  createTime: string;
  fromChainAddress: string;
  fromType: number;
  fromUid: number;
  goodsCover: string;
  goodsId: string;
  goodsName: string;
  goodsTotal: number;
  recordType: number;
  toChainAddress: string;
  toType: number;
  toUid: number;
  token: string;
  transState: number;
  transferId: string;
  updateTime: string;
};

export type PointsChainRecordItem = {
  chainHash: string;
  createTime: string;
  fromChainAddress: string;
  fromType: number;
  fromUid: number;
  num: number;
  pointsCover: string;
  pointsId: string;
  pointsName: string;
  recordType: number;
  toChainAddress: string;
  toType: number;
  toUid: number;
  token: string;
  transState: number;
  transferId: string;
  updateTime: string;
};

export type FinanceData = {
  countExpress: number;
  countGoods: number;
  primaryCountOrder: number;
  primarySumOrderAmount: number;
  primarySumOrderNum: number;
  secondaryCountOrder: number;
  secondarySumOrderAmount: number;
  secondarySumOrderNum: number;
};

// 平行链代币记录
export type ParallelRecordParams = Partial<{
  chainAddress: string;
  endTime: string;
  startTime: string;
  token: string;
  transState: number;
  uid: string;
  userType: number;
}>;

export type ParallelRecordItem = {
  chainHash: string;
  createTime: string;
  fromChainAddress: string;
  fromType: number;
  fromUid: number;
  num: number;
  recordType: number;
  toChainAddress: string;
  toType: number;
  toUid: number;
  token: string;
  transState: number;
  transferId: string;
  updateTime: string;
};

// 提币管理
export type ParallelCoinWithdrawListScreenParams = Partial<{
  state: number;
  toAddress: string;
  token: string;
  type: string;
  uid: string;
}>;

export type ParallelCoinWithdrawListItem = {
  auditorTime: string;
  createTime: string;
  num: number;
  state: number;
  toAddress: string;
  token: string;
  type: number;
  uid: string;
  id: number;
};
