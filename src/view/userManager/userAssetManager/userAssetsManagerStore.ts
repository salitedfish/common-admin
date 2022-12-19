export enum FreezeType {
  HOLD,
  SUBGIFT,
  SECOND_SALE,
  BLINDBOX,
  EXPRESS,
  SYNTHESIS,
  REFUND,
}
export const freezeTypeList = [
  {
    label: "未冻结持有中",
    value: FreezeType.HOLD,
  },
  {
    label: "转赠",
    value: FreezeType.SUBGIFT,
  },
  {
    label: "寄售",
    value: FreezeType.SECOND_SALE,
  },
  {
    label: "开启盲盒",
    value: FreezeType.BLINDBOX,
  },
  {
    label: "提货",
    value: FreezeType.EXPRESS,
  },
  {
    label: "合成",
    value: FreezeType.SYNTHESIS,
  },
  {
    label: "退款",
    value: FreezeType.REFUND,
  },
];
export const freezeReasonList = [
  {
    label: "无状态",
    value: FreezeType.HOLD,
  },
  {
    label: "转赠",
    value: FreezeType.SUBGIFT,
  },
  {
    label: "寄售",
    value: FreezeType.SECOND_SALE,
  },
  {
    label: "开启盲盒",
    value: FreezeType.BLINDBOX,
  },
  {
    label: "提货",
    value: FreezeType.EXPRESS,
  },
  {
    label: "合成",
    value: FreezeType.SYNTHESIS,
  },
  {
    label: "退款",
    value: FreezeType.REFUND,
  },
];
export enum RecordType {
  FIRST_BUY = 1,
  SUBGIFT,
  AIRDROP,
  SYNTHESIS,
  BLINDBOX,
  SECOND_BUY,
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
    label: "二级购买",
    value: RecordType.SECOND_BUY,
  },
  {
    label: "退款",
    value: RecordType.REFUND,
  },
];
