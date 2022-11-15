<template>
  <n-space vertical>
    <n-layout has-sider class="menu-layout">
      <n-layout-sider
        bordered
        collapse-mode="width"
        :collapsed-width="64"
        :width="240"
        :collapsed="collapsed"
        show-trigger
        @collapse="collapsed = true"
        @expand="collapsed = false"
        :native-scrollbar="false"
      >
        <n-menu :options="menuOptions" :collapsed="collapsed"></n-menu>
      </n-layout-sider>
    </n-layout>
  </n-space>
</template>

<script lang="ts" setup>
import { h, ref } from "vue";
import { RouterLink } from "vue-router";
import { NIcon } from "naive-ui";
import type { MenuOption } from "naive-ui";

import customIcon from "@/component/common/customIcon.vue";

const aaa = [
  {
    label: "商品管理",
    key: "goodsManager",
    // icon: renderIcon(BookIcon),
    children: [
      {
        label: "商品列表",
        key: "goodsListManager",
      },
      {
        label: "商品类目",
        key: "goodsCategoryManager",
      },
    ],
  },
  {
    label: "用户管理",
    key: "userManager",
    // icon: renderIcon(BookIcon),
    children: [
      {
        label: "商品列表",
        key: "people",
      },
      {
        label: "商品类目",
        key: "beverage",
      },
    ],
  },
  {
    label: "商品管理",
    key: "goodsManager",
    // icon: renderIcon(BookIcon),
    children: [
      {
        label: "商品列表",
        key: "goodsListManager",
      },
      {
        label: "商品类目",
        key: "goodsCategoryManager",
      },
    ],
  },
  {
    label: "用户管理",
    key: "userManager",
    // icon: renderIcon(BookIcon),
    children: [
      {
        label: "商品列表",
        key: "people",
      },
      {
        label: "商品类目",
        key: "beverage",
      },
    ],
  },
  {
    label: "商品管理",
    key: "goodsManager",
    // icon: renderIcon(BookIcon),
    children: [
      {
        label: "商品列表",
        key: "goodsListManager",
      },
      {
        label: "商品类目",
        key: "goodsCategoryManager",
      },
    ],
  },
  {
    label: "用户管理",
    key: "userManager",
    // icon: renderIcon(BookIcon),
    children: [
      {
        label: "商品列表",
        key: "people",
      },
      {
        label: "商品类目",
        key: "beverage",
      },
    ],
  },
  {
    label: "商品管理",
    key: "goodsManager",
    // icon: renderIcon(BookIcon),
    children: [
      {
        label: "商品列表",
        key: "goodsListManager",
      },
      {
        label: "商品类目",
        key: "goodsCategoryManager",
      },
    ],
  },
  {
    label: "用户管理",
    key: "userManager",
    // icon: renderIcon(BookIcon),
    children: [
      {
        label: "商品列表",
        key: "people",
      },
      {
        label: "商品类目",
        key: "beverage",
      },
    ],
  },
  {
    label: "商品管理",
    key: "goodsManager",
    // icon: renderIcon(BookIcon),
    children: [
      {
        label: "商品列表",
        key: "goodsListManager",
      },
      {
        label: "商品类目",
        key: "goodsCategoryManager",
      },
    ],
  },
  {
    label: "用户管理",
    key: "userManager",
    // icon: renderIcon(BookIcon),
    children: [
      {
        label: "商品列表",
        key: "people",
      },
      {
        label: "商品类目",
        key: "beverage",
      },
    ],
  },
  {
    label: "商品管理",
    key: "goodsManager",
    // icon: renderIcon(BookIcon),
    children: [
      {
        label: "商品列表",
        key: "goodsListManager",
      },
      {
        label: "商品类目",
        key: "goodsCategoryManager",
      },
    ],
  },
  {
    label: "用户管理",
    key: "userManager",
    // icon: renderIcon(BookIcon),
    children: [
      {
        label: "商品列表",
        key: "people",
      },
      {
        label: "商品类目",
        key: "beverage",
      },
    ],
  },
  {
    label: "商品管理",
    key: "goodsManager",
    // icon: renderIcon(BookIcon),
    children: [
      {
        label: "商品列表",
        key: "goodsListManager",
      },
      {
        label: "商品类目",
        key: "goodsCategoryManager",
      },
    ],
  },
  {
    label: "用户管理",
    key: "userManager",
    // icon: renderIcon(BookIcon),
    children: [
      {
        label: "商品列表",
        key: "people",
      },
      {
        label: "商品类目",
        key: "beverage",
      },
    ],
  },
  {
    label: "商品管理",
    key: "goodsManager",
    // icon: renderIcon(BookIcon),
    children: [
      {
        label: "商品列表",
        key: "goodsListManager",
      },
      {
        label: "商品类目",
        key: "goodsCategoryManager",
      },
    ],
  },
  {
    label: "用户管理",
    key: "userManager",
    // icon: renderIcon(BookIcon),
    children: [
      {
        label: "商品列表",
        key: "people",
      },
      {
        label: "商品类目",
        key: "beverage",
      },
    ],
  },
  {
    label: "商品管理",
    key: "goodsManager",
    // icon: renderIcon(BookIcon),
    children: [
      {
        label: "商品列表",
        key: "goodsListManager",
      },
      {
        label: "商品类目",
        key: "goodsCategoryManager",
      },
    ],
  },
  {
    label: "用户管理",
    key: "userManager",
    // icon: renderIcon(BookIcon),
    children: [
      {
        label: "商品列表",
        key: "people",
      },
      {
        label: "商品类目",
        key: "beverage",
      },
    ],
  },
  {
    label: "商品管理",
    key: "goodsManager",
    // icon: renderIcon(BookIcon),
    children: [
      {
        label: "商品列表",
        key: "goodsListManager",
      },
      {
        label: "商品类目",
        key: "goodsCategoryManager",
      },
    ],
  },
  {
    label: "用户管理",
    key: "userManager",
    // icon: renderIcon(BookIcon),
    children: [
      {
        label: "商品列表",
        key: "people",
      },
      {
        label: "商品类目",
        key: "beverage",
      },
    ],
  },
];

const collapsed = ref(false);
const renderIcon = (name: string) => {
  const size = 18;
  return () => h(NIcon, { size }, { default: () => h(customIcon, { name, size }) });
};
const menuOptions: MenuOption[] = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "login",
            query: {
              lang: "zh-CN",
            },
          },
        },
        { default: () => "首页" }
      ),
    key: "go-back-home",
    icon: renderIcon("zhengshu"),
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
  {
    label: "商品管理",
    key: "goodsManager",
    icon: renderIcon("zhengshu"),
    children: [
      {
        label: "商品列表",
        key: "goodsListManager",
        icon: renderIcon("wenjianguanli"),
      },
      {
        label: "商品类目",
        key: "goodsCategoryManager",
        icon: renderIcon("wenjianguanli"),
      },
    ],
  },
  {
    label: "用户管理",
    key: "userManager",
    icon: renderIcon("zhengshu"),
    children: [
      {
        label: "商品列表",
        key: "people",
        icon: renderIcon("wenjianguanli"),
      },
      {
        label: "商品类目",
        key: "beverage",
        icon: renderIcon("wenjianguanli"),
      },
    ],
  },
  //   ...aaa,
];
</script>

<style scoped lang="less">
.menu-layout {
  height: 100vh;
}
</style>
