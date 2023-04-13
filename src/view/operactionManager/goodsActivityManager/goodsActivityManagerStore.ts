export enum GoodsActivityIdentity {
  BUY,
  SHARE,
}

export const goodsActivityIdentityList = [
  {
    value: GoodsActivityIdentity.BUY,
    label: "购买者",
  },
  {
    value: GoodsActivityIdentity.SHARE,
    label: "推广者",
  },
];

export enum GoodsActivityState {
  TO_BE_SHELVES,
  ON_THE_SHELF,
}

export const goodsActivityStateList = [
  {
    value: GoodsActivityState.TO_BE_SHELVES,
    label: "待上架",
    action: {
      value: GoodsActivityState.ON_THE_SHELF,
      label: "上架",
    },
  },
  {
    value: GoodsActivityState.ON_THE_SHELF,
    label: "已上架",
    action: {
      value: GoodsActivityState.TO_BE_SHELVES,
      label: "下架",
    },
  },
];
