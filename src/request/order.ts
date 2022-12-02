import { ultraFetch } from "./init";
import type * as RequestParam from "@/request/type/RequestParam";
import type * as RequestReturn from "@/request/type/RequestReturn";

export const getOrderList = (params: RequestParam.GetOrderList): RequestReturn.GetOrderList => {
  return ultraFetch.post({
    URL: "/manager/order/page",
    body: JSON.stringify(params),
  });
};

export const orderOffLineComfirm = (params: { orderId: string }) => {
  return ultraFetch.post({
    URL: "/manager/order/offline-confirm",
    body: JSON.stringify(params),
  });
};
export const orderSyncComfirm = (params: { orderId: string }) => {
  return ultraFetch.post({
    URL: "/manager/order/sync",
    body: JSON.stringify(params),
  });
};

export const getExpressOrderList = (params: RequestParam.GetExpressOrderList): RequestReturn.GetExpressOrderList => {
  return ultraFetch.post({
    URL: "/manager/order/express/page",
    body: JSON.stringify(params),
  });
};

export const getExpressLogistics = (params: { orderId: string }): RequestReturn.GetExpressLogistics => {
  return ultraFetch.get({
    URL: "/manager/order/express/express-info",
    params,
  });
};

export const getExpressCompanyList = (params: { name?: string; page: number; size: number }): RequestReturn.GetExpressCompanyList => {
  return ultraFetch.post({
    URL: "/manager/order/express/express-type",
    body: JSON.stringify(params),
  });
};

export const expressDelivery = (params: { expressCode?: string; expressName?: string; orderId: string }) => {
  return ultraFetch.post({
    URL: "/manager/order/express/delivery",
    body: JSON.stringify(params),
  });
};
