export enum AccountRole {
  ADMIN = 1,
  MERCHANT,
}

export const accountRoleList = [
  {
    label: "管理员",
    value: AccountRole.ADMIN,
  },
  {
    label: "商户",
    value: AccountRole.MERCHANT,
  },
];

export enum AdminMerchantState {
  FROZEN,
  NORMAL,
}
export const userStateList = [
  {
    label: "冻结",
    value: AdminMerchantState.FROZEN,
  },
  {
    label: "正常",
    value: AdminMerchantState.NORMAL,
  },
];
