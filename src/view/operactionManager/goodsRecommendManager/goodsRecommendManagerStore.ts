export enum GoodsRecommendTopState {
  NOT_TOPPING,
  TOPPING,
}
export const goodsRecommendTopStateList = [
  {
    label: "未置顶",
    value: GoodsRecommendTopState.NOT_TOPPING,
    action: {
      label: "置顶",
      value: GoodsRecommendTopState.TOPPING,
    },
  },
  {
    label: "已置顶",
    value: GoodsRecommendTopState.TOPPING,
    action: {
      label: "取消置顶",
      value: GoodsRecommendTopState.NOT_TOPPING,
    },
  },
];
