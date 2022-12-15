import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import type { RouteRecordNormalized } from "vue-router";
import { defineStore } from "pinia";

type CurrentRoute = {
  name: string;
  label: string;
  query: Record<string, string>;
  key: string;
  meta: Record<string, string | boolean>;
};

export const useRouteStore = defineStore("routeStore", () => {
  const router = useRouter();
  // 用于面包屑展示
  const currentRoutePath = ref<RouteRecordNormalized[]>([]);
  const updateCurrentRoutePath = (routePath: RouteRecordNormalized[]) => {
    currentRoutePath.value = routePath;
  };

  // 用于tabs切换
  // 当前路由对象
  const currentRoute = ref<CurrentRoute>({
    name: "",
    label: "",
    query: {},
    key: "",
    meta: {},
  });
  // 历史路由列表
  const historyRoutes = reactive<CurrentRoute[]>([]);
  // 监听到路由改变时会添加路由
  const addHistoryRoutes = (route: CurrentRoute) => {
    const index = historyRoutes.findIndex((item) => {
      return item.key === route.key;
    });

    if (index === -1) {
      // 如果不存在直接推入
      historyRoutes.push(route);
      currentRoute.value = route;
    } else {
      currentRoute.value = historyRoutes[index];
    }
  };
  // tab删除路由
  const deleteHistoryRoutes = (key: string) => {
    const index = historyRoutes.findIndex((item) => {
      return item.key === key;
    });

    // 当删除的是当前路由时，要判断情况比较多
    if (key === currentRoute.value.key) {
      if (historyRoutes.length === 1) {
        return;
      } else if (index === 0) {
        currentRoute.value = historyRoutes[1];
      } else if (index === historyRoutes.length - 1) {
        currentRoute.value = historyRoutes[historyRoutes.length - 2];
      } else {
        currentRoute.value = historyRoutes[Number(index) - 1];
      }
      router.replace({
        name: currentRoute.value.name,
        query: currentRoute.value.query,
      });
    }
    historyRoutes.splice(Number(index), 1);
  };
  // tab选择路由
  const selectHistoryRoutes = (key: string) => {
    const index = historyRoutes.findIndex((item) => {
      return item.key === key;
    });
    currentRoute.value = historyRoutes[index];
    router.push({
      name: currentRoute.value.name,
      query: currentRoute.value.query,
    });
  };
  // 重置历史路由
  const resetHistoryRoutes = () => {
    historyRoutes.length = 0;
    currentRoute.value = {
      name: "",
      label: "",
      query: {},
      key: "",
      meta: {},
    };
  };
  // 删除当前的路由
  const deleteCurrentRoute = () => {
    for (const i in historyRoutes) {
      if (historyRoutes[i].key === currentRoute.value.key) {
        historyRoutes.splice(Number(i), 1);
        return;
      }
    }
  };

  return {
    currentRoutePath,
    updateCurrentRoutePath,

    currentRoute,
    historyRoutes,
    addHistoryRoutes,
    selectHistoryRoutes,
    deleteHistoryRoutes,
    resetHistoryRoutes,
    deleteCurrentRoute,
  };
});
