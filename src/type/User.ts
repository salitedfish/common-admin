export type UserListParam = Partial<{
  chainAddress: string;
  inviteCode: string;
  phone: string;
  state: number;
  tab: number;
  uid: string;
  endTime: string;
  startTime: string;
}>;
export type UserListItem = {
  chainAddress: string;
  headUrl: string;
  inviteCode: string;
  inviteNum: number;
  lastLoginIp: string;
  lastLoginTime: string;
  memberLevel: number;
  nodeLevel: number;
  nickName: string;
  phone: string;
  registerCode: string;
  registerTime: string;
  state: number;
  tab: number;
  uid: number;
};

export type AdminMerchantListParam = Partial<{
  chainAddress: string;
  phone: string;
  role: number;
  uid: string;
  endTime: string;
  startTime: string;
}>;
export type AdminMerchantListItem = {
  chainAddress: string;
  chainPublicKey: string;
  headUrl: string;
  lastLoginTime: string;
  loginPassword: string;
  nickName: string;
  phone: string;
  registerTime: string;
  role: number;
  state: number;
  subMchid: string;
  uid: number;
};

export type GetUserAssetsListParams = Partial<{
  classify: number;
  freezeType: number;
  goodsId: string;
  goodsName: string;
  goodsType: number;
  token: string;
  uid: string;
}>;
export type UserAssetsListItem = {
  freezeNum: number;
  freezeType: number;
  goodsCover: string;
  goodsId: string;
  goodsLevel: number;
  goodsName: string;
  goodsTotal: number;
  goodsType: number;
  holdNum: number;
  price: number;
  recordType: number;
  token: string;
  uid: number;
  updateTime: string;
};

export type GetUserPointsListParams = Partial<{
  merchantUid: string;
  pointsId: string;
  pointsName: string;
  token: string;
  uid: string;
}>;
export type UserPointsListItem = {
  freezeNum: number;
  holdNum: number;
  merchantName: string;
  merchantUid: number;
  pointsCover: string;
  pointsId: string;
  pointsName: string;
  token: string;
  uid: number;
  updateTime: string;
};

export type UserRealInfo = {
  createTime: string;
  idCardCode: string;
  idCardName: string;
  uid: string;
};

export type VipLevelItem = Partial<{
  // level: number;
  amount: number | null;
  goodsId: string;
  goodsName: string;
  level: number;
  name: string;
  type: number;
  vipType: number;
}> & {
  goodsSelectList: { goodsId: string; goodsName: string }[];
};

// 用户平行链代币管理
export type UserParallelCoinListScreenParams = Partial<{
  token: string;
  type: number;
  uid: string;
}>;

export type UserParallelCoinListItem = {
  freezeNum: number;
  giftType: number;
  holdNum: number;
  token: string;
  type: number;
  uid: string;
  auditType: number;
};
