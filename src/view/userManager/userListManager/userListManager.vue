<template>
  <n-card>
    <screen-header @submitSearch="submitSearch" :searching="searching"></screen-header>
  </n-card>
  <n-data-table :single-line="false" :columns="createColumns()" :data="list" :scroll-x="listXWidth" :max-height="listYHeight" :loading="searching"></n-data-table>
  <n-card>
    <n-pagination v-model:page="searchParam.page" :page-count="totalPage" @update:page="getList" />
  </n-card>

  <!-- 用户设置 -->
  <n-modal :show="showUserTabModal" @update:show="(state: boolean) => (showUserTabModal = state)">
    <n-card style="width: 600px" :title="'用户' + userInfo.title" :bordered="false" size="huge" role="dialog" aria-modal="true">
      <template #header-extra>
        <customIcon name="guanbi" :size="16" @click="showUserTabModal = false"></customIcon>
      </template>

      <n-form label-placement="left" label-width="80px" label-align="left">
        <n-form-item label="用户标签:" v-if="userInfo.setType === SetInfoType.TAB">
          <n-select v-model:value="userInfo.tab" :options="accountTabList" :disabled="updateTabLoading"></n-select>
        </n-form-item>
        <n-form-item label="手机号:" v-if="userInfo.setType === SetInfoType.PHONE">
          <n-input v-model:value="userInfo.phone" :disabled="updateTabLoading"></n-input>
        </n-form-item>
        <n-form-item label="邀请码:" v-if="userInfo.setType === SetInfoType.REGISTERCODE">
          <n-input v-model:value="userInfo.registerCode" :disabled="updateTabLoading"></n-input>
        </n-form-item>
      </n-form>

      <template #footer>
        <div style="display: flex; justify-content: end">
          <n-button type="primary" inline-block @click="comfirmUpdateUserTab" :disabled="updateTabLoading" :loading="updateTabLoading">确认</n-button>
        </div>
      </template>
    </n-card>
  </n-modal>

  <!-- 实名信息 -->
  <n-modal style="min-height: 200px; width: 600px" :show="showUserRealInfoModal" @update:show="(state: boolean) => {showUserRealInfoModal = state }">
    <layoutScrollCard :loading="getRealInfoLoading">
      <div v-if="!getRealInfoLoading && userRealInfo?.idCardCode">
        <n-form label-placement="left" label-width="80px" label-align="left">
          <n-form-item label="用户编号:">
            <n-input v-model:value="userRealInfo.uid" :disabled="true"></n-input>
          </n-form-item>
          <n-form-item label="用户名称:">
            <n-input v-model:value="userRealInfo.idCardName" :disabled="true"></n-input>
          </n-form-item>
          <n-form-item label="身份证号:">
            <n-input v-model:value="userRealInfo.idCardCode" :disabled="true"></n-input>
          </n-form-item>
          <n-form-item label="实名时间:">
            <n-input v-model:value="userRealInfo.createTime" :disabled="true"></n-input>
          </n-form-item>
        </n-form>
      </div>
      <div v-else-if="!getRealInfoLoading" style="text-align: center">未查询到用户实名信息</div>
    </layoutScrollCard>
  </n-modal>
</template>

<script lang="ts" setup>
// 框架
import { ref, h, reactive } from "vue";
// 组件库
import { NImage, NButton, NSpace, useDialog, NEllipsis } from "naive-ui";
// 自定义组件
import screenHeader from "./screenHeader.vue";
import customIcon from "@/component/common/customIcon.vue";
import layoutScrollCard from "@/component/common/layoutScrollCard.vue";
// 工具库
// 自定义工具
import { commonNotify, useListPage } from "@/util/common";
// 网络请求
import {
  getUserList as getUserListRequest,
  updateUserState as updateUserStateRequest,
  updateUserTab as updateUserTabRequest,
  updateUserPhone as updateUserPhoneRequest,
  getUserRealInfo as getUserRealInfoRequest,
  updateUserRegisterCode as updateUserRegisterCodeRequest,
} from "@/request/user";
// store
import { useAuthStore } from "@/store/authStore";
import { UserState, userStateList, accountTabList } from "./userListManagerStore";
// 类型
import type { DataTableColumns } from "naive-ui";
import type { UserListItem, UserRealInfo } from "@/type/User";
const dialog = useDialog();
const authStore = useAuthStore();
// 争对用户的不同操作类型
enum SetInfoType {
  TAB,
  PHONE,
  REGISTERCODE,
}
const setInfoTypeAction = {
  [SetInfoType.TAB]: {
    method: updateUserTabRequest,
  },
  [SetInfoType.PHONE]: {
    method: updateUserPhoneRequest,
  },
  [SetInfoType.REGISTERCODE]: {
    method: updateUserRegisterCodeRequest,
  },
};

