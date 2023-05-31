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
      <n-button block type="primary" style="width: 90%; margin: 10px auto" @click="changeCollapsed">
        <span v-show="!collapsed" style="font-size: 16px">{{ commonStore.appName }}</span>
        <customIcon name="caidan" :size="12"></customIcon>
      </n-button>
      <n-menu class="menu" :options="menuOptions" :collapsed="collapsed" @update:value="handleMenuClick" :value="routeStore.currentRoute.name"> </n-menu>
    </n-layout-sider>
  </n-layout>
</template>

<script lang="ts" setup>
import { h, ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import { NIcon } from "naive-ui";
import type { MenuOption } from "naive-ui";
import customIcon from "@/component/common/customIcon.vue";
import { getAuthRoutes as getAuthRoutesRequest } from "@/request/auth";
import { routes } from "@/router/index";
import { useCommonStore } from "@/store/commonStore";
import { useRouteStore } from "@/store/routeStore";
import { useAuthStore } from "@/store/authStore";
import type { RemoteRoute } from "@/type/Common";

const commonStore = useCommonStore();
const routeStore = useRouteStore();
const authStore = useAuthStore();

// 展开状态
const collapsed = ref(false);
const changeCollapsed = () => {
  collapsed.value = !collapsed.value;
};

// 渲染menu图标
const renderIcon = (name: string) => {
  const size = 18;
  return () => h(NIcon, { size }, { default: () => h(customIcon, { name, size }) });
};

//依据路由生成菜单
const mapMenuHandler = (routes: RouteRecordRaw[]) => {
  const rootRoutes: MenuOption[] = [];
  for (const item of routes) {
    const menuItem: MenuOption = {
      label: item.meta?.label,
      // 值用于路由跳转时使用
      key: item.name as string,
      icon: renderIcon(item.meta?.icon as string),
      // 默认都创建菜单，但是默认先不显示，后面根据接口返回的路由判断是否显示
      show: !!item.meta?.show,
      // 用来和后端传递的路由id进行匹配
      routeId: item.meta ? (item.meta.id as number) : 0,
    };
    // 如果有子路由则递归生成菜单
    if (item.children) {
      menuItem.children = mapMenuHandler(item.children);
    }
    rootRoutes.push(menuItem);
    // 下面这个是菜单下面的横线
    if (item.meta?.divider) {
      rootRoutes.push({
        key: item.meta?.divider as string,
        type: "divider",
        props: {
          style: {
            marginLeft: "32px",
          },
        },
      });
    }
  }
  return rootRoutes;
};

// 完整菜单项（一般还需要根据权限设置哪些需要影藏）
const menuOptions = reactive<MenuOption[]>([...mapMenuHandler(routes)]);

// 根据远程的的路由来判断显示或不显示
const authRouteHandler = (originRoute: MenuOption[], remoteRoute: RemoteRoute[]) => {
  for (const item of originRoute) {
    for (const i of remoteRoute) {
      if (item.routeId === i.id) {
        item.show = true;
        // 如果有子路由则递归判断是否显示
        if (item.children && i.menu) {
          authRouteHandler(item.children, i.menu);
        }
        break;
      }
    }
  }
};

// 生成菜单后再判断显示哪些
onMounted(async () => {
  const res = await getAuthRoutesRequest();
  if (res) {
    const { data } = res;
    authRouteHandler(menuOptions, data);
    // 每个账号都有不同的权限，权限依据远程路由里面
    authStore.setAuthIds(data);
  }
});

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
