export enum InvoiceState {
  BEFORE_INVOICE,
  IN_INVOICE,
  AFTER_INVOICE,
  CANCEL_INVOICE,
}
export const invoiceStateList = [
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
  {
    label: "撤销开票",
    value: InvoiceState.CANCEL_INVOICE,
  },
];

export enum InvoiceTitleType {
  PERSONAL,
  ENTERPRISE,
}
export const invoiceTitleTypeList = [
  {
    label: "个人",
    value: InvoiceTitleType.PERSONAL,
  },
  {
    label: "单位",
    value: InvoiceTitleType.ENTERPRISE,
  },
];

export enum InvoiceType {
  NORMAL,
  SPECAIL,
}
export const invoiceTypeList = [
  {
    label: "普通发票",
    value: InvoiceType.NORMAL,
  },
  {
    label: "增值税专用发票",
    value: InvoiceType.SPECAIL,
  },
];

export enum ApprovialInvoice {
  NO,
  YES,
}
export const approvialInvoiceList = [
  {
    label: "不同意",
    value: ApprovialInvoice.NO,
  },
  {
    label: "同意",
    value: ApprovialInvoice.YES,
  },
];
