import { ultraFetch } from "./init";
import type * as RequestParam from "@/request/type/RequestParam";
import type * as RequestReturn from "@/request/type/RequestReturn";
const baseURL = "/api";

// 获取省份列表
export const getProvinces = (): RequestReturn.GetProvinces => {
  return ultraFetch.get({
    URL: "/manager/merchant-wechat/apply/provinces",
  });
};

// 获取城市列表
export const getCities = (provinceCode: number): RequestReturn.GetCities => {
  return ultraFetch.get({
    URL: "/manager/merchant-wechat/apply/cities",
    params: {
      provinceCode,
    },
  });
};

// 微信图片上传
export const uploadWCImg = (file: File) => {
  const data = new FormData();
  data.append("file", file);
  return ultraFetch.post(
    {
      URL: "/manager/merchant-wechat/apply/upload/image",
      body: data,
    },
    {
      pureHeaders: true,
    }
  );
};

// 微信图片上传(上面的接口和这个都行，这个是给组件调用)
export const uploadWCImgUrl = `${baseURL}/manager/merchant-wechat/apply/upload/image`;

// 图片上传
export const uploadImg = (file: File): RequestReturn.Upload => {
  const data = new FormData();
  data.append("file", file);
  return ultraFetch.post(
    {
      URL: "/manager/file/image",
      body: data,
    },
    {
      pureHeaders: true,
    }
  );
};

// 图片上传
export const uploadImgUrl = `${baseURL}/manager/file/image`;

// 图片上传
export const uploadVideo = (file: File): RequestReturn.Upload => {
  const data = new FormData();
  data.append("file", file);
  return ultraFetch.post(
    {
      URL: "/manager/file/video",
      body: data,
    },
    {
      pureHeaders: true,
    }
  );
};

// 视频上传
export const uploadVideoUrl = `${baseURL}/manager/file/video`;

// 获取类目树
export const getCategoryTree = (type: number): RequestReturn.GetCategoryTree => {
  return ultraFetch.get({
    URL: "/manager/classify/tree",
    params: { type },
  });
};
// 删除类目
export const deleteCategory = (params: { id: number }) => {
  return ultraFetch.post({
    URL: "/manager/classify/delete",
    body: JSON.stringify(params),
  });
};
// 编辑类目
export const editCategory = (params: RequestParam.EditCategory) => {
  return ultraFetch.post({
    URL: "/manager/classify/submit",
    body: JSON.stringify(params),
  });
};
// 显示影藏类目
export const updateCategoryState = (params: { id: number; state: number }) => {
  return ultraFetch.post({
    URL: "/manager/classify/state",
    body: JSON.stringify(params),
  });
};
