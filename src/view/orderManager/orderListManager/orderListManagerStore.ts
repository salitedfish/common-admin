export enum InvoiceState {
  BEFORE_INVOICE,
  IN_INVOICE,
  AFTER_INVOICE,
}
export const invoiceState = [
  {
    label: "未开发票",
    value: InvoiceState.BEFORE_INVOICE,
  },
  {
    label: "申请发票",
    value: InvoiceState.IN_INVOICE,
  },
  {
    label: "已开发票",
    value: InvoiceState.AFTER_INVOICE,
  },
];

export enum OrderState {
  BEFORE_PAY,
  IN_PAY,
  PAY_SUCCESS,
  PAY_CANCEL,
}
export const orderStateList = [
  {
    label: "待付款",
    value: OrderState.BEFORE_PAY,
  },
  {
    label: "付款中",
    value: OrderState.IN_PAY,
  },
  {
    label: "付款成功",
    value: OrderState.PAY_SUCCESS,
  },
  {
    label: "付款取消",
    value: OrderState.PAY_CANCEL,
  },
];

export enum OrderType {
  FIRST = 1,
  SECOND,
}
export const orderTypeList = [
  {
    label: "一级交易",
    value: OrderType.FIRST,
  },
  {
    label: "二级交易",
    value: OrderType.SECOND,
  },
];

export enum PayChannel {
  NONE,
  WX,
  SD,
  POINT,
  OFF_LINE,
}
export const payChannelList = [
  {
    label: "无",
    value: PayChannel.NONE,
  },
  {
    label: "微信",
    value: PayChannel.WX,
  },
  {
    label: "杉德",
    value: PayChannel.SD,
  },
  {
    label: "积分",
    value: PayChannel.POINT,
  },
  {
    label: "线下",
    value: PayChannel.OFF_LINE,
  },
];

export enum OrderExchangeType {
  BUY,
  SALE,
}
export const orderExchangeTypeList = [
  {
    label: "买",
    value: OrderExchangeType.BUY,
  },
  {
    label: "卖",
    value: OrderExchangeType.SALE,
  },
];
