export const ercStandardList = [
  // {
  //   value: "ERC_20",
  //   label: "ERC_20",
  // },
  {
    value: "ERC_1155",
    label: "ERC_1155",
  },
  {
    value: "ERC_721",
    label: "ERC_721",
  },
];
export enum GoodsLevel {
  NONE = 0,
  N,
  R,
  SR,
  SSR,
}
export const goodsLevelList = [
  {
    value: GoodsLevel.NONE,
    label: "无等级",
  },
  {
    value: GoodsLevel.N,
    label: "N",
  },
  {
    value: GoodsLevel.R,
    label: "R",
  },
  {
    value: GoodsLevel.SR,
    label: "SR",
  },
  {
    value: GoodsLevel.SSR,
    label: "SSR",
  },
];

export enum ExpresType {
  NO = 0,
  YES,
}
export const expresList = [
  {
    value: ExpresType.NO,
    label: "不可提货",
  },
  {
    value: ExpresType.YES,
    label: "可以提货",
  },
];

export enum GoodsTabs {
  NORMAL = 0,
  TEST,
  AUDIT,
}
export const goodsTabList = [
  {
    value: GoodsTabs.NORMAL,
    label: "正常商品",
  },
  {
    value: GoodsTabs.TEST,
    label: "测试用商品",
  },
  {
    value: GoodsTabs.AUDIT,
    label: "审核用商品",
  },
];
export enum RuleType {
  HOLD_CATEGORY = 1,
  HOLD_GOODS,
  EXTENSION_REAL_NAME,
  NEW_REAL_NAME,
  EXTENSION_CATEGORY,
  EXTENSION_GOODS,
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
    value: RuleType.EXTENSION_CATEGORY,
    label: "推广类目商品",
  },
  {
    value: RuleType.EXTENSION_GOODS,
    label: "推广指定商品",
  },
];
