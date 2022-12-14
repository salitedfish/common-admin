export enum BannerState {
  OFFLINE,
  ONLINE,
}
export const bannerStateList = [
  {
    label: "待上线",
    value: BannerState.OFFLINE,
    action: {
      value: BannerState.ONLINE,
      label: "上线",
    },
  },
  {
    label: "已上线",
    value: BannerState.ONLINE,
    action: {
      value: BannerState.OFFLINE,
      label: "下线",
    },
  },
];

export enum BannerTargetType {
  NONE = -1,
  URL,
  GOODS,
  POINTS,
}
export const bannerTargetTypeList = [
  {
    label: "无目标",
    value: BannerTargetType.NONE,
  },
  {
    label: "链接地址",
    value: BannerTargetType.URL,
  },
  {
    label: "商品",
    value: BannerTargetType.GOODS,
  },
  {
    label: "积分",
    value: BannerTargetType.POINTS,
  },
];
