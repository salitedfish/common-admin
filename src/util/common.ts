import { reactive, ref, computed, onMounted, h, onActivated } from "vue";
import type { Ref } from "vue";
import { createDiscreteApi, NButton } from "naive-ui";
import { useCommonStore } from "@/store/commonStore";
import { useThemeStore } from "@/store/themeStore";
import type { Return, ReturnList, Paging } from "@/type/Common";
import type { NotificationType, CascaderOption, DataTableColumns } from "naive-ui";
import { getProvinces as getProvincesRequest, getCities as getCitiesRequest } from "@/request/common";

const themeStore = useThemeStore();

// 返回可以函数式调用的组件
export const {
  notification,
  message: nmessage,
  dialog,
} = createDiscreteApi(["notification", "message", "dialog"], {
  configProviderProps: computed(() => ({ theme: themeStore.themeList[themeStore.activeTheme].lib })),
});

// 返回函数式调用的消息框
let notifying = false;
export const commonNotify = (type: NotificationType, message: string, needComfirm = false) => {
  // 优化一下提示体验3秒内只提示一个
  if (!notifying) {
    notifying = true;
    setTimeout(() => {
      notifying = false;
    }, 3000);
    if (needComfirm) {
      let _needComfirm = true;
      const n = notification[type]({
        content: message,
        keepAliveOnHover: true,
        action: () =>
          h(
            NButton,
            {
              text: true,
              type: "primary",
              onClick: () => changeNeedComfirm(),
            },
            {
              default: () => "我已知晓",
            }
          ),
        onClose: () => {
          if (_needComfirm) {
            nmessage.warning("请点击'我已知晓'按钮后再点击关闭");
            return false;
          }
        },
      });
      const changeNeedComfirm = () => {
        _needComfirm = false;
        n.action = () =>
          h(
            NButton,
            {
              text: true,
              type: "primary",
            },
            {
              default: () => "OK",
            }
          );
      };
    } else {
      notification[type]({
        content: message,
        duration: 2000,
        keepAliveOnHover: true,
      });
    }
  }
};

// 返回异步确认框
export const dialogComfirm = {
  warning(callBack: () => Promise<unknown>) {
    this.handler(callBack, "warning", "警告");
  },
  comfirm(callBack: () => Promise<unknown>) {
    this.handler(callBack, "success", "确认");
  },
  handler: (callBack: () => Promise<unknown>, method: keyof typeof dialog, title: string) => {
    const dialogInfo = dialog[method]({
      title,
      content: "确认此操作吗？",
      positiveText: "确认",
      onPositiveClick: async () => {
        if (dialogInfo) {
          dialogInfo.loading = true;
          await callBack();
          dialogInfo.loading = false;
        }
      },
    });
  },
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

// 创建分页列表页面所需的数据Hook
export const useListPage = <P extends Paging, R>(
  getListRequest: (searchParams: P) => Promise<Return<ReturnList<R>>>,
  createColumns: () => DataTableColumns<R>,
  options: {
    heightLevel?: number;
    size?: number;
    params?: Omit<P, "page" | "size">;
  } = {
    heightLevel: 0,
    size: 10,
  }
) => {
  type SearchParams = Omit<P, "page" | "size">;
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
    // 没有自动获取筛选部分的高度，如果筛选只有一行则传0，两行则传1
    return commonStore.pageContentHeight - [190, 230][options.heightLevel || 0];
  });

  // 筛选的参数
  const searchParam = <Ref<P>>ref({
    page: 1,
    size: options.size || 10,
  });
  searchParam.value = { ...searchParam.value, ...options.params };
  // 数据总数
  const totalPage = ref(0);
  // 查询状态
  const searching = ref(false);
  // 展示的列表
  const list: Ref<R[]> = ref([]);

  // 整合筛选参数
  const submitSearch = (params: SearchParams) => {
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

  let init = true;
  onMounted(async () => {
    if (init) await getList();
    init = false;
  });
  onActivated(() => {
    if (!init) getList();
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

// 创建不需要分页列表页面所需的数据Hook
export const useListNoPage = <P, R>(
  getListRequest: (searchParams: P) => Promise<Return<R[]>>,
  createColumns: () => DataTableColumns<R>,
  options: {
    heightLevel?: number;
    params?: P;
  } = {
    heightLevel: 0,
  }
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
    // 没有自动获取筛选部分的高度，如果筛选只有一行则传0，两行则传1（无分页页面列表的高度比有分页的高）
    return commonStore.pageContentHeight - [120, 190][options.heightLevel || 0];
  });
  // 查询状态
  const searching = ref(false);
  // 展示的列表
  const list: Ref<R[]> = ref([]);
  // 筛选的参数
  const searchParam = <Ref<P>>ref({});
  searchParam.value = { ...searchParam.value, ...options.params };

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
      list.value = res.data;
    }
    searching.value = false;
  };

  let init = true;
  onMounted(async () => {
    if (init) await getList();
    init = false;
  });
  onActivated(() => {
    if (!init) getList();
  });
  return {
    listXWidth,
    listYHeight,
    searching,
    list,
    submitSearch,
    getList,
  };
};
