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
        <div class="user-box">
          <img :src="authStore.getUserInfo()?.headUrl" alt="" />
          <!-- <custom-icon name="yonghu1" :size="28"></custom-icon> -->
        </div>
      </n-dropdown>
    </section>

    <n-modal v-model:show="showModal">
      <n-card style="width: 600px" title="用户中心" :bordered="false" size="huge" role="dialog" aria-modal="true"> </n-card>
    </n-modal>
  </section>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useDialog } from "naive-ui";
import customIcon from "@/component/common/customIcon.vue";
import { useThemeStore, useRouteStore, useAuthStore } from "@/store";
import { useLogout } from "@/util/auth";
import { commonNotify } from "@/util/common";

const dialog = useDialog();
const router = useRouter();
const routeStore = useRouteStore();
const authStore = useAuthStore();
const { logout } = useLogout();

enum Options {
  LOGOUT = 0,
  USER_CENTER,
  THEME,
}

// 弹出的选项
const options = [
  {
    label: "退出",
    key: Options.LOGOUT,
  },
  // {
  //   label: "用户中心",
  //   key: Options.USER_CENTER,
  // },
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

// 显示模态框
const showModal = ref(false);
</script>

<style scoped lang="less">
.main-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 18px;
  .head-right {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .user-box {
      height: 40px;
      width: 40px;
      display: flex;
      align-items: center;
      border-radius: 20px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
