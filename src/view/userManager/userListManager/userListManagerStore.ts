export enum UserState {
  FROZEN,
  NORMAL,
}
export const userStateList = [
  {
    label: "冻结",
    value: UserState.FROZEN,
  },
  {
    label: "正常",
    value: UserState.NORMAL,
  },
];

export enum AccountTab {
  NORMAL,
  TEST,
  UN_MUST_LOGIN,
  ROBOTER,
}
export const accountTabList = [
  {
    label: "正常账号",
    value: AccountTab.NORMAL,
  },
  {
    label: "测试账号",
    value: AccountTab.TEST,
  },
  {
    label: "免登录校验账号",
    value: AccountTab.UN_MUST_LOGIN,
  },
  {
    label: "机器人",
    value: AccountTab.ROBOTER,
  },
];
