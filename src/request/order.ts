import { ultraFetch } from "./init";
import type * as RequestParam from "@/request/type/RequestParam";
import type * as RequestReturn from "@/request/type/RequestReturn";
import type { Paging, Return, ReturnList } from "@/type/Common";
import type { OrderListParam, ExpressOrderListParam, InvoiceListParam, InvoiceListItem, ExpressCompanyByCode, OrderPromoDetail, OrderPayDetail } from "@/type/Order";

export const getOrderList = (params: RequestParam.GetOrderList): RequestReturn.GetOrderList => {
  return ultraFetch.post({
    URL: "/manager/order/page",
    body: JSON.stringify(params),
  });
};
export const getOrderPayDetail = (params: { orderId: string }) => {
  return ultraFetch.get<Return<OrderPayDetail>>({
    URL: "/manager/order/pay/detail",
    params,
  });
};
export const exportOrderList = (params: OrderListParam) => {
  return ultraFetch.get<Blob>({
    URL: "/manager/order/excel",
    params,
  });
};

export const orderRefundComfirm = (params: { orderId: string; note: string; state: number | null }) => {
  return ultraFetch.post({
    URL: "/manager/order/refund/confirm",
    body: JSON.stringify(params),
  });
};
export const orderRefundSyncComfirm = (params: { orderId: string }) => {
  return ultraFetch.post({
    URL: "/manager/order/refund/sync",
    body: JSON.stringify(params),
  });
};
export const orderOffLineComfirm = (params: { orderId: string; state: number | null }) => {
  return ultraFetch.post({
    URL: "/manager/order/pay/offline-confirm",
    body: JSON.stringify(params),
  });
};
export const orderSyncComfirm = (params: { orderId: string }) => {
  return ultraFetch.post({
    URL: "/manager/order/pay/sync",
    body: JSON.stringify(params),
  });
};

export const getExpressOrderList = (params: RequestParam.GetExpressOrderList): RequestReturn.GetExpressOrderList => {
  return ultraFetch.post({
    URL: "/manager/order/express/page",
    body: JSON.stringify(params),
  });
};
export const exportExpressOrderList = (params: ExpressOrderListParam) => {
  return ultraFetch.get<Blob>({
    URL: "/manager/order/express/excel",
    params,
  });
};

export const getExpressLogistics = (params: { orderId: string }): RequestReturn.GetExpressLogistics => {
  return ultraFetch.get({
    URL: "/manager/order/express/express-info",
    params,
  });
};

export const getExpressCompanyListByCode = (params: { expressCode: string }) => {
  return ultraFetch.get<Return<ExpressCompanyByCode>>({
    URL: "/manager/order/express/express-com",
    params,
  });
};

export const getExpressCompanyList = (params: { name?: string; page: number; size: number }): RequestReturn.GetExpressCompanyList => {
  return ultraFetch.post({
    URL: "/manager/order/express/express-type/page",
    body: JSON.stringify(params),
  });
};

export const expressDelivery = (params: { expressCode?: string | null; expressName?: string | null; orderId: string; expressCom: string | null }) => {
  return ultraFetch.post({
    URL: "/manager/order/express/delivery",
    body: JSON.stringify(params),
  });
};

export const getInvoiceList = (params: Paging & InvoiceListParam) => {
  return ultraFetch.post<Return<ReturnList<InvoiceListItem>>>({
    URL: "/manager/order/invoice/page",
    body: JSON.stringify(params),
  });
};
export const exportInvoiceList = (params: InvoiceListParam) => {
  return ultraFetch.get<Blob>({
    URL: "/manager/order/invoice/excel",
    params,
  });
};
export const addInvoice = (params: { electronicImage: string; orderId: string; state: number }) => {
  return ultraFetch.post({
    URL: "/manager/order/invoice/make",
    body: JSON.stringify(params),
  });
};
export const getOrderPromoDetail = (params: { orderId: string | number }) => {
  return ultraFetch.get<Return<OrderPromoDetail[]>>({
    URL: "/manager/order/promo/detail",
    params,
  });
};
