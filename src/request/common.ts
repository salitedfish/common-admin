import { ultraFetch } from "./init";
import { whiteListUrls } from "./urls/whiteListUrls";
import { WhiteListType } from "@/type/Common";
import type * as RequestParam from "@/request/type/RequestParam";
import type * as RequestReturn from "@/request/type/RequestReturn";
import type { Return } from "@/type/Common";
const baseURL = import.meta.env.VITE_SERVICE_URL;
// const baseURL = "/api";

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
  return ultraFetch.post<Return<string>>(
    {
      URL: "/manager/merchant-wechat/apply/upload/image",
      body: data,
    },
    {
      pureHeaders: true,
    }
  );
};

// 微信图片上传(上面的接口和这个都行，这个是给组件调用)(不好用)
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

// 图片上传(上面的接口和这个都行，这个是给组件调用)(不好用)
export const uploadImgUrl = `${baseURL}/manager/file/image`;

// 视频上传
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

// app上传
export const uploadApp = (file: File) => {
  const data = new FormData();
  data.append("file", file);
  return ultraFetch.post(
    {
      URL: "/manager/file/apk",
      body: data,
    },
    {
      pureHeaders: true,
    }
  );
};

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

// 白名单模板下载
export const downLoadWhiteListTemplate = () => {
  return ultraFetch.get<Blob>({
    URL: "/manager/file/excel/allow/template",
  });
};

// 下面四个是产品、手动空投、抽签、中签的白名单通用接口，根据不同whiteListType请求不同的url
// 白名单上传
export const uploadWhiteList = (params: { id: string; file: File }, whiteListType: number) => {
  const data = new FormData();
  data.append("file", params.file);
  return ultraFetch.post(
    {
      URL: `${whiteListUrls.getItem(whiteListType)?.URLS.uploadWhiteListUrl}${params.id}`,
      body: data,
    },
    {
      pureHeaders: true,
    }
  );
};

// 白名单下载
export const downLoadWhiteList = (params: { id: string; goodsId?: string; type?: number }, whiteListType: number) => {
  if (whiteListType === WhiteListType.GOODS) {
    params.goodsId = params.id;
  }
  return ultraFetch.get<Blob>({
    URL: whiteListUrls.getItem(whiteListType)?.URLS.downLoadWhiteListUrl,
    params: params,
  });
};

// 删除白名单
export const deleteWhiteList = (params: { id: string; goodsId?: string }, whiteListType: number) => {
  if (whiteListType === WhiteListType.GOODS) {
    params.goodsId = params.id;
  }
  return ultraFetch.post({
    URL: whiteListUrls.getItem(whiteListType)?.URLS.deleteWhiteListUrl,
    body: JSON.stringify(params),
  });
};

// 获取白名单列表
export const getWhiteList = (params: RequestParam.GetWhiteList, whiteListType: number): RequestReturn.GetWhiteList => {
  if (whiteListType === WhiteListType.GOODS) {
    params.goodsId = params.id;
  }
  return ultraFetch.post({
    URL: whiteListUrls.getItem(whiteListType)?.URLS.getWhiteListUrl,
    body: JSON.stringify(params),
  });
};

// 修改密码
export const updatePassword = (params: { newPassword: string; oldPassword: string }) => {
  return ultraFetch.post<Return<unknown>>({
    URL: "/manager/account/login-password/update",
    body: JSON.stringify(params),
  });
};
// 头像上传
export const uploadProfilePicture = (file: File): RequestReturn.Upload => {
  const data = new FormData();
  data.append("file", file);
  return ultraFetch.post(
    {
      URL: "/manager/user-admin/head",
      body: data,
    },
    {
      pureHeaders: true,
    }
  );
};
