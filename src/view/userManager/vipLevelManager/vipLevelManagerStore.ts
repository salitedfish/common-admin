import { useGroupByCondition } from "@ultra-man/noa";
import type { VipLevelItem } from "@/type/User";

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

export enum VipGetType {
  BUY,
  SHARE,
  GOODS,
}

export const vipGetTypes = [
  {
    value: VipGetType.BUY,
    label: "消费总额",
  },
  {
    value: VipGetType.SHARE,
    label: "推广总额",
  },
  {
    value: VipGetType.GOODS,
    label: "购买商品",
  },
];

export const useApiToView = (list: VipLevelItem[]): VipLevelItem[][] => {
  for (const vip of list) {
    if (vip.type === VipGetType.GOODS) {
      vip.goodsSelectList = [
        {
          goodsId: vip.goodsId || "",
          goodsName: vip.goodsName || "",
        },
      ];
    } else {
      vip.goodsSelectList = [];
    }
    vip.amount = Number(vip.amount);
  }
  const vipListList = useGroupByCondition(list)({ condition: (item) => item.vipType });
  if (vipListList.length === 1) {
    if (vipListList[0][0].vipType === VipType.MEMBER) {
      vipListList.push([]);
    } else if (vipListList[0][0].vipType === VipType.NODE) {
      vipListList.unshift([]);
    }
  } else if (vipListList.length === 0) {
    vipListList.push([], []);
  }
  return vipListList;
};

export const useViewToApi = (vipLevelList: VipLevelItem[][]): VipLevelItem[] => {
  const vipList: VipLevelItem[] = [];
  for (const key in vipLevelList) {
    for (const k in vipLevelList[key]) {
      const vip = { ...vipLevelList[key][k], vipType: Number(key) };
      if (vip.type === VipGetType.GOODS) {
        vip.goodsId = vip.goodsSelectList[0]?.goodsId;
        vip.goodsName = vip.goodsSelectList[0]?.goodsName;
      }
      vipList.push(vip);
    }
  }
  return vipList;
};
