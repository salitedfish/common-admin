<template>
  <n-space>
    <n-input v-model:value="params.goodsId" autosize placeholder="请输入商品ID" style="width: 200px" :disabled="searching"></n-input>
    <n-input v-model:value="params.goodsName" autosize placeholder="请输入商品名称" style="width: 200px" :disabled="searching"></n-input>
    <n-input v-model:value="params.merchantUid" autosize placeholder="请输入商户编号" style="width: 200px" :disabled="searching"></n-input>
    <n-select v-model:value="params.goodsState" :options="goodsStateList" placeholder="请选择商品状态" style="width: 200px" :disabled="searching" clearable />
    <n-select v-model:value="params.goodsType" :options="goodsTypeList" placeholder="请选择商品类型" style="width: 200px" :disabled="searching" clearable />
    <n-button type="primary" @click="searchHandler" :disabled="searching" :loading="searching">搜索</n-button>
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

import type { SearchParams } from "@/type/GoodsManager";
import { goodsStateList, goodsTypeList } from "../goodsListManagerType";

defineProps<{
  searching: boolean;
}>();

const emit = defineEmits<{
  (event: "submitSearch", params: SearchParams): void;
}>();

const params = reactive<SearchParams>({
  goodsId: "",
  goodsName: "",
  merchantUid: "",
});

const searchHandler = () => {
  emit("submitSearch", params);
};
</script>

<style scoped lang="less"></style>
