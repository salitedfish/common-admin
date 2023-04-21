import { AntinomyTypes } from "@/type/Common";
export const giftTypeList = [
  {
    label: "不可转赠",
    value: AntinomyTypes.NOT,
  },
  {
    label: "可以转赠",
    value: AntinomyTypes.YES,
  },
];

export enum CoinType {
  TOKEN,
  COIN,
}

export const coinTypeList = [
  {
    label: "token",
    value: CoinType.TOKEN,
  },
  {
    label: "coin",
    value: CoinType.COIN,
  },
];
