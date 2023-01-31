export type OrderListParam = Partial<{
  classify: number;
  goodsId: string;
  goodsName: string;
  invoiceState: number;
  merchantUid: string;
  orderId: string;
  orderState: number;
  refundState: number;
  orderType: number;
  payChannel: number;
  type: number;
  uid: string;
  endTime: string;
  startTime: string;
}>;
export type OrderListItem = {
  buyerUid: number;
  cancelTime: string;
  goodsCover: string;
  goodsId: string;
  goodsName: string;
  goodsType: number;
  inviterUid: string;
  invoiceState: number;
  merchantName: string;
  merchantUid: number;
  orderId: string;
  orderName: string;
  orderNum: number;
  orderPrice: number;
  orderState: number;
  refundState: number;
  orderTime: string;
  orderToken: string;
  orderTotalAmount: number;
  orderType: number;
  payChannel: number;
  payTime: string;
  sellerUid: number;
};

export type ExpressOrderListParam = Partial<{
  classify: number;
  goodsId: string;
  goodsName: string;
  merchantUid: string;
  orderId: string;
  orderState: number;
  uid: string;
  endTime: string;
  startTime: string;
}>;
export type ExpressOrderListItem = {
  cancelTime: string;
  deliveryTime: string;
  expressCode: string;
  expressName: string;
  finishTime: string;
  goodsCover: string;
  goodsId: string;
  goodsName: string;
  merchantName: string;
  merchantUid: number;
  orderId: string;
  orderName: string;
  orderState: number;
  orderTime: string;
  orderToken: string;
  uid: number;
  userLocation: string;
  userName: string;
  userNote: string;
  userPhone: string;
  userRegion: string;
};
export type LogisticsInfo = {
  data: {
    context: string;
    time: string;
  }[];
  dataSize: number;
  expSpellName: string;
  expTextName: string;
  fee_num: number;
  flag: boolean;
  logo: string;
  mailNo: string;
  msg: string;
  possibleExpList: [];
  queryTimes: number;
  ret_code: number;
  status: number;
  tel: string;
  update: number;
  updateStr: string;
  upgrade_info: string;
};

export type ExpressCompanyByCode = {
  msg: string;
  flag: boolean;
  data: {
    expName: string;
    simpleName: string;
    comCode: string;
  }[];
};
export type ExpressCompany = {
  expName: string;
  imgUrl: string;
  note: string;
  phone: string;
  simpleName: string;
  url: string;
};

export type InvoiceListParam = Partial<{
  endTime: string;
  invoiceState: number;
  startTime: string;
  uid: string;
}>;
export type InvoiceListItem = {
  bankCardCode: string;
  bankName: string;
  createTime: string;
  electronicImage: string;
  invoiceAmount: number;
  invoiceState: number;
  orderId: string;
  registerAddress: string;
  registerPhone: string;
  tin: string;
  title: string;
  titleType: number;
  type: number;
  uid: number;
  updateTime: string;
};
