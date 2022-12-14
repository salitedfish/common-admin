import { ultraFetch } from "./init";
import type { Paging, Return, ReturnList } from "@/type/Common";
import type { SystemVersionListItem, SystemVersionListParams, AddSystemVersionParams, AdminLogRecordListItem, AdminLogRecordListParams } from "@/type/System";

// 系统版本相关
export const getSystemVersionList = (params: Paging & SystemVersionListParams): Promise<Return<ReturnList<SystemVersionListItem>>> => {
  return ultraFetch.post({
    URL: "/manager/channel-version/page",
    body: JSON.stringify(params),
  });
};

export const getSystemVersionDetail = (params: { id: number }): Promise<Return<SystemVersionListItem>> => {
  return ultraFetch.get({
    URL: "/manager/channel-version/detail",
    params,
  });
};

export const addSystemVersion = (params: AddSystemVersionParams) => {
  return ultraFetch.post({
    URL: "/manager/channel-version/submit",
    body: JSON.stringify(params),
  });
};

export const editSystemVersion = (params: AddSystemVersionParams) => {
  return ultraFetch.post({
    URL: "/manager/channel-version/update",
    body: JSON.stringify(params),
  });
};

export const updateSystemVersion = (params: { id: number; state: number }) => {
  return ultraFetch.post({
    URL: "/manager/channel-version/state",
    body: JSON.stringify(params),
  });
};

export const deleteSystemVersion = (params: { id: number }) => {
  return ultraFetch.post({
    URL: "/manager/channel-version/delete",
    body: JSON.stringify(params),
  });
};

export const getChannelList = () => {
  return ultraFetch.get({
    URL: "/manager/channel-version/channel/list",
  });
};

// 系统配置相关
export const getSystemConfigList = () => {
  return ultraFetch.get({
    URL: "/manager/config/list",
  });
};
export const editSystemConfig = (params: { key: string; newValue: string }) => {
  return ultraFetch.post({
    URL: "/manager/config/update",
    body: JSON.stringify(params),
  });
};
export const applySystemConfig = () => {
  return ultraFetch.post({
    URL: "/manager/config/use",
  });
};

// 平台日志
export const getAdminLogRecordList = (params: Paging & AdminLogRecordListParams): Promise<Return<ReturnList<AdminLogRecordListItem>>> => {
  return ultraFetch.post({
    URL: "/manager/platform/log/page",
    body: JSON.stringify(params),
  });
};
