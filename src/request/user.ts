import { ultraFetch } from "./init";
import type * as RequestParam from "@/request/type/RequestParam";
import type * as RequestReturn from "@/request/type/RequestReturn";

export const getUserList = (params: RequestParam.GetUserList): RequestReturn.GetUserList => {
  return ultraFetch.post({
    URL: "/manager/user/page",
    body: JSON.stringify(params),
  });
};

export const updateUserState = (params: { state: number; uid: number }) => {
  return ultraFetch.post({
    URL: "/manager/user/state",
    body: JSON.stringify(params),
  });
};

export const updateUserTab = (params: { tab: number; uid: number }) => {
  return ultraFetch.post({
    URL: "/manager/user/tab",
    body: JSON.stringify(params),
  });
};
