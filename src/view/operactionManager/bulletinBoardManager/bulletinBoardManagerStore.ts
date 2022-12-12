export enum BulletinBoardState {
  TO_BE_SHELVES,
  ON_THE_SHELF,
}
export const bulletinBoardStateList = [
  {
    label: "未上架",
    value: BulletinBoardState.TO_BE_SHELVES,
    action: {
      label: "上架",
      value: BulletinBoardState.ON_THE_SHELF,
    },
  },
  {
    label: "已上架",
    value: BulletinBoardState.ON_THE_SHELF,
    action: {
      label: "下架",
      value: BulletinBoardState.TO_BE_SHELVES,
    },
  },
];

export enum BulletinBoardTopState {
  NOT_TOPPING,
  TOPPING,
}
export const bulletinBoardTopStateList = [
  {
    label: "未置顶",
    value: BulletinBoardTopState.NOT_TOPPING,
    action: {
      label: "置顶",
      value: BulletinBoardTopState.TOPPING,
    },
  },
  {
    label: "已置顶",
    value: BulletinBoardTopState.TOPPING,
    action: {
      label: "不置顶",
      value: BulletinBoardTopState.NOT_TOPPING,
    },
  },
];

export enum BulletinBoardType {
  COMMON,
  SCROLL,
}
export const bulletinBoardTypeList = [
  {
    label: "普通",
    value: BulletinBoardType.COMMON,
  },
  {
    label: "滚动",
    value: BulletinBoardType.SCROLL,
  },
];
