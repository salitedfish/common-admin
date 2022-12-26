enum GoodsPublishState {
  PUBLISHING = 0,
  SUCCESS,
  FAIL,
}
export const GoodsPublishStateList = [
  {
    label: "发行中",
    value: GoodsPublishState.PUBLISHING,
  },
  {
    label: "发行成功",
    value: GoodsPublishState.SUCCESS,
  },
  {
    label: "发行失败",
    value: GoodsPublishState.FAIL,
  },
];
