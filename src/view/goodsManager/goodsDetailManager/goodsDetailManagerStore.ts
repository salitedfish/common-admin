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

export const goodsLevelList = [
  {
    value: 0,
    label: "N",
  },
  {
    value: 1,
    label: "R",
  },
  {
    value: 2,
    label: "SR",
  },
  {
    value: 3,
    label: "SSR",
  },
];

export enum ExpresType {
  NO = 0,
  YES,
}
export const expresList = [
  {
    value: 0,
    label: "不可提货",
  },
  {
    value: 1,
    label: "可以提货",
  },
];

export const goodsTabList = [
  {
    value: 0,
    label: "正常商品",
  },
  {
    value: 1,
    label: "测试用商品",
  },
  {
    value: 2,
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
    value: 1,
    label: "持有类目商品",
  },
  {
    value: 2,
    label: "持有指定商品",
  },
  {
    value: 3,
    label: "推广新用户并且新用户实名",
  },
  {
    value: 4,
    label: "新用户注册并实名",
  },
  {
    value: 5,
    label: "推广类目商品",
  },
  {
    value: 6,
    label: "推广指定商品",
  },
];
