export enum CategoryActionOptions {
  RENAME = 0,
  DELETE,
}

export const categoryActionOptions = [
  {
    label: "改名",
    key: CategoryActionOptions.RENAME,
  },
  {
    label: "删除",
    key: CategoryActionOptions.DELETE,
  },
];
