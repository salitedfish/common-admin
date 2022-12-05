export enum GoodsState {
  DRAFT = 0,
  TO_BE_APPROVIAL,
  APPROVIAL_FAILED,
  PUBLISHING,
  PUBLISH_FAILED,
  TO_BE_SHELVES,
  ON_THE_SHELF,
  NEED_APPROVIAL,
  TO_BE_APPROVIAL_NEW,
  APPROVIAL_FAILED_NEW,
  ADD_PUBLISHING,
  ADD_PUBLISH_FAILED,
}
export const goodsStateList = [
  {
    label: "草稿",
    value: GoodsState.DRAFT,
  },
  {
    label: "待审核",
    value: GoodsState.TO_BE_APPROVIAL,
  },
  {
    label: "审核未通过",
    value: GoodsState.APPROVIAL_FAILED,
  },
  {
    label: "发行中",
    value: GoodsState.PUBLISHING,
  },
  {
    label: "发行失败",
    value: GoodsState.PUBLISH_FAILED,
  },
  {
    label: "待上架",
    value: GoodsState.TO_BE_SHELVES,
  },
  {
    label: "已上架",
    value: GoodsState.ON_THE_SHELF,
  },
  {
    label: "需重新审核",
    value: GoodsState.NEED_APPROVIAL,
  },
  {
    label: "待审核",
    value: GoodsState.TO_BE_APPROVIAL_NEW,
  },
  {
    label: "审核未通过",
    value: GoodsState.APPROVIAL_FAILED_NEW,
  },
  {
    label: "增发中",
    value: GoodsState.ADD_PUBLISHING,
  },
  {
    label: "增发失败",
    value: GoodsState.ADD_PUBLISH_FAILED,
  },
];

export enum GoodsType {
  COMMON = 0,
  BLIND_BOX,
  BLIND_BOX_PRIZE,
  SYNTHETIC,
  AIR_DROP,
  POINT,
}
export const goodsTypeList = [
  {
    value: GoodsType.COMMON,
    label: "普通商品",
  },
  {
    value: GoodsType.BLIND_BOX,
    label: "盲盒商品",
  },
  {
    value: GoodsType.BLIND_BOX_PRIZE,
    label: "盲盒奖品",
  },
  {
    value: GoodsType.SYNTHETIC,
    label: "合成商品",
  },
  {
    value: GoodsType.AIR_DROP,
    label: "空投商品",
  },
  {
    value: GoodsType.POINT,
    label: "积分商品",
  },
];

export enum SaleType {
  NOAMAL = 0,
  WHITE_LIST,
  DRAW,
  RULES,
}
export const saleTypeList = [
  {
    value: SaleType.NOAMAL,
    label: "正常销售",
  },
  {
    value: SaleType.WHITE_LIST,
    label: "白名单销售",
  },
  {
    value: SaleType.DRAW,
    label: "抽签销售",
  },
  {
    value: SaleType.RULES,
    label: "规则销售",
  },
];

export enum AuditAction {
  CANCEL_AUDIT = 0,
  SUBMIT_AUDIT,
  AUDIT_FAIL,
  AUDIT_SUCCESS,
  PUBLISH_FAILED_RE_PUBLISH,
  LOWER_SHELF,
  UPPER_SHELF,
  RE_CANCEL_AUDIT,
  RE_SUBMIT_AUDIT,
  RE_AUDIT_FAIL,
  RE_AUDIT_SUCCESS,
  ADD_FAIL_RE_ADD,
}
export const auditResList = [
  {
    label: "通过",
    value: AuditAction.AUDIT_SUCCESS,
  },
  {
    label: "不通过",
    value: AuditAction.AUDIT_FAIL,
  },
];
export const reAuditResList = [
  {
    label: "通过",
    value: AuditAction.RE_AUDIT_SUCCESS,
  },
  {
    label: "不通过",
    value: AuditAction.RE_AUDIT_FAIL,
  },
];

export enum EditType {
  POINTS = "POINTS",
  EXTEND = "EXTEND",
}
