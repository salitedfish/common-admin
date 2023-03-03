export enum FreezeType {
  HOLD,
  SUBGIFT,
  SECOND_SALE,
  BLINDBOX,
  EXPRESS,
  SYNTHESIS,
  REFUND,
  EXCHANGE,
}
export const freezeTypeList = [
  {
    label: "未冻结",
    value: FreezeType.HOLD,
  },
  {
    label: "转赠中",
    value: FreezeType.SUBGIFT,
  },
  {
    label: "寄售中",
    value: FreezeType.SECOND_SALE,
  },
  {
    label: "开启盲盒中",
    value: FreezeType.BLINDBOX,
  },
  {
    label: "提货中",
    value: FreezeType.EXPRESS,
  },
  {
    label: "合成中",
    value: FreezeType.SYNTHESIS,
  },
  {
    label: "退款中",
    value: FreezeType.REFUND,
  },
  {
    label: "兑换中",
    value: FreezeType.EXCHANGE,
  },
];
export const freezeReasonList = [
  {
    label: "-",
    value: FreezeType.HOLD,
  },
  {
    label: "转赠中",
    value: FreezeType.SUBGIFT,
  },
  {
    label: "寄售中",
    value: FreezeType.SECOND_SALE,
  },
  {
    label: "开启盲盒中",
    value: FreezeType.BLINDBOX,
  },
  {
    label: "提货中",
    value: FreezeType.EXPRESS,
  },
  {
    label: "合成中",
    value: FreezeType.SYNTHESIS,
  },
  {
    label: "退款中",
    value: FreezeType.REFUND,
  },
  {
    label: "兑换中",
    value: FreezeType.EXCHANGE,
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
  EXCHANGE,
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
  {
    label: "兑换",
    value: RecordType.EXCHANGE,
  },
];
