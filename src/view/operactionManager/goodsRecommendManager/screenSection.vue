<template>
  <n-space>
    <n-input v-model:value="params.merchantUid" autosize placeholder="请输入商户编号, 0表示平台" v-if="authStore.isAdmin()" style="width: 220px" :disabled="searching"></n-input>
    <n-input v-model:value="params.goodsId" autosize placeholder="请输入商品编号" style="width: 200px" :disabled="searching"></n-input>
    <n-input v-model:value="params.goodsName" autosize placeholder="请输入商品名称" style="width: 200px" :disabled="searching"></n-input>

    <n-button type="primary" @click="searchHandler" :disabled="searching" :loading="searching">搜索 / 刷新</n-button>
    <n-button type="primary" @click="addGoodsRecommend">添加推荐</n-button>
  </n-space>
</template>

<script lang="ts" setup>
// 框架
import { reactive } from "vue";
import { useRouter } from "vue-router";
// 组件库
// 自定义组件
// 工具库
// 自定义工具
// 网络请求
// store
import { useAuthStore } from "@/store/authStore";
// 类型
import type { GoodsRecommendListParams } from "@/type/Operator";

const authStore = useAuthStore();
const router = useRouter();

defineProps<{
  searching: boolean;
}>();

const emit = defineEmits<{
  (event: "submitSearch", params: GoodsRecommendListParams): void;
}>();

const params = reactive<GoodsRecommendListParams>({});

const addGoodsRecommend = () => {
  null;
};

const searchHandler = () => {
  emit("submitSearch", params);
};
</script>

<style scoped lang="less"></style>
