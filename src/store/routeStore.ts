import { ref } from "vue";
import type { RouteRecordNormalized } from "vue-router";
import { defineStore } from "pinia";

export const useRouteStore = defineStore("routeStore", () => {
  const currentRoutePath = ref<RouteRecordNormalized[]>([]);

  const updateCurrentRoutePath = (routePath: RouteRecordNormalized[]) => {
    currentRoutePath.value = routePath;
  };

  return {
    currentRoutePath,
    updateCurrentRoutePath,
  };
});
