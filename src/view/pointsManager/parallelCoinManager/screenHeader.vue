<template>
  <n-space>
    <n-input
      v-model:value="params.merchantUid"
      autosize
      placeholder="请输入商户编号, 0表示平台"
      v-if="authStore.isAdmin"
      style="width: 220px"
      :disabled="searching"
      clearable
    ></n-input>
    <n-input v-model:value="params.coin" autosize placeholder="请输入代币" style="width: 200px" :disabled="searching" clearable></n-input>
    <n-button type="primary" @click="searchHandler" :disabled="searching" :loading="searching">搜索 / 刷新</n-button>
    <n-button type="primary" @click="gotoAddCoin" v-if="!authStore.isAdmin">添加代币</n-button>
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
import type { ParallelCoinListParams } from "@/type/Points";

const authStore = useAuthStore();
const router = useRouter();

defineProps<{
  searching: boolean;
}>();

const emit = defineEmits<{
  (event: "submitSearch", params: ParallelCoinListParams): void;
}>();

const params = reactive<ParallelCoinListParams>({});

const gotoAddCoin = () => {
  router.push({ name: "parallelCoinDetail", query: { type: "ADD" } });
};

const searchHandler = () => {
  emit("submitSearch", params);
};
</script>

<style scoped lang="less"></style>
