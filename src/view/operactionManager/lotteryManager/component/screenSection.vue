<template>
  <n-space>
    <n-input
      v-model:value="params.merchantUid"
      autosize
      placeholder="请输入商户编号, -1为全部，0为平台"
      style="width: 200px"
      :disabled="searching"
      v-if="authStore.isAdmin"
      clearable
    ></n-input>
    <n-input v-model:value="params.name" autosize placeholder="请输入抽签名称" style="width: 200px" :disabled="searching" clearable></n-input>

    <n-select v-model:value="params.lotteryTabType" :options="lotteryTabTypes" placeholder="请选择标记类型" style="width: 200px" :disabled="searching" clearable />
    <n-select v-model:value="params.useType" :options="lotteryUseTypes" placeholder="请选择抽签作用" style="width: 200px" :disabled="searching" clearable />
    <n-select v-model:value="params.state" :options="lotteryStates" placeholder="请选择抽签状态" style="width: 200px" :disabled="searching" clearable />
    <n-select v-model:value="params.taskState" :options="lotteryTaskStates" placeholder="请选择抽签进度" style="width: 200px" :disabled="searching" clearable />

    <n-button type="primary" @click="searchHandler" :disabled="searching" :loading="searching">搜索 / 刷新</n-button>
    <whiteListTemplateDownload></whiteListTemplateDownload>
    <n-button type="primary" @click="gotoAddLottery">添加抽签</n-button>
  </n-space>
</template>

<script lang="ts">
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
import { lotteryStates, lotteryTabTypes, lotteryTaskStates, lotteryUseTypes } from "../lotteryManagerStore";
// 类型
import type { LotteryListParams } from "@/type/Operator";
// 组件名
</script>

<script lang="ts" setup>
const router = useRouter();

defineProps<{
  searching: boolean;
}>();

const emit = defineEmits<{
  (event: "submitSearch", params: LotteryListParams): void;
}>();

const authStore = useAuthStore();

const params = reactive<LotteryListParams>({});

const searchHandler = () => {
  emit("submitSearch", params);
};

const gotoAddLottery = () => {
  router.push({
    name: "lotteryDetail",
    query: {
      type: "ADD",
    },
  });
};
</script>

<style scoped lang="less"></style>
