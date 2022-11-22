import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import type { RouteRecordNormalized } from "vue-router";
import { defineStore } from "pinia";
import { useDeepInclude } from "@ultra-man/noa";

type CurrentRoute = {
  name: string;
  label: string;
  query: Record<string, string>;
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
  });
  // 历史路由列表
  const historyRoutes = reactive<CurrentRoute[]>([]);
  // 监听到路由改变时会添加路由
  const addHistoryRoutes = (route: CurrentRoute) => {
    const index = useDeepInclude(historyRoutes, {
      condition: (item) => item.label === route.label,
    });

    if (index === false) {
      // 如果不存在直接推入
      historyRoutes.push(route);
      currentRoute.value = route;
    } else {
      // 如果存在先替换（如果两个路由名称相同，query不同，那只保存最新的）
      historyRoutes.splice(Number(index), 1, route);
      currentRoute.value = historyRoutes[Number(index)];
    }
  };
  // tab删除路由
  const deleteHistoryRoutes = (label: string) => {
    const index = useDeepInclude(historyRoutes, {
      condition: (item) => item.label === label,
    });
    // 当删除的是当前路由时，要判断情况比较多
    if (label === currentRoute.value.label) {
      if (historyRoutes.length === 1) {
        return;
      } else if (index === "0") {
        currentRoute.value = historyRoutes[1];
      } else if (index === String(historyRoutes.length - 1)) {
        currentRoute.value = historyRoutes[historyRoutes.length - 2];
      } else {
        currentRoute.value = historyRoutes[Number(index) - 1];
      }
      router.push({
        name: currentRoute.value.name,
        query: currentRoute.value.query,
      });
    }
    historyRoutes.splice(Number(index), 1);
  };
  // tab选择路由
  const selectHistoryRoutes = (label: string) => {
    const index = useDeepInclude(historyRoutes, {
      condition: (item) => item.label === label,
    });
    currentRoute.value = historyRoutes[Number(index)];
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
    };
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
  };
});
