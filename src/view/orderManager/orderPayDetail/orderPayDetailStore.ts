// export type ChannelType = {

// }
// export const channelTypes = [];
export enum PointsType {
  POINTS,
  COIN,
}

export const pointsTypeList = [
  { label: "积分", value: PointsType.POINTS },
  { label: "代币", value: PointsType.COIN },
];

export enum PayState {
  PAY_ING = 1,
  PAY_SUCCESS,
  PAY_FAIL,
}

export const payStates = [
  {
    label: "支付中",
    value: PayState.PAY_ING,
  },
  {
    label: "支付成功",
    value: PayState.PAY_SUCCESS,
  },
  {
    label: "支付失败",
    value: PayState.PAY_FAIL,
  },
];

export enum PayStateTwo {
  PAY_ING,
  PAY_SUCCESS,
  PAY_FAIL,
}

export const payStatesTwo = [
  {
    label: "进行中",
    value: PayStateTwo.PAY_ING,
  },
  {
    label: "成功",
    value: PayStateTwo.PAY_SUCCESS,
  },
  {
    label: "失败",
    value: PayStateTwo.PAY_FAIL,
  },
];
