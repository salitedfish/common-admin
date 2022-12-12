<template>
  <n-card>
    <screen-header @submitSearch="submitSearch" :searching="searching"></screen-header>
  </n-card>
  <n-data-table :single-line="false" :columns="createColumns()" :data="list" :scroll-x="listXWidth" :max-height="listYHeight" :loading="searching"></n-data-table>
  <n-card>
    <n-pagination v-model:page="searchParam.page" :page-count="totalPage" @update:page="getList" />
  </n-card>

  <!-- 改变用户类型 -->
  <n-modal :show="showUserTabModal" @update:show="(state: boolean) => (showUserTabModal = state)">
    <n-card style="width: 600px" :title="userInfo.title" :bordered="false" size="huge" role="dialog" aria-modal="true">
      <template #header-extra>
        <customIcon name="guanbi" :size="16" @click="showUserTabModal = false"></customIcon>
      </template>

      <n-form label-placement="left" label-width="80px" label-align="left">
        <n-form-item label="用户标签:">
          <n-select v-model:value="userInfo.tab" :options="accountTabList.slice(1, accountTabList.length)" :disabled="updateTabLoading"></n-select>
        </n-form-item>
      </n-form>

      <template #footer>
        <div style="display: flex; justify-content: end">
          <n-button type="primary" inline-block @click="comfirmUpdateUserTab" :disabled="updateTabLoading" :loading="updateTabLoading">确认</n-button>
        </div>
      </template>
    </n-card>
  </n-modal>
</template>

<script lang="ts" setup>
// 框架
import { ref, onBeforeMount, h, reactive } from "vue";
// 组件库
import { NImage, NButton, NSpace, useDialog, NEllipsis } from "naive-ui";
// 自定义组件
import screenHeader from "./screenHeader.vue";
import customIcon from "@/component/common/customIcon.vue";
// 工具库
// 自定义工具
import { commonNotify, useListPage } from "@/util/common";
// 网络请求
import { getUserList as getUserListRequest, updateUserState as updateUserStateRequest, updateUserTab as updateUserTabRequest } from "@/request/user";
// store
import { UserState, userStateList, accountTabList } from "./userListManagerStore";
// 类型
import type { DataTableColumns } from "naive-ui";
import type { UserListItem } from "@/type/User";
const dialog = useDialog();

// 列表渲染函数
const createColumns = () => {
  const list: DataTableColumns<UserListItem> = [
    {
      title: "用户编号",
      key: "uid",
      width: 120,
      align: "center",
      fixed: "left",
    },
    {
      title: "手机号",
      key: "phone",
      align: "center",
      width: 140,
    },
    {
      title: "用户昵称",
      key: "nickName",
      align: "center",
      width: 120,
    },

    {
      title: "用户头像",
      key: "headUrl",
      align: "center",
      width: 100,
      render(user) {
        return h(NImage, {
          width: 50,
          src: user.headUrl,
        });
      },
    },
    {
      title: "区块链地址",
      key: "chainAddress",
      align: "center",
      width: 140,
      render(user) {
        return h(
          NEllipsis,
          {},
          {
            default: () => user.chainAddress,
          }
        );
      },
    },
    {
      title: "状态",
      key: "state",
      align: "center",
      width: 100,
      render(user) {
        return userStateList.getItem(user.state)?.label;
      },
    },
    {
      title: "类型",
      key: "tab",
      align: "center",
      width: 120,
      render(user) {
        return accountTabList.getItem(user.tab)?.label;
      },
    },
    {
      title: "邀请码",
      key: "inviteCode",
      align: "center",
      width: 100,
    },
    {
      title: "已邀请人数",
      key: "inviteNum",
      align: "center",
      width: 100,
    },
    {
      title: "注册码",
      key: "registerCode",
      align: "center",
      width: 100,
      render(user) {
        return user.registerCode || "-";
      },
    },
    {
      title: "注册时间",
      key: "registerTime",
      align: "center",
      width: 180,
      render(user) {
        return user.registerTime || "-";
      },
    },
    {
      title: "最近登录时间",
      key: "lastLoginTime",
      align: "center",
      width: 180,
      render(user) {
        return user.lastLoginTime || "-";
      },
    },

    {
      title: "操作",
      key: "operaction",
      align: "center",
      width: 120,
      fixed: "right",
      render(user) {
        const btnList = [
          h(
            NButton,
            { type: "warning", size: "small", secondary: true, onClick: () => handleFrozen(user) },
            { default: () => (user.state === UserState.FROZEN ? "解冻" : "冻结") }
          ),
          h(
            NButton,
            {
              type: "primary",
              size: "small",
              secondary: true,
              onClick: () => {
                userInfo.tab = user.tab;
                userInfo.title = user.nickName;
                userInfo.uid = user.uid;
                showUserTabModal.value = true;
              },
            },
            { default: () => "标签设置" }
          ),
        ];
        // 用来放按钮的容器
        const btnBox = h(NSpace, {}, { default: () => btnList });
        return btnBox;
      },
    },
  ];
  return list;
};

const { totalPage, getList, searchParam, list, listXWidth, listYHeight, searching, submitSearch } = useListPage(getUserListRequest, createColumns);

// 冻结或解冻
const handleFrozen = (user: UserListItem) => {
  const action = user.state === UserState.FROZEN ? "解冻" : "冻结";
  const actionState = user.state === UserState.FROZEN ? UserState.NORMAL : UserState.FROZEN;
  const dialogInfo = dialog.warning({
    title: action,
    content: `确认${action}${user.nickName}吗？`,
    positiveText: "确认",
    onPositiveClick: async () => {
      dialogInfo.loading = true;
      const res = await updateUserStateRequest({ state: actionState, uid: user.uid });
      if (res) {
        getList();
        commonNotify("success", `${action}${user.nickName}成功`);
      }
      dialogInfo.loading = false;
    },
  });
};

// 用户类型相关
const showUserTabModal = ref(false);
const updateTabLoading = ref(false);
const userInfo = reactive({
  title: "",
  tab: 0,
  uid: 0,
});
const comfirmUpdateUserTab = async () => {
  updateTabLoading.value = true;
  const res = await updateUserTabRequest({ uid: userInfo.uid, tab: userInfo.tab });
  if (res) {
    getList();
    commonNotify("success", `${userInfo.title}标签设置成功`);
    showUserTabModal.value = false;
  }
  updateTabLoading.value = false;
};

// 初始获取一次列表
onBeforeMount(() => {
  getList();
});
</script>

<style scoped lang="less"></style>
