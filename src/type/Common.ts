// 定义项目中使用地方比较多的类型
export type Paging = {
  page: number;
  size: number;
};

export type Return<T> = {
  code: number;
  data: T;
  message: string;
  errorMessage: string;
  traceId: string;
};

export type ReturnList<T> = {
  data: T[];
  dataSize: number;
  end: number;
  hasNextPage: boolean;
  hasPrePage: boolean;
  pageNumber: number;
  pageSize: number;
  start: number;
  totalPage: number;
  totalSize: number;
};

export type RemoteRoute = { menu?: { name: string; route: string; id: number }[]; name: string; route: string; id: number };

export type Step = {
  title: string;
  description: string;
};

export enum UserRole {
  ADMIN = 1,
  MERCHANT,
}
export type CategoryTreeItem = {
  child: CategoryTreeItem[];
  id: number;
  level: number;
  name: string;
  order: number;
  parentId: number;
  type: number;
  state: number;
};

export type FileUpload = {
  fileUrl: string;
  hashName: string;
};

export enum CategoryType {
  GOODS = 0,
  NOTICE,
}

export enum WhiteListType {
  GOODS = 0,
  AIR_DROP,
  DRAW_UPLOAD,
  DRAW_ALL,
}

export type WhiteListSearchParams = Partial<{
  phone: string;
  uid: string;
  // 空投和抽签
  id: string;
  // 商品专用
  goodsId: string;
  // 空投专用
  state: number;
  // 抽签全部名单专用
  type: number;
}>;

export type WhiteListItem = {
  phone: string;
  uid: string;
  unitNum: number;
  state?: number;
};
