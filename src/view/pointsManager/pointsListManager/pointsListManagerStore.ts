export enum PointsState {
  DRAFT = 0,
  TO_BE_APPROVIAL,
  APPROVIAL_FAILED,
  PUBLISHING,
  PUBLISH_FAILED,
  PUBLISH_SUCCESS,
  DRAFT_NEW,
  TO_BE_APPROVIAL_NEW,
  APPROVIAL_FAILED_NEW,
  ADD_PUBLISHING,
  ADD_PUBLISH_FAILED,
}
export const pointsStateList = [
  {
    label: "草稿",
    value: PointsState.DRAFT,
  },
  {
    label: "待审核",
    value: PointsState.TO_BE_APPROVIAL,
  },
  {
    label: "审核未通过",
    value: PointsState.APPROVIAL_FAILED,
  },
  {
    label: "发行中",
    value: PointsState.PUBLISHING,
  },
  {
    label: "发行失败",
    value: PointsState.PUBLISH_FAILED,
  },
  {
    label: "发行成功",
    value: PointsState.PUBLISH_SUCCESS,
  },
  {
    label: "需要重新审核",
    value: PointsState.DRAFT_NEW,
  },
  {
    label: "重新提交后待审核",
    value: PointsState.TO_BE_APPROVIAL_NEW,
  },
  {
    label: "重新审核未通过",
    value: PointsState.APPROVIAL_FAILED_NEW,
  },
  {
    label: "增发中",
    value: PointsState.ADD_PUBLISHING,
  },
  {
    label: "增发失败",
    value: PointsState.ADD_PUBLISH_FAILED,
  },
];
export const pointsStateSearchList = [
  {
    label: "需要提交审核",
    value: JSON.stringify([PointsState.DRAFT, PointsState.DRAFT_NEW]),
  },
  {
    label: "待审核",
    value: JSON.stringify([PointsState.TO_BE_APPROVIAL, PointsState.TO_BE_APPROVIAL_NEW]),
  },

  {
    label: "审核未通过",
    value: JSON.stringify([PointsState.APPROVIAL_FAILED, PointsState.APPROVIAL_FAILED_NEW]),
  },
  {
    label: "发行中",
    value: JSON.stringify([PointsState.PUBLISHING, PointsState.ADD_PUBLISHING]),
  },
  {
    label: "发行失败",
    value: JSON.stringify([PointsState.PUBLISH_FAILED, PointsState.ADD_PUBLISH_FAILED]),
  },
  {
    label: "发行成功",
    value: JSON.stringify([PointsState.PUBLISH_SUCCESS]),
  },
];

export const approvialList = [
  {
    label: "不通过",
    value: PointsState.APPROVIAL_FAILED,
  },
  {
    label: "通过",
    value: PointsState.PUBLISHING,
  },
];
export const approvialNewList = [
  {
    label: "不通过",
    value: PointsState.APPROVIAL_FAILED_NEW,
  },
  {
    label: "通过",
    value: PointsState.ADD_PUBLISHING,
  },
];
