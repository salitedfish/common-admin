<template>
  <n-space>
    <n-input v-model:value="params.uid" autosize placeholder="请输入用户编号" style="width: 200px" :disabled="searching" v-if="authStore.isAdmin" clearable></n-input>
    <n-input v-model:value="params.token" autosize placeholder="请输入token" style="width: 200px" :disabled="searching" clearable></n-input>
    <n-input v-model:value="params.toAddress" autosize placeholder="请输入提币地址" style="width: 200px" :disabled="searching" clearable></n-input>
    <n-select v-model:value="params.state" :options="parallelCoinWithdrawStates" placeholder="请选择状态" style="width: 200px" :disabled="searching" clearable />

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
import { parallelCoinWithdrawStates } from "./parallelCoinWithdrawManagerStore";
// 类型
import type { ParallelCoinWithdrawListScreenParams } from "@/type/Finance";

const authStore = useAuthStore();

defineProps<{
  searching: boolean;
}>();

const emit = defineEmits<{
  (event: "submitSearch", params: ParallelCoinWithdrawListScreenParams): void;
}>();

const params = reactive<ParallelCoinWithdrawListScreenParams>({});

const searchHandler = () => {
  emit("submitSearch", params);
};
</script>

<style scoped lang="less"></style>
