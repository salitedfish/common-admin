<template>
  <n-space>
    <n-input v-model:value="params.chainAddress" autosize placeholder="请输入地址" style="width: 200px" :disabled="searching" clearable></n-input>
    <n-input v-model:value="params.goodsId" autosize placeholder="请输入商品编号" style="width: 200px" :disabled="searching" clearable></n-input>
    <n-input v-model:value="params.token" autosize placeholder="请输入token" style="width: 200px" :disabled="searching" clearable></n-input>
    <n-input v-model:value="params.uid" autosize placeholder="请输入用户uid" style="width: 200px" :disabled="searching" clearable></n-input>

    <n-select :options="transferStateList" v-model:value="params.transState" placeholder="请选择状态" clearable :disabled="searching" style="width: 200px"></n-select>
    <n-select :options="userTypeList" v-model:value="params.userType" placeholder="请选择用户类型" clearable :disabled="searching" style="width: 200px"></n-select>

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
import { userTypeList, transferStateList } from "./goodsBlockChainRecordManagerStore";
// 类型
import type { ChainRecordParams } from "@/type/Finance";

defineProps<{
  searching: boolean;
}>();

const emit = defineEmits<{
  (event: "submitSearch", params: ChainRecordParams): void;
}>();

const params = reactive<ChainRecordParams>({});

const searchHandler = () => {
  emit("submitSearch", params);
};
</script>

<style scoped lang="less"></style>
