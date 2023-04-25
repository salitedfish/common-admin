export enum AirDropTypeType {
  MANUAL,
  TIMING,
  LOTTERY,
  MARKET,
}
export const airDropTypeList = [
  { label: "普通空投", value: AirDropTypeType.MANUAL },
  { label: "定时任务", value: AirDropTypeType.TIMING },
  { label: "抽签空投", value: AirDropTypeType.LOTTERY },
  { label: "营销空投", value: AirDropTypeType.MARKET },
];

export enum AirDropItemType {
  GOODS,
  POINTS,
  COIN,
}
export const airDropItemTypeList = [
  { label: "商品", value: AirDropItemType.GOODS },
  { label: "积分", value: AirDropItemType.POINTS },
  { label: "代币", value: AirDropItemType.COIN },
];

export enum AirDropStateType {
  OFFLINE,
  ONLINE,
}
export const airDropStateList = [
  {
    label: "待上线",
    value: AirDropStateType.OFFLINE,
    action: {
      value: AirDropStateType.ONLINE,
      label: "上线",
    },
  },
  {
    label: "已上线",
    value: AirDropStateType.ONLINE,
    action: {
      value: AirDropStateType.OFFLINE,
      label: "下线",
    },
  },
];

export enum AirDropTaskStateType {
  BEFORE_AIR_DROP,
  AFTER_AIE_DROP,
  AIR_DROP_ING,
}
export const airDropTaskStateList = [
  {
    label: "未空投",
    value: AirDropTaskStateType.BEFORE_AIR_DROP,
  },
  {
    label: "已空投",
    value: AirDropTaskStateType.AFTER_AIE_DROP,
  },
  {
    label: "部分成功",
    value: AirDropTaskStateType.AIR_DROP_ING,
  },
];
export enum AirDropNameStateType {
  BEFORE_HANDLE,
  AFTER_HANDLE,
}
export const airDropNameStateList = [
  {
    label: "未处理",
    value: AirDropNameStateType.BEFORE_HANDLE,
  },
  {
    label: "已处理",
    value: AirDropNameStateType.AFTER_HANDLE,
  },
];
