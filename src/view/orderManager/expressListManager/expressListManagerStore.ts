export enum ExpressOrderState {
  ALL = -1,
  BEFORE_EXPRESS,
  AFTER_EXPRESS,
  RECEICED,
  CANCEL_EXPRESS,
}
export const expressOrderStateList = [
  {
    label: "待发货",
    value: ExpressOrderState.BEFORE_EXPRESS,
  },
  {
    label: "已发货",
    value: ExpressOrderState.AFTER_EXPRESS,
  },
  {
    label: "已收货",
    value: ExpressOrderState.RECEICED,
  },
  {
    label: "已收货",
    value: ExpressOrderState.CANCEL_EXPRESS,
  },
  {
    label: "全部",
    value: ExpressOrderState.ALL,
  },
];
