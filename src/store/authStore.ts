import { useGetLStorage } from "@ultra-man/noa";
import { defineStore } from "pinia";
import { UserRole } from "@/type/Common";

export const useAuthStore = defineStore("authStore", () => {
  // const devCompletedRoutes: string[] = ["homeManager", "goodsListManager"];
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

  // 判断是不是管理员
  const isAdmin = () => {
    return getUserInfo()?.role === UserRole.ADMIN;
  };
  return {
    getUserInfo,
    isAdmin,
  };
});
