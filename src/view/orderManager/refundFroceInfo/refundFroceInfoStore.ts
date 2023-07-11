export enum PayChannel {
  NONE = 0,
  WEI_XIN,
  SHAN_DE,
  POINTS,
  OUT_LINE,
}

export const payChannelList = [
  {
    label: "无",
    value: PayChannel.NONE,
  },
  {
    label: "微信",
    value: PayChannel.WEI_XIN,
  },
  {
    label: "杉德",
    value: PayChannel.SHAN_DE,
  },
  {
    label: "积分",
    value: PayChannel.POINTS,
  },
  {
    label: "线下",
    value: PayChannel.OUT_LINE,
  },
];

export enum PointsType {
  POINTS,
  COIN,
}

export const PointsTypeList = [
  {
    label: "积分",
    value: PointsType.POINTS,
  },
  {
    label: "代币",
    value: PointsType.COIN,
  },
];

export enum RewardType {
  GOODS,
  POINTS,
  COINS,
}
export const rewardTypeList = [
  {
    label: "商品",
    value: RewardType.GOODS,
  },
  {
    label: "积分",
    value: RewardType.POINTS,
  },
  {
    label: "代币",
    value: RewardType.COINS,
  },
];
