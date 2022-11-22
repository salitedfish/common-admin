export const goodsStateList = [
  {
    label: "草稿",
    value: 0,
  },
  {
    label: "待审核",
    value: 1,
  },
  {
    label: "审核未通过",
    value: 2,
  },
  {
    label: "发行中",
    value: 3,
  },
  {
    label: "发行失败",
    value: 4,
  },
  {
    label: "待上架",
    value: 5,
  },
  {
    label: "已上架",
    value: 6,
  },
  {
    label: "需重新审核",
    value: 7,
  },
  {
    label: "待审核",
    value: 8,
  },
  {
    label: "审核未通过",
    value: 9,
  },
  {
    label: "增发中",
    value: 10,
  },
  {
    label: "增发失败",
    value: 11,
  },
];

export enum GoodsState {
  DRAFT = 0,
  TO_BE_APPROVIAL,
  APPROVIAL_FAILED,
  PUBLISHING,
  PUBLISH_FAILED,
  TO_BE_SHELVES,
  ON_THE_SHELF,
  NEED_APPROVIAL,
  TO_BE_APPROVIAL_NEW,
  APPROVIAL_FAILED_NEW,
  ADD_PUBLISHING,
  ADD_PUBLISH_FAILED,
}

export const goodsTypeList = [
  {
    value: 0,
    label: "普通商品",
  },
  {
    value: 1,
    label: "盲盒商品",
  },
  {
    value: 2,
    label: "盲盒奖品",
  },
  {
    value: 3,
    label: "合成商品",
  },
  {
    value: 4,
    label: "空投商品",
  },
  {
    value: 5,
    label: "积分商品",
  },
];
export enum GoodsType {
  COMMON = 0,
  BLIND_BOX,
  BLIND_BOX_PRIZE,
  SYNTHETIC,
  AIR_DROP,
  POINT,
}
