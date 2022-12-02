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
