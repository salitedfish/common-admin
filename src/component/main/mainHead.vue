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
      <div style="margin-right: 10px">{{ authStore.userInfo?.nickName }}</div>
      <n-dropdown trigger="hover" :options="options" @select="handleSelect">
        <div class="user-box">
          <img v-if="authStore.userInfo?.headUrl" :src="authStore.userInfo?.headUrl" alt="" />
        </div>
      </n-dropdown>
    </section>

    <user-center-dialog v-model:showUserCenterModal="showUserCenterModal"></user-center-dialog>
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
import userCenterDialog from "@/component/userCenterDialog/userCenterDialog.vue";

const dialog = useDialog();
const router = useRouter();
const routeStore = useRouteStore();
const authStore = useAuthStore();
const { logout } = useLogout();

// 显示模态框
const showUserCenterModal = ref(false);

enum Options {
  LOGOUT = 0,
  USER_CENTER,
  THEME,
}

// 弹出的选项
const options = [
  {
    label: "用户中心",
    key: Options.USER_CENTER,
  },
  {
    label: "主题切换",
    key: Options.THEME,
  },
  {
    label: "退出",
    key: Options.LOGOUT,
  },
];

const handleSelect = async (key: string | number) => {
  if (key === Options.LOGOUT) {
    handleLogout();
  } else if (key === Options.THEME) {
    handleClick();
  } else if (key === Options.USER_CENTER) {
    showUserCenterModal.value = true;
  }
};

// 退出
const handleLogout = async () => {
  const dialogInfo = dialog.warning({
    title: "确认",
    content: "是否确认退出？",
    positiveText: "确认",
    onPositiveClick: async () => {
      dialogInfo.loading = true;
      const res = await logout();
      if (res) {
        router.push({ name: "login" });
        commonNotify("success", "退出成功");
      }
      dialogInfo.loading = false;
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
