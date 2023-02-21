import { LotteryState, LotteryTaskState, LotteryTabType } from "@/type/Operator";

export const lotteryStates = [
  {
    label: "全部",
    value: LotteryState.ALL,
  },
  {
    label: "草稿",
    value: LotteryState.DRAFT,
  },
  {
    label: "提交审核",
    value: LotteryState.TO_BE_APPROVIAL,
  },
  {
    label: "审核不通过",
    value: LotteryState.APPROVIAL_FAILED,
  },
  {
    label: "待上架",
    value: LotteryState.TO_BE_SHELVES,
  },
  {
    label: "已上架",
    value: LotteryState.ON_THE_SHELF,
  },
];

export const lotteryTabTypes = [
  {
    label: "全部",
    value: LotteryTabType.ALL,
  },
  {
    label: "正常抽签",
    value: LotteryTabType.NORMAL,
  },
  {
    label: "测试用抽签",
    value: LotteryTabType.TEST,
  },

  {
    label: "审核用抽签",
    value: LotteryTabType.APPROVE,
  },
];

export const lotteryTaskStates = [
  {
    label: "全部",
    value: LotteryTaskState.ALL,
  },
  {
    label: "初始状态",
    value: LotteryTaskState.INIT,
  },

  {
    label: "已发放签码",
    value: LotteryTaskState.ISSUED,
  },

  {
    label: "已开奖",
    value: LotteryTaskState.AVARDED,
  },
];

export const lotteryApprovialState = [
  {
    label: "审核不通过",
    value: LotteryState.APPROVIAL_FAILED,
  },
  {
    label: "审核通过",
    value: LotteryState.TO_BE_SHELVES,
  },
];
