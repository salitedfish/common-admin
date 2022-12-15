<template>
  <n-card>
    <screen-header @submitSearch="submitSearch" :searching="searching"></screen-header>
  </n-card>
  <n-data-table :single-line="false" :columns="createColumns()" :data="list" :scroll-x="listXWidth" :max-height="listYHeight" :loading="searching"></n-data-table>
  <n-card>
    <n-pagination v-model:page="searchParam.page" :page-count="totalPage" @update:page="getList" />
  </n-card>
</template>

<script lang="ts" setup>
// 框架
import { h } from "vue";
// 组件库
import { NImage, NButton, NSpace, useDialog, NEllipsis } from "naive-ui";
// 自定义组件
import screenHeader from "./screenHeader.vue";
// 工具库
// 自定义工具
import { commonNotify, useListPage } from "@/util/common";
// 网络请求
import { getAdminMerchantList, updateAdminMerchantState, resetAdminMerchantPassword } from "@/request/user";
// store
import { accountRoleList, AdminMerchantState, userStateList } from "./adminMerchantManagerStore";
// 类型
import type { DataTableColumns } from "naive-ui";
import type { AdminMerchantListItem } from "@/type/User";
const dialog = useDialog();

// 列表渲染函数
const createColumns = () => {
  const list: DataTableColumns<AdminMerchantListItem> = [
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
      title: "名称/商户名称",
      key: "nickName",
      align: "center",
      width: 120,
      render: (user) => {
        return user.nickName || "-";
      },
    },
    {
      title: "微信商户号",
      key: "subMchid",
      align: "center",
      width: 140,
      render: (user) => {
        return user.subMchid || "-";
      },
    },

    {
      title: "头像",
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
      title: "类型",
      key: "tab",
      align: "center",
      width: 120,
      render(user) {
        return accountRoleList.getItem(user.role)?.label;
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
    // {
    //   title: "区块链公钥",
    //   key: "chainPublicKey",
    //   align: "center",
    //   width: 140,
    // },

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
      title: "状态",
      key: "state",
      align: "center",
      width: 100,
      render(user) {
        return userStateList.getItem(user.state)?.label;
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
            { default: () => (user.state === AdminMerchantState.FROZEN ? "解冻" : "冻结") }
          ),
          h(NButton, { type: "warning", size: "small", secondary: true, onClick: () => handleResetpassword(user) }, { default: () => "重置密码" }),
        ];
        // 用来放按钮的容器
        const btnBox = h(NSpace, {}, { default: () => btnList });
        return btnBox;
      },
    },
  ];
  return list;
};

const { totalPage, getList, searchParam, list, listXWidth, listYHeight, searching, submitSearch } = useListPage(getAdminMerchantList, createColumns);

// 冻结或解冻
const handleFrozen = (user: AdminMerchantListItem) => {
  const action = user.state === AdminMerchantState.FROZEN ? "解冻" : "冻结";
  const actionState = user.state === AdminMerchantState.FROZEN ? AdminMerchantState.NORMAL : AdminMerchantState.FROZEN;
  const dialogInfo = dialog.warning({
    title: action,
    content: `确认${action}${user.nickName}吗？`,
    positiveText: "确认",
    onPositiveClick: async () => {
      dialogInfo.loading = true;
      const res = await updateAdminMerchantState({ state: actionState, uid: user.uid });
      if (res) {
        await getList();
        commonNotify("success", `${action}${user.nickName}成功`);
      }
      dialogInfo.loading = false;
    },
  });
};

//重置用户密码
const handleResetpassword = (user: AdminMerchantListItem) => {
  const dialogInfo = dialog.warning({
    title: "重置密码",
    content: `确认重置${user.nickName}的密码吗？`,
    positiveText: "确认",
    onPositiveClick: async () => {
      dialogInfo.loading = true;
      const res = await resetAdminMerchantPassword({ uid: user.uid });
      if (res) {
        await getList();
        commonNotify("success", `密码重置为:${res.data.password}`, true);
      }
      dialogInfo.loading = false;
    },
  });
};
</script>

<style scoped lang="less"></style>
