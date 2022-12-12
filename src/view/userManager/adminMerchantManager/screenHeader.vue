<template>
  <n-space>
    <n-input v-model:value="params.chainAddress" autosize placeholder="请输入区块链地址" style="width: 200px" :disabled="searching"></n-input>
    <n-input v-model:value="params.phone" autosize placeholder="请输入手机号" style="width: 200px" :disabled="searching" v-if="authStore.isAdmin()"></n-input>
    <n-input v-model:value="params.uid" autosize placeholder="请输入用户编号" style="width: 200px" :disabled="searching" v-if="authStore.isAdmin()"></n-input>
    <n-select v-model:value="params.role" :options="accountRoleList" placeholder="请选择用户类型" style="width: 200px" :disabled="searching" clearable />
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
import { accountRoleList } from "./adminMerchantManagerStore";
// 类型
import type { AdminMerchantListParam } from "@/type/User";

const authStore = useAuthStore();

defineProps<{
  searching: boolean;
}>();

const emit = defineEmits<{
  (event: "submitSearch", params: AdminMerchantListParam): void;
}>();

const params = reactive<AdminMerchantListParam>({});

const searchHandler = () => {
  emit("submitSearch", params);
};
</script>

<style scoped lang="less"></style>
