<template>
  <n-space>
    <n-input v-model:value="params.uid" autosize placeholder="请输入用户编号" style="width: 200px" :disabled="searching" clearable></n-input>
    <n-input v-model:value="params.phone" autosize placeholder="请输入手机号" style="width: 200px" :disabled="searching" v-if="authStore.isAdmin" clearable></n-input>
    <n-input v-model:value="params.chainAddress" autosize placeholder="请输入区块链地址" style="width: 200px" :disabled="searching" clearable></n-input>
    <n-input v-model:value="params.inviteCode" autosize placeholder="请输入邀请码" style="width: 200px" :disabled="searching" v-if="authStore.isAdmin" clearable></n-input>
    <n-select v-model:value="params.tab" :options="accountTabList" placeholder="请选择用户类型" style="width: 200px" :disabled="searching" v-if="authStore.isAdmin" clearable />
    <n-select v-model:value="params.state" :options="userStateList" placeholder="请选择用户状态" style="width: 200px" :disabled="searching" v-if="authStore.isAdmin" clearable />
    <n-date-picker
      placeholder="请选择开始时间"
      v-model:formatted-value="params.startTime"
      value-format="yyyy-MM-dd HH:mm:ss"
      type="datetime"
      style="width: 200px"
      clearable
      :disabled="searching"
    />
    <n-date-picker
      placeholder="请选择结束时间"
      v-model:formatted-value="params.endTime"
      value-format="yyyy-MM-dd HH:mm:ss"
      type="datetime"
      style="width: 200px"
      clearable
      :disabled="searching"
    />
    <n-button type="primary" @click="searchHandler" :disabled="searching" :loading="searching">搜索 / 刷新</n-button>
  </n-space>
</template>

<script lang="ts" setup>
// 框架
import { reactive } from "vue";
// 组件库
// 自定义组件
// 工具库
// 自定义工具
// 网络请求
// store
import { useAuthStore } from "@/store/authStore";
import { userStateList, accountTabList } from "./userListManagerStore";
// 类型
import type { UserListParam } from "@/type/User";

const authStore = useAuthStore();

defineProps<{
  searching: boolean;
}>();

const emit = defineEmits<{
  (event: "submitSearch", params: UserListParam): void;
}>();

const params = reactive<UserListParam>({});

const searchHandler = () => {
  emit("submitSearch", params);
};
</script>

<style scoped lang="less"></style>
