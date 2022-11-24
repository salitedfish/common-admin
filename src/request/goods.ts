import { ultraFetch } from "./init";
import type * as RequestParam from "@/request/type/RequestParam";
import type * as RequestReturn from "@/request/type/RequestReturn";

export const getGoodsList = (params: RequestParam.GetGoodsList): RequestReturn.GetGoodsList => {
  return ultraFetch.post({
    URL: "/manager/goods/page",
    body: JSON.stringify(params),
  });
};

export const goodsSubmit = (params: RequestParam.GoodsSubmit) => {
  return ultraFetch.post({
    URL: "/manager/goods/submit",
    body: JSON.stringify(params),
  });
};
