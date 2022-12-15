export type GetProfitShareListParams = Partial<{
  channelType: number;
  merchantUid: string;
  orderId: string;
  orderType: number;
  state: number;
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
