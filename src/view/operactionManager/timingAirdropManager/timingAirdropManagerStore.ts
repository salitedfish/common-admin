export enum AirDropTimeType {
  DAY,
  WEEK,
  MONTH,
  YEAR,
}
export const airDropTimeTypeList = [
  {
    label: "每日",
    value: AirDropTimeType.DAY,
  },
  // {
  //   label: "每周",
  //   value: AirDropTimeType.WEEK,
  // },
  {
    label: "每月",
    value: AirDropTimeType.MONTH,
  },
  {
    label: "每年",
    value: AirDropTimeType.YEAR,
  },
];

export enum AirDropTaskType {
  COMMON,
  MARKEYT,
}
export const airDropTaskTypes = [
  {
    value: AirDropTaskType.COMMON,
    label: "普通任务",
  },
  {
    value: AirDropTaskType.MARKEYT,
    label: "营销任务",
  },
];
