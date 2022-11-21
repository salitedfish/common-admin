<template>
  <section class="main-head">
    <section class="head-left">
      <n-breadcrumb separator="/">
        <n-breadcrumb-item v-for="(item, key) in routeStore.currentRoutePath" :key="key">
          <custom-icon :name="item.meta.icon as string || ''" :size="14"></custom-icon>
          {{ item.meta.label }}
        </n-breadcrumb-item>
      </n-breadcrumb>
    </section>

    <section class="head-right">
      <n-dropdown trigger="hover" :options="options" @select="handleSelect">
        <custom-icon name="yonghu1" :size="28"></custom-icon>
      </n-dropdown>
    </section>
  </section>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { useDialog } from "naive-ui";
import customIcon from "@/component/common/customIcon.vue";
import { useThemeStore, useRouteStore } from "@/store";
import { useLogout } from "@/util/auth";
import { commonNotify } from "@/util/common";

const dialog = useDialog();
const router = useRouter();
const routeStore = useRouteStore();
const { logout } = useLogout();

enum Options {
  LOGOUT = 0,
  THEME,
}

const options = [
  {
    label: "退出",
    key: Options.LOGOUT,
  },
  {
    label: "主题切换",
    key: Options.THEME,
  },
];

const handleSelect = async (key: string | number) => {
  if (key === Options.LOGOUT) {
    handleLogout();
  } else if (key === Options.THEME) {
    handleClick();
  }
};

// 退出
const handleLogout = async () => {
  dialog.warning({
    title: "确认",
    content: "是否确认退出？",
    positiveText: "确认",
    onPositiveClick: async () => {
      const res = await logout();
      if (res && res.code === 0) {
        router.push({ name: "login" });
        commonNotify("success", "退出成功");
      }
    },
  });
};

// 主题控制
const themeStore = useThemeStore();
const handleClick = () => {
  themeStore.switchTheme();
};
</script>

<style scoped lang="less">
.main-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 18px;
  .head-right {
    cursor: pointer;
    // width: 120px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
