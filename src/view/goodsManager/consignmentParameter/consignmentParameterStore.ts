export enum GiftType {
  NO,
  YES,
}
export const giftTypeList = [
  {
    label: "不可转赠",
    value: GiftType.NO,
  },
  {
    label: "可以转赠",
    value: GiftType.YES,
  },
];

export enum ConsignmentType {
  NO,
  YES,
}
export const consignmentTypeList = [
  {
    label: "不可以",
    value: ConsignmentType.NO,
  },
  {
    label: "可以",
    value: ConsignmentType.YES,
  },
];
