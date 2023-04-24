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
    <n-input v-model:value="params.name" autosize placeholder="请输入活动名称" style="width: 200px" :disabled="searching" clearable></n-input>
    <n-input v-model:value="params.goodsId" autosize placeholder="请输入商品编号" style="width: 200px" :disabled="searching" clearable></n-input>
    <n-input v-model:value="params.goodsName" autosize placeholder="请输入商品名称" style="width: 200px" :disabled="searching" clearable></n-input>
    <!-- <n-input v-model:value="params.itemId" autosize placeholder="请输入奖品编号" style="width: 200px" :disabled="searching" clearable></n-input>
    <n-select v-model:value="params.itemType" :options="rewardTypeList" placeholder="请选择奖品类型" style="width: 200px" :disabled="searching" clearable /> -->
    <n-select v-model:value="params.timeType" :options="goodsActivityTimeTypeList" placeholder="请选择执行时间类型" style="width: 200px" :disabled="searching" clearable />

    <n-button type="primary" @click="searchHandler" :disabled="searching" :loading="searching">搜索 / 刷新</n-button>
    <n-button type="primary" @click="gotoAddLottery" v-if="!authStore.isAdmin">添加商品活动</n-button>
  </n-space>
</template>

<script lang="ts">
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
import { rewardTypeList, goodsActivityTimeTypeList } from "@/view/operactionManager/goodsActivityDetail/goodsActivityDetailStore";

// 类型
import type { GoodsActivityListParams } from "@/type/Operator";
// 组件名
</script>

<script lang="ts" setup>
const router = useRouter();

defineProps<{
  searching: boolean;
}>();

const emit = defineEmits<{
  (event: "submitSearch", params: GoodsActivityListParams): void;
}>();

const authStore = useAuthStore();

const params = reactive<GoodsActivityListParams>({});

const searchHandler = () => {
  emit("submitSearch", params);
};

const gotoAddLottery = () => {
  router.push({
    name: "goodsActivityDetail",
    query: {
      type: "ADD",
    },
  });
};
</script>

<style scoped lang="less"></style>
