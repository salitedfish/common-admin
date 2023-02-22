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

  {
    value: WhiteListType.DRAW_UPLOAD,
    URLS: {
      uploadWhiteListUrl: "/manager/lottery/allow/submit/",
      downLoadWhiteListUrl: "/manager/lottery/allow/excel",
      deleteWhiteListUrl: "/manager/lottery/allow/delete",
      getWhiteListUrl: "/manager/lottery/allow/page",
    },
  },

  {
    value: WhiteListType.DRAW_ALL,
    URLS: {
      downLoadWhiteListUrl: "/manager/lottery/join/excel",
      getWhiteListUrl: "/manager/lottery/join/page",
    },
  },
];
