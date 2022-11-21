import { useGetLStorage } from "@ultra-man/noa";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("authStore", () => {
  const getUserInfo = () => {
    return <
      {
        chainAddress: string;
        chainPublicKey: string;
        headUrl: string;
        lastLoginTime: string;
        loginPassword: string;
        nickName: string;
        phone: string;
        role: number;
        state: number;
        subMchid: string;
        uid: number;
      } | null
    >useGetLStorage("userInfo")(null);
  };
  return {
    getUserInfo,
  };
});
