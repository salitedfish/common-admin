export enum OrganizationTypes {
  ENTERPRISE = 2,
  INDIVIDUAL = 4,
  MICRO = 2401,
}

export type UserInfo = {
  chainAddress: string;
  chainPublicKey: string;
  headUrl: string;
  lastLoginTime: string;
  loginPassword: string;

  merchantAddress: string;
  merchantContact: string;
  merchantDescription: string;
  merchantLicense: string;
  merchantTime: string;
  merchantType: OrganizationTypes;

  nickName: string;
  phone: string;
  role: number;
  state: number;
  subMchid: string;
  uid: number;
};

export enum AuthType {}
