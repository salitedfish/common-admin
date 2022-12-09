export type GetProfitShareListParams = {
  channelType?: number;
  merchantUid?: string;
  orderId?: string;
  orderType?: number;
  state?: number;
};

export type ProfitShareListItem = {
  channelType: number;
  createTime: string;
  id: number;
  inOrderId: string;
  merchantAmount: number;
  merchantName: string;
  merchantRate: number;
  merchantUid: number;
  note: string;
  orderId: string;
  orderTotalAmount: number;
  orderType: number;
  outOrderId: string;
  platformAmount: number;
  platformRate: number;
  state: number;
};
