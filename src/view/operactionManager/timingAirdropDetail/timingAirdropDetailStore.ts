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
  // {
  //   value: RuleType.EXTENSION_CATEGORY,
  //   label: "推广类目商品",
  // },
  // {
  //   value: RuleType.EXTENSION_GOODS,
  //   label: "推广指定商品",
  // },
  {
    value: RuleType.WHITE_NAME,
    label: "白名单",
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
