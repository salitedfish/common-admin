<template>
  <n-space>
    <n-input
      v-model:value="params.merchantUid"
      autosize
      placeholder="请输入商户编号, 0表示平台"
      v-if="authStore.isAdmin()"
      style="width: 220px"
      :disabled="searching"
      clearable
    ></n-input>
    <n-input v-model:value="params.name" autosize placeholder="请输入空投名称" style="width: 200px" :disabled="searching" clearable></n-input>
    <n-input v-model:value="params.itemId" autosize placeholder="请输入商品/积分编号" style="width: 200px" :disabled="searching" clearable></n-input>
    <n-select v-model:value="params.itemType" :options="airDropItemTypeList" placeholder="请选择空投物品类型" style="width: 200px" :disabled="searching" clearable />
    <n-select v-model:value="params.timeType" :options="airDropTimeTypeList" placeholder="请选择空投时间类型" style="width: 200px" :disabled="searching" clearable />
    <n-button type="primary" @click="searchHandler" :disabled="searching" :loading="searching">搜索 / 刷新</n-button>
    <n-button type="primary" @click="gotoAirdrop">添加空投任务</n-button>
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
import { airDropItemTypeList } from "../manualAirdropManager/manualAirdropManagerStore";
import { airDropTimeTypeList } from "./timingAirdropManagerStore";
// 类型
import type { TimingAirDropListSearchParams } from "@/type/Operator";

const authStore = useAuthStore();
const router = useRouter();

defineProps<{
  searching: boolean;
}>();

const emit = defineEmits<{
  (event: "submitSearch", params: TimingAirDropListSearchParams): void;
}>();

const params = reactive<TimingAirDropListSearchParams>({});

const gotoAirdrop = () => {
  router.push({ name: "addTimingAirdrop" });
};

const searchHandler = () => {
  emit("submitSearch", params);
};
</script>

<style scoped lang="less"></style>
