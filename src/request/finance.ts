import { ultraFetch } from "./init";
import type { Return, ReturnList, Paging } from "@/type/Common";
import type { GetProfitShareListParams, ProfitShareListItem } from "@/type/Finance";

export const getProfitShareList = (params: Paging & GetProfitShareListParams): Promise<Return<ReturnList<ProfitShareListItem>>> => {
  return ultraFetch.post({
    URL: "/manager/order/profit-sharing/page",
    body: JSON.stringify(params),
  });
};

export const syncProfitShare = (params: { accept: number | null; inOrderId: string; state: number | null }): Promise<Return<unknown>> => {
  return ultraFetch.post({
    URL: "/manager/order/profit-sharing/sync",
    body: JSON.stringify(params),
  });
};