// 列表渲染函数
const createColumns = () => {
  const list: DataTableColumns<UserListItem> = [
    {
      title: "用户编号",
      key: "uid",
      width: 100,
      align: "center",
      fixed: "left",
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
  ];
  // 管理员
  if (authStore.isAdmin) {
    list.splice(
      1,
      0,
      ...([
        {
          title: "手机号",
          key: "phone",
          align: "center",
          width: 120,
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
          width: 100,
          render(user) {
            return accountTabList.getItem(user.tab)?.label;
          },
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
              width: 30,
              src: user.headUrl,
            });
          },
        },
      ] as DataTableColumns<UserListItem>)
    );
    list.push(
      ...([
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
          width: 340,
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
                    userInfo.setType = SetInfoType.TAB;
                    userInfo.tab = user.tab;
                    userInfo.title = user.nickName;
                    userInfo.uid = user.uid;
                    showUserTabModal.value = true;
                  },
                },
                { default: () => "标签" }
              ),
              h(
                NButton,
                {
                  type: "primary",
                  size: "small",
                  secondary: true,
                  onClick: () => {
                    getUserRealInfoHandler(user.uid);
                    showUserRealInfoModal.value = true;
                  },
                },
                { default: () => "实名信息" }
              ),
              h(
                NButton,
                {
                  type: "primary",
                  size: "small",
                  secondary: true,
                  onClick: () => {
                    userInfo.setType = SetInfoType.PHONE;
                    userInfo.phone = user.phone;
                    userInfo.title = user.nickName;
                    userInfo.uid = user.uid;
                    showUserTabModal.value = true;
                  },
                },
                { default: () => "修改手机号" }
              ),
            ];
            if (!user.registerCode) {
              btnList.push(
                h(
                  NButton,
                  {
                    type: "primary",
                    size: "small",
                    secondary: true,
                    onClick: () => {
                      userInfo.setType = SetInfoType.REGISTERCODE;
                      userInfo.registerCode = user.registerCode;
                      userInfo.title = user.nickName;
                      userInfo.uid = user.uid;
                      showUserTabModal.value = true;
                    },
                  },
                  { default: () => "填写注册码" }
                )
              );
            }
            // 用来放按钮的容器
            const btnBox = h(NSpace, {}, { default: () => btnList });
            return btnBox;
          },
        },
      ] as DataTableColumns<UserListItem>)
    );
  } else {
    // 商户
    list.push(
      ...([
        {
          title: "会员等级",
          key: "memberLevel",
          align: "center",
          width: 120,
        },
        {
          title: "节点等级",
          key: "nodeLevel",
          align: "center",
          width: 120,
        },
      ] as DataTableColumns<UserListItem>)
    );
  }
  return list;
};

const { totalPage, getList, searchParam, list, listXWidth, listYHeight, searching, submitSearch } = useListPage(getUserListRequest, createColumns, { heightLevel: 1 });

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
        await getList();
        commonNotify("success", `${action}${user.nickName}成功`);
      }
      dialogInfo.loading = false;
    },
  });
};

// 用户设置相关
const showUserTabModal = ref(false);
const updateTabLoading = ref(false);
const userInfo = reactive({
  setType: SetInfoType.TAB,
  title: "",
  uid: 0,
  tab: 0,
  phone: "",
  registerCode: "",
});
const comfirmUpdateUserTab = async () => {
  updateTabLoading.value = true;
  const res = await setInfoTypeAction[userInfo.setType].method({ uid: userInfo.uid, tab: userInfo.tab, phone: userInfo.phone, registerCode: userInfo.registerCode });
  if (res) {
    await getList();
    commonNotify("success", `用户${userInfo.title}设置成功`);
    showUserTabModal.value = false;
  }
  updateTabLoading.value = false;
};

// 展示用户实名信息
const showUserRealInfoModal = ref(false);
const getRealInfoLoading = ref(false);
const userRealInfo = ref<Partial<UserRealInfo>>({});
const getUserRealInfoHandler = async (uid: number) => {
  getRealInfoLoading.value = true;
  const res = await getUserRealInfoRequest({ uid });
  if (res) {
    userRealInfo.value = res.data;
  }
  getRealInfoLoading.value = false;
};
</script>

<style scoped lang="less"></style>
