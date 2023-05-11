// import type { GoodsActivityDetailView, GoodsActivityDetailAPI } from "@/type/Operator";
// import { useGroupByCondition } from "@ultra-man/noa";

// export const switchToView = (detail: GoodsActivityDetailAPI): GoodsActivityDetailView => {
//   const _detail: GoodsActivityDetailView = {
//     info: detail.info,
//     rules: [],
//   };
//   const _rulesGroups = useGroupByCondition(detail.rules, { condition: (item) => item.belowOrderNum });
//   _detail.rules = _rulesGroups.map((item) => {
//     return {
//       belowOrderNum: item[0].belowOrderNum,
//       rule: item,
//     };
//   });
//   return _detail;
// };

// export const switchToAPI = (detail: GoodsActivityDetailView): GoodsActivityDetailAPI => {
//   const _detail: GoodsActivityDetailAPI = {
//     info: detail.info,
//     rules: [],
//   };
//   for (const item of detail.rules) {
//     for (const i of item.rule || []) {
//       // belowOrderNum必须要写在后面以覆盖原本的值
//       _detail.rules.push({ ...i, belowOrderNum: item.belowOrderNum });
//     }
//   }
//   return _detail;
// };

export const enum RewardType {
  GOODS,
  POINTS,
  COINS,
}

export const rewardTypeList = [
  {
    value: RewardType.GOODS,
    label: "商品",
  },
  {
    value: RewardType.POINTS,
    label: "积分",
  },
  {
    value: RewardType.COINS,
    label: "代币",
  },
];

export enum GoodsActivityTimeType {
  DAY,
  WEEK,
  MONTH,
}
export const goodsActivityTimeTypeList = [
  {
    label: "每日",
    value: GoodsActivityTimeType.DAY,
  },
  {
    label: "每周",
    value: GoodsActivityTimeType.WEEK,
  },
  {
    label: "每月",
    value: GoodsActivityTimeType.MONTH,
  },
];

export enum ProvideType {
  COMMON,
  FEREEZE,
}

export const provideTypes = [
  {
    label: "直接释放",
    value: ProvideType.COMMON,
  },
  {
    label: "锁仓释放",
    value: ProvideType.FEREEZE,
  },
];

export enum TradeType {
  MONEY,
  NUM,
}

export const tradeTypes = [
  {
    label: "订单金额",
    value: TradeType.MONEY,
  },
  {
    label: "购买数量",
    value: TradeType.NUM,
  },
];

export enum UserType {
  BUYER,
  SHARER,
  LEADER,
}

export const UserTypes = [
  {
    value: UserType.BUYER,
    label: "购买人",
  },
  {
    value: UserType.SHARER,
    label: "推广人",
  },
  {
    value: UserType.LEADER,
    label: "领导者",
  },
];

export enum UnitType {
  FIXED,
  RADIO,
}
export const unitTypes = [
  {
    label: "固定数量",
    value: UnitType.FIXED,
  },
  {
    label: "按比例",
    value: UnitType.RADIO,
  },
];

export enum VipType {
  MEMBER,
  NODE,
}

export const vipTypes = [
  {
    label: "会员",
    value: VipType.MEMBER,
  },
  {
    label: "节点",
    value: VipType.NODE,
  },
];

export enum RegionType {
  EXCLUDE_MAX,
  INCLUDE_MAX,
}

export const regionTypes = [
  {
    label: "去除最大分区",
    value: RegionType.EXCLUDE_MAX,
  },
  {
    label: "允许最大分区",
    value: RegionType.INCLUDE_MAX,
  },
];
