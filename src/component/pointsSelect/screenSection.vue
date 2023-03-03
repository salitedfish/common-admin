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
    <n-input v-model:value="params.pointsId" autosize placeholder="请输入积分编号" style="width: 200px" :disabled="searching" clearable></n-input>
    <n-input v-model:value="params.pointsName" autosize placeholder="请输入积分名称" style="width: 200px" :disabled="searching" clearable></n-input>
    <!-- <n-select v-model:value="params.pointsStates" :options="pointsStateSearchList" placeholder="请选择积分状态" style="width: 200px" :disabled="searching" clearable /> -->
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
// import { pointsStateSearchList } from "@/view/pointsManager/pointsListManager/pointsListManagerStore";
// 类型
import type { GetPointsListParams } from "@/type/Points";

const authStore = useAuthStore();

defineProps<{
  searching: boolean;
}>();

const emit = defineEmits<{
  (event: "submitSearch", params: GetPointsListParams): void;
}>();

const params = reactive<GetPointsListParams>({});

const searchHandler = () => {
  emit("submitSearch", params);
};
</script>

<style scoped lang="less"></style>
