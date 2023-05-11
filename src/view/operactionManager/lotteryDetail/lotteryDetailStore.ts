import { AntinomyTypes } from "@/type/Common";

export enum LotteryRuleType {
  HOLD_CATEGORY = 1,
  HOLD_GOODS,
  EXTENSION_REAL_NAME,
  NEW_REAL_NAME,
  EXTENSION_CATEGORY,
  EXTENSION_GOODS,
}

export const overReduceTypes = [
  {
    label: "不取",
    value: AntinomyTypes.NOT,
  },
  {
    label: "取",
    value: AntinomyTypes.YES,
  },
];

export const repeatAbleList = [
  {
    label: "不可重复",
    value: AntinomyTypes.NOT,
  },
  {
    label: "可以重复",
    value: AntinomyTypes.YES,
  },
];

export const hitNumTabList = [
  {
    label: "不标记",
    value: AntinomyTypes.NOT,
  },
  {
    label: "标记",
    value: AntinomyTypes.YES,
  },
];

export const lotteryRuleTypes = [
  {
    value: LotteryRuleType.HOLD_CATEGORY,
    label: "持有类目商品",
  },
  {
    value: LotteryRuleType.HOLD_GOODS,
    label: "持有指定商品",
  },
  {
    value: LotteryRuleType.EXTENSION_REAL_NAME,
    label: "推广新用户并且新用户实名",
  },
  {
    value: LotteryRuleType.NEW_REAL_NAME,
    label: "新用户注册并实名",
  },
  // {
  //   value: LotteryRuleType.EXTENSION_CATEGORY,
  //   label: "推广类目商品",
  // },
  // {
  //   value: LotteryRuleType.EXTENSION_GOODS,
  //   label: "推广指定商品",
  // },
];
export enum RateType {
  NUM,
  RATE,
}

export const rateTypes = [
  {
    label: "中签数",
    value: RateType.NUM,
  },

  {
    label: "中签率",
    value: RateType.RATE,
  },
];

export enum HoldType {
  NONE,
  BUY_TIME,
  GET_TIME,
}
export const holdTypes = [
  {
    label: "无",
    value: HoldType.NONE,
  },
  {
    label: "按一级市场下单时间",
    value: HoldType.BUY_TIME,
  },
  {
    label: "按获取时间",
    value: HoldType.GET_TIME,
  },
];
export const holdDayTypes = [
  {
    value: AntinomyTypes.NOT,
    label: "不满足给部分",
  },
  {
    value: AntinomyTypes.YES,
    label: "必须满足天数才给",
  },
];
