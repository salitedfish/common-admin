export type UserListParam = {
  chainAddress?: string;
  inviteCode?: string;
  phone?: string;
  state?: number;
  tab?: number;
  uid?: string;
};
export type UserListItem = {
  chainAddress: string;
  headUrl: string;
  inviteCode: string;
  inviteNum: number;
  lastLoginTime: string;
  nickName: string;
  phone: string;
  registerCode: string;
  registerTime: string;
  state: number;
  tab: number;
  uid: number;
};
