export enum ForceUpdate {}
export const forceUpdateList = [
  {
    label: "需要",
    value: true,
  },
  {
    label: "不需要",
    value: false,
  },
];

export enum VersionState {
  OFF_LINE,
  ON_LINE,
}
export const versionStateList = [
  {
    label: "未上线",
    value: VersionState.OFF_LINE,
    action: {
      label: "上线",
      value: VersionState.ON_LINE,
    },
  },
  {
    label: "已上线",
    value: VersionState.ON_LINE,
    action: {
      label: "下线",
      value: VersionState.OFF_LINE,
    },
  },
];
