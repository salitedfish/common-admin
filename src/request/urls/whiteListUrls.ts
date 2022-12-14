import { WhiteListType } from "@/type/Common";
// 不同白名单类型的url
export const whiteListUrls = [
  {
    value: WhiteListType.GOODS,
    URLS: {
      uploadWhiteListUrl: "/manager/goods/allow/submit/",
      downLoadWhiteListUrl: "/manager/goods/allow/excel",
      deleteWhiteListUrl: "/manager/goods/allow/delete",
      getWhiteListUrl: "/manager/goods/allow/page",
    },
  },

  {
    value: WhiteListType.AIR_DROP,
    URLS: {
      uploadWhiteListUrl: "/manager/airdrop/allow/submit/",
      downLoadWhiteListUrl: "/manager/airdrop/allow/excel",
      deleteWhiteListUrl: "/manager/airdrop/allow/delete",
      getWhiteListUrl: "/manager/airdrop/allow/page",
    },
  },
];
