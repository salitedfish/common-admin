<template>
  <n-space>
    <!-- <n-input v-model:value="params.merchantUid" autosize placeholder="请输入商户编号" style="width: 200px" :disabled="searching" v-if="authStore.isAdmin" clearable></n-input> -->
    <n-input v-model:value="params.title" autosize placeholder="请输入banner标题" style="width: 200px" :disabled="searching" clearable></n-input>
    <n-select :options="bannerStateList" v-model:value="params.state" clearable :disabled="searching" style="width: 200px" placeholder="请选择banner状态"></n-select>

    <n-button type="primary" @click="searchHandler" :disabled="searching" :loading="searching">搜索 / 刷新</n-button>
    <n-button type="primary" @click="addBanner">添加Banner</n-button>
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
import { bannerStateList } from "./bannerManagerStore";
// 类型
import type { BannerListParams } from "@/type/Operator";

const router = useRouter();
const authStore = useAuthStore();

defineProps<{
  searching: boolean;
}>();

const emit = defineEmits<{
  (event: "submitSearch", params: BannerListParams): void;
}>();

const params = reactive<BannerListParams>({});

const searchHandler = () => {
  emit("submitSearch", params);
};

const addBanner = () => {
  router.push({
    name: "addBanner",
  });
};
</script>

<style scoped lang="less"></style>
