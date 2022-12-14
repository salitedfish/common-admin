export type SystemVersionListParams = {
  channel?: string;
  state?: number;
};
export type SystemVersionListItem = {
  channel: string;
  description: string;
  downloadUrl: string;
  forceUpdate: false;
  id: number;
  state: number;
  updateTime: string;
  versionCode: number;
  versionName: string;
};

export type AddSystemVersionParams = {
  channel: string | undefined;
  description: string;
  downloadUrl: string;
  forceUpdate: boolean;
  id?: number;
  versionCode: number | null;
  versionName: string;
};

export type SystemConfigListItem = {
  description: string;
  id: number;
  key: string;
  newValue: string;
  value: string;
  valueType: number;
};

export type AdminLogRecordListParams = {
  adminUid?: string;
  clientIp?: string;
  endTime?: string;
  startTime?: string;
};

export type AdminLogRecordListItem = {
  adminUid: number;
  clientIp: string;
  createTime: string;
  id: number;
  nickName: string;
  requestJson: string;
  requestMethod: string;
  requestUri: string;
  responseJson: string;
  userAgent: string;
};
