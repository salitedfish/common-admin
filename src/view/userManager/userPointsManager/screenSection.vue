<template>
  <n-space>
    <n-input
      v-model:value="params.merchantUid"
      autosize
      placeholder="请输入商户编号，-1为全部，0为系统"
      style="width: 200px"
      :disabled="searching"
      clearable
      v-if="authStore.isAdmin()"
    ></n-input>
    <n-input v-model:value="params.pointsId" autosize placeholder="请输入积分编号" style="width: 200px" :disabled="searching" clearable></n-input>
    <n-input v-model:value="params.pointsName" autosize placeholder="请输入积分名称" style="width: 200px" :disabled="searching" clearable></n-input>
    <n-input v-model:value="params.token" autosize placeholder="请输入token" style="width: 200px" :disabled="searching" clearable></n-input>
    <n-input v-model:value="params.uid" autosize placeholder="请输入用户编号" style="width: 200px" :disabled="searching" clearable></n-input>

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
// 类型
import type { GetUserPointsListParams } from "@/type/User";

const authStore = useAuthStore();

defineProps<{
  searching: boolean;
}>();

const emit = defineEmits<{
  (event: "submitSearch", params: GetUserPointsListParams): void;
}>();

const params = reactive<GetUserPointsListParams>({});

const searchHandler = () => {
  emit("submitSearch", params);
};
</script>

<style scoped lang="less"></style>
