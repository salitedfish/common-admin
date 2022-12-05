import { reactive, ref, computed, onBeforeMount } from "vue";
import type { Ref } from "vue";
import { createDiscreteApi } from "naive-ui";
import { useCommonStore } from "@/store/commonStore";
import type { Return, ReturnList } from "@/type/Common";
import type { NotificationType, CascaderOption, DataTableColumns } from "naive-ui";
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

// 创建通用列表所需的数据Hook
export const useListPage = <P, R>(
  getListRequest: (searchParams: P & { page: number; size: number }) => Promise<Return<ReturnList<R>>>,
  createColumns: () => DataTableColumns<R>,
  heightCorrect = 185
) => {
  const commonStore = useCommonStore();

  // 列表宽度和高度
  const listXWidth = computed(() => {
    let width = 0;
    const list = createColumns();
    for (const item of list) {
      width = <number>item.width + width;
    }
    return width;
  });
  const listYHeight = computed(() => {
    return commonStore.pageContentHeight - heightCorrect;
  });

  // 筛选的参数
  const searchParam = <Ref<P & { page: number; size: number }>>ref({
    page: 1,
    size: 10,
  });
  // 数据总数
  const totalPage = ref(0);
  // 查询状态
  const searching = ref(false);
  // 展示的列表
  const list: Ref<R[]> = ref([]);

  // 整合筛选参数
  const submitSearch = (params: P) => {
    searchParam.value = { ...searchParam.value, ...params };
    getList();
  };

  // 请求数据
  const getList = async () => {
    searching.value = true;
    const res = await getListRequest(searchParam.value);
    if (res && res.code === 0) {
      list.value = res.data.data;
      totalPage.value = res.data.totalPage;
    }
    searching.value = false;
  };

  onBeforeMount(() => {
    getList();
  });
  return {
    listXWidth,
    listYHeight,
    searchParam,
    totalPage,
    searching,
    list,
    submitSearch,
    getList,
  };
};
