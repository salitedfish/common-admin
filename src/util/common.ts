import { reactive } from "vue";
import { createDiscreteApi } from "naive-ui";
import type { NotificationType, CascaderOption, UploadFileInfo } from "naive-ui";
import { getProvinces as getProvincesRequest, getCities as getCitiesRequest } from "@/request/common";

export const { notification } = createDiscreteApi(["notification"]);

// 返回函数式调用的消息框
export const commonNotify = (type: NotificationType, message: string) => {
  notification[type]({
    content: message,
    duration: 2000,
    keepAliveOnHover: true,
  });
};

// 返回省市列表
export const useBankAddressCodes = () => {
  const bankAddressCodes = reactive<CascaderOption[]>([]);

  const getProvinces = async () => {
    const res = await getProvincesRequest();
    if (res && res.data.length >= 1) {
      for (const province of res.data) {
        bankAddressCodes.push({
          label: province.province_name,
          value: province.province_code,
          isLeaf: false,
        });
      }
    }
  };
  getProvinces();

  const getCities = async (option: CascaderOption) => {
    const res = await getCitiesRequest(<number>option.value);
    if (res && res.data.length >= 1) {
      option.children = [];
      for (const city of res.data) {
        option.children.push({
          label: city.city_name,
          value: city.city_code + 100000,
          isLeaf: true,
        });
      }
    }
  };

  return { bankAddressCodes, getProvinces, getCities };
};

// 返回当前的时间戳
export const useNowTimeStamp = () => {
  return Date.now();
};

// 返回无限的时间戳
export const useInfinityTimeStamp = () => {
  return 4133865600000;
};

// 通用处理图片上传结果
export const onUploadFinish = (options: { file: UploadFileInfo; event?: ProgressEvent }, imageList: UploadFileInfo[]) => {
  const res = JSON.parse((options.event?.target as XMLHttpRequest).response);
  if (res.code === 0) {
    commonNotify("success", "文件上传成功！");
    options.file.thumbnailUrl = res.data;
  } else {
    commonNotify("warning", res.message || "文件上传失败");
    setTimeout(() => {
      for (let index = 0; index < imageList.length; index++) {
        const item = imageList[index];
        if (item.thumbnailUrl === options.file.thumbnailUrl) {
          imageList.splice(index, 1);
        }
      }
    }, 0);
  }
};
