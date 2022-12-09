import { ultraFetch } from "./init";
import type { Return, ReturnList, Paging } from "@/type/Common";
import type {
  ManualAirDropDetail,
  ManualAirDropListSearchParams,
  ManualAirDropListItem,
  ManualAirDropAddParams,
  TimingAirDropListSearchParams,
  TimingAirDropListItem,
  TimingAirDropDetail,
  TimingAirDropAddParams,
} from "@/type/Operator";

// 以下是空投管理相关
export const deleteManualAirDrop = (params: { id: number }): Promise<Return<unknown>> => {
  return ultraFetch.post({
    URL: "/manager/airdrop/delete",
    body: JSON.stringify(params),
  });
};

export const getDetailManualAirDrop = (params: { id: number }): Promise<Return<ManualAirDropDetail>> => {
  return ultraFetch.get({
    URL: "/manager/airdrop/detail",
    params,
  });
};

export const getListManualAirDrop = (params: Paging & ManualAirDropListSearchParams): Promise<Return<ReturnList<ManualAirDropListItem>>> => {
  return ultraFetch.post({
    URL: "/manager/airdrop/page",
    body: JSON.stringify(params),
  });
};

export const updateManualAirDropState = (params: { id: number; state: number }): Promise<Return<unknown>> => {
  return ultraFetch.post({
    URL: "/manager/airdrop/state",
    body: JSON.stringify(params),
  });
};

export const syncManualAirDrop = (params: { id: number }): Promise<Return<unknown>> => {
  return ultraFetch.post({
    URL: "/manager/airdrop/sync",
    body: JSON.stringify(params),
  });
};

export const addManualAirDrop = (params: ManualAirDropAddParams): Promise<Return<unknown>> => {
  return ultraFetch.post({
    URL: "/manager/airdrop/submit",
    body: JSON.stringify(params),
  });
};

export const editManualAirDrop = (params: ManualAirDropAddParams): Promise<Return<unknown>> => {
  return ultraFetch.post({
    URL: "/manager/airdrop/update",
    body: JSON.stringify(params),
  });
};

// 以下是定时空投任务相关
export const deleteTimingAirDrop = (params: { id: number }): Promise<Return<unknown>> => {
  return ultraFetch.post({
    URL: "/manager/airdrop/task/delete",
    body: JSON.stringify(params),
  });
};
export const getDetailTimingAirDrop = (params: { id: number }): Promise<Return<TimingAirDropDetail>> => {
  return ultraFetch.get({
    URL: "/manager/airdrop/task/detail",
    params,
  });
};
export const getListTimingAirDrop = (params: Paging & TimingAirDropListSearchParams): Promise<Return<ReturnList<TimingAirDropListItem>>> => {
  return ultraFetch.post({
    URL: "/manager/airdrop/task/page",
    body: JSON.stringify(params),
  });
};
export const updateTimingAirDropState = (params: { id: number; state: number }): Promise<Return<unknown>> => {
  return ultraFetch.post({
    URL: "/manager/airdrop/task/state",
    body: JSON.stringify(params),
  });
};
export const addTimingAirDrop = (params: TimingAirDropAddParams): Promise<Return<unknown>> => {
  return ultraFetch.post({
    URL: "/manager/airdrop/task/submit",
    body: JSON.stringify(params),
  });
};
export const editTimingAirDrop = (params: TimingAirDropAddParams): Promise<Return<unknown>> => {
  return ultraFetch.post({
    URL: "/manager/airdrop/task/update",
    body: JSON.stringify(params),
  });
};
