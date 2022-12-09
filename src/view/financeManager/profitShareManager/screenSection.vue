<template>
  <n-space>
    <n-input v-model:value="params.merchantUid" autosize placeholder="请输入商户编号, 0表示平台" v-if="authStore.isAdmin()" style="width: 220px" :disabled="searching"></n-input>
    <n-input v-model:value="params.orderId" autosize placeholder="请输入订单编号" style="width: 200px" :disabled="searching"></n-input>
    <n-select :options="payChannelList" v-model:value="params.channelType" placeholder="请选择分账渠道" style="width: 200px" :disabled="searching" clearable></n-select>
    <n-select :options="orderTypeList" v-model:value="params.orderType" placeholder="请选择订单类型" style="width: 200px" :disabled="searching" clearable></n-select>
    <n-select :options="shareStateList" v-model:value="params.state" placeholder="请选择分账状态" style="width: 200px" :disabled="searching" clearable></n-select>
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
import { payChannelList, shareStateList } from "./profitShareManagerStore";
import { orderTypeList } from "@/view/orderManager/orderListManager/orderListManagerStore";
// 类型
import type { GetProfitShareListParams } from "@/type/Finance";

const authStore = useAuthStore();

defineProps<{
  searching: boolean;
}>();

const emit = defineEmits<{
  (event: "submitSearch", params: GetProfitShareListParams): void;
}>();

const params = reactive<GetProfitShareListParams>({});

const searchHandler = () => {
  emit("submitSearch", params);
};
</script>

<style scoped lang="less"></style>
