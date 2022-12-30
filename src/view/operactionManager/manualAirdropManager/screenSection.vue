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
    <n-select v-model:value="params.type" :options="airDropTypeList" placeholder="请选择空投类型" style="width: 200px" :disabled="searching" clearable />
    <n-input v-model:value="params.name" autosize placeholder="请输入空投名称" style="width: 200px" :disabled="searching" clearable></n-input>
    <n-select v-model:value="params.itemType" :options="airDropItemTypeList" placeholder="请选择空投物品类型" style="width: 200px" :disabled="searching" clearable />
    <n-input v-model:value="params.itemId" autosize placeholder="请输入商品/积分编号" style="width: 200px" :disabled="searching" clearable></n-input>
    <n-select v-model:value="params.state" :options="airDropStateList" placeholder="请选择空投状态" style="width: 200px" :disabled="searching" clearable />
    <n-select v-model:value="params.taskState" :options="airDropTaskStateList" placeholder="请选择空投进度" style="width: 200px" :disabled="searching" clearable />
    <n-button type="primary" @click="searchHandler" :disabled="searching" :loading="searching">搜索 / 刷新</n-button>
    <whiteListTemplateDownload></whiteListTemplateDownload>
    <n-button type="primary" @click="gotoAirdrop">添加空投</n-button>
  </n-space>
</template>

<script lang="ts" setup>
// 框架
import { reactive } from "vue";
import { useRouter } from "vue-router";
// 组件库
// 自定义组件
import whiteListTemplateDownload from "@/component/whiteList/whiteListTemplateDownload.vue";
// 工具库
// 自定义工具
// 网络请求
// store
import { useAuthStore } from "@/store/authStore";
import { airDropTypeList, airDropItemTypeList, airDropStateList, airDropTaskStateList } from "./manualAirdropManagerStore";
// 类型
import type { ManualAirDropListSearchParams } from "@/type/Operator";

const authStore = useAuthStore();
const router = useRouter();

defineProps<{
  searching: boolean;
}>();

const emit = defineEmits<{
  (event: "submitSearch", params: ManualAirDropListSearchParams): void;
}>();

const params = reactive<ManualAirDropListSearchParams>({});

const gotoAirdrop = () => {
  router.push({ name: "addManualAirdrop" });
};

const searchHandler = () => {
  emit("submitSearch", params);
};
</script>

<style scoped lang="less"></style>
