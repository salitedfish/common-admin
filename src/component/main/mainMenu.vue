<template>
  <n-layout class="menu-layout" has-sider>
    <n-layout-sider
      bordered
      collapse-mode="width"
      :collapsed-width="50"
      :width="240"
      :collapsed="collapsed"
      show-trigger
      @collapse="collapsed = true"
      @expand="collapsed = false"
      :native-scrollbar="false"
    >
      <n-menu class="menu" :options="menuOptions" :collapsed="collapsed" @update:value="handleMenuClick" v-model:value="selectedKey"></n-menu>
    </n-layout-sider>
  </n-layout>
</template>

<script lang="ts" setup>
import { h, ref, reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import { NIcon } from "naive-ui";
import type { MenuOption } from "naive-ui";

import customIcon from "@/component/common/customIcon.vue";

import { routes } from "@/router/index";

// 获取当前路由的信息来初始化menu的选择值
const route = useRoute();
const selectedKey = ref(route.name as string);

// 展开状态
const collapsed = ref(false);

// 渲染menu图标
const renderIcon = (name: string) => {
  const size = 20;
  return () => h(NIcon, { size }, { default: () => h(customIcon, { name, size }) });
};

//依据路由生成菜单
const mapMenuHandler = (routes: RouteRecordRaw[]) => {
  const rootRoutes: MenuOption[] = [];
  for (const item of routes) {
    const menuItem: MenuOption = {
      label: item.meta?.label,
      key: item.name as string,
      icon: renderIcon(item.meta?.icon as string),
    };
    if (item.children) {
      menuItem.children = mapMenuHandler(item.children);
    }
    rootRoutes.push(menuItem);
  }
  return rootRoutes;
};

// 完整菜单项（一般还需要根据权限设置哪些需要影藏）
const menuOptions = reactive<MenuOption[]>([
  {
    label: "首页",
    key: "login",
    icon: renderIcon("zhuye"),
  },
  {
    key: "divider-1",
    type: "divider",
    props: {
      style: {
        marginLeft: "32px",
      },
    },
  },
  ...mapMenuHandler(routes),
]);

// 路由跳转
const router = useRouter();
const handleMenuClick = (key: string) => {
  router.push({ name: key });
};
</script>

<style scoped lang="less">
.menu-layout {
  height: 100vh;
}
</style>
