import { AntinomyTypes } from "@/type/Common";
export enum RuleType {
  HOLD_CATEGORY = 1,
  HOLD_GOODS,
  EXTENSION_REAL_NAME,
  NEW_REAL_NAME,
  EXTENSION_CATEGORY,
  EXTENSION_GOODS,
  WHITE_NAME,
}
export const ruleTypeList = [
  {
    value: RuleType.HOLD_CATEGORY,
    label: "持有类目商品",
  },
  {
    value: RuleType.HOLD_GOODS,
    label: "持有指定商品",
  },
  {
    value: RuleType.EXTENSION_REAL_NAME,
    label: "推广新用户并且新用户实名",
  },
  {
    value: RuleType.NEW_REAL_NAME,
    label: "新用户注册并实名",
  },
  {
    value: RuleType.WHITE_NAME,
    label: "白名单",
    disabled: true,
  },
];
export enum HoldTimeType {
  PART,
  COMPLETE,
}
export const holdTimeTypeList = [
  {
    value: HoldTimeType.PART,
    label: "不满足给部分",
  },
  {
    value: HoldTimeType.COMPLETE,
    label: "必须满足天数才给",
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

export const holdRepeatTypes = [
  {
    value: AntinomyTypes.NOT,
    label: "不可重复",
  },
  {
    value: AntinomyTypes.YES,
    label: "可以重复",
  },
];
