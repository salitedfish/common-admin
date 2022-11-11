// 定义项目中使用地方比较多的类型
export type Paging = {
  page: number;
  size: number;
};

export type Return<T> = {
  code: number;
  data: T;
  message: string;
};
