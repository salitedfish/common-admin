export enum AirDropTypeType {
  MANUAL,
  TIMING,
}
export const airDropTypeList = [
  { label: "普通空投", value: 0 },
  { label: "定时任务", value: 1 },
];

export enum AirDropItemType {
  GOODS,
  POINTS,
}
export const airDropItemTypeList = [
  { label: "商品", value: 0 },
  { label: "积分", value: 1 },
];

export enum AirDropStateType {
  OFFLINE,
  ONLINE,
}
export const airDropStateList = [
  {
    label: "待上线",
    value: 0,
    action: {
      value: 1,
      label: "上线",
    },
  },
  {
    label: "已上线",
    value: 1,
    action: {
      value: 0,
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
    value: 0,
  },
  {
    label: "已空投",
    value: 1,
  },
  {
    label: "部分成功",
    value: 2,
  },
];
