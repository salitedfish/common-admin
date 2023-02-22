export enum LotteryHitType {
  ALL = -1,
  HIT,
}

export const lotteryHitTypes = [
  {
    label: "全部",
    value: LotteryHitType.ALL,
  },
  {
    label: "中签",
    value: LotteryHitType.HIT,
  },
];
