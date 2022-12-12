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

export type AdminMerchantListParam = {
  chainAddress?: string;
  phone?: string;
  role?: number;
  uid?: string;
};
export type AdminMerchantListItem = {
  chainAddress: string;
  chainPublicKey: string;
  headUrl: string;
  lastLoginTime: string;
  loginPassword: string;
  nickName: string;
  phone: string;
  registerTime: string;
  role: number;
  state: number;
  subMchid: string;
  uid: number;
};
