export enum PayChannel {
  WX = 1,
  SD,
}
export const payChannelList = [
  {
    label: "微信",
    value: PayChannel.WX,
  },
  {
    label: "杉德",
    value: PayChannel.SD,
  },
];

export enum ShareState {
  SHARING,
  SUCCESS,
  FAIL,
  FAIL_NOTHING,
}
export const shareStateList = [
  {
    label: "分帐中",
    value: ShareState.SHARING,
  },
  {
    label: "分帐成功",
    value: ShareState.SUCCESS,
  },
  {
    label: "分帐失败",
    value: ShareState.FAIL,
  },
  {
    label: "分帐失败且不处理",
    value: ShareState.FAIL_NOTHING,
  },
];

export const acceptList = [
  {
    label: "不接受",
    value: 0,
  },
  {
    label: "接受",
    value: 1,
  },
];
export const asyncActionList = [
  {
    label: "重新分配",
    value: 0,
  },
  {
    label: "忽略",
    value: 1,
  },
];
