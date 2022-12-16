export enum TransferState {
  TRANSFERING,
  SUCCESS,
  FAIL,
}
export const transferStateList = [
  {
    label: "进行中",
    value: TransferState.TRANSFERING,
  },
  {
    label: "成功",
    value: TransferState.SUCCESS,
  },
  {
    label: "失败",
    value: TransferState.FAIL,
  },
];

export enum UserType {
  USER,
  MERCHANT,
  DESTORY,
}
export const userTypeList = [
  {
    label: "用户",
    value: UserType.USER,
  },
  {
    label: "商户",
    value: UserType.MERCHANT,
  },
  {
    label: "销毁",
    value: UserType.DESTORY,
  },
];

export enum RecordType {
  FIRST_BUY = 1,
  SUBGIFT,
  AIRDROP,
  SYNTHESIS,
  BLINDBOX,
  EXPRESS,
  SECOND_SALE,
  SECOND_BUY,
  SECOND_CANCEL,
  REFUND,
}
export const recordTypeList = [
  {
    label: "一级购买",
    value: RecordType.FIRST_BUY,
  },
  {
    label: "转赠",
    value: RecordType.SUBGIFT,
  },
  {
    label: "空投",
    value: RecordType.AIRDROP,
  },
  {
    label: "合成",
    value: RecordType.SYNTHESIS,
  },
  {
    label: "开盲盒",
    value: RecordType.BLINDBOX,
  },
  {
    label: "提货",
    value: RecordType.EXPRESS,
  },
  {
    label: "二级寄售",
    value: RecordType.SECOND_SALE,
  },
  {
    label: "二级购买",
    value: RecordType.SECOND_BUY,
  },
  {
    label: "二级取消",
    value: RecordType.SECOND_CANCEL,
  },
  {
    label: "退款",
    value: RecordType.REFUND,
  },
];
