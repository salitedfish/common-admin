<template>
  <n-space>
    <category-select v-model="categoryList" checkType="all" style="width: 200px"></category-select>
    <n-input v-model:value="params.goodsId" autosize placeholder="请输入商品编号" style="width: 200px" :disabled="searching"></n-input>
    <n-input v-model:value="params.goodsName" autosize placeholder="请输入商品名称" style="width: 200px" :disabled="searching"></n-input>
    <n-input v-model:value="params.merchantUid" autosize placeholder="请输入商户编号" style="width: 200px" :disabled="searching" v-if="authStore.isAdmin()"></n-input>
    <n-input v-model:value="params.orderId" autosize placeholder="请输入订单编号" style="width: 200px" :disabled="searching"></n-input>
    <n-input v-model:value="params.uid" autosize placeholder="请输入用户编号" style="width: 200px" :disabled="searching"></n-input>
    <n-select v-model:value="params.invoiceState" :options="invoiceState" placeholder="请选择开票状态" style="width: 200px" :disabled="searching" clearable />
    <n-select v-model:value="params.orderState" :options="orderStateList" placeholder="请选择订单状态" style="width: 200px" :disabled="searching" clearable />
    <n-select v-model:value="params.orderType" :options="orderTypeList" placeholder="请选择订单类型" style="width: 200px" :disabled="searching" clearable />
    <n-select v-model:value="params.payChannel" :options="payChannelList" placeholder="请选择付款渠道" style="width: 200px" :disabled="searching" clearable />
    <n-select v-model:value="params.type" :options="orderExchangeTypeList" placeholder="请选择交易类型" style="width: 200px" :disabled="searching" clearable />
    <n-button type="primary" @click="searchHandler" :disabled="searching" :loading="searching">搜索 / 刷新</n-button>
  </n-space>
</template>

<script lang="ts" setup>
// 框架
import { reactive, ref } from "vue";
// 组件库
// 自定义组件
import categorySelect from "@/component/common/categorySelect.vue";
// 工具库
// 自定义工具
// 网络请求
// store
import { useAuthStore } from "@/store/authStore";
import { invoiceState, orderStateList, orderTypeList, payChannelList, orderExchangeTypeList } from "./orderListManagerStore";
// 类型
import type { OrderListParam } from "@/type/Order";
import type { CategoryTreeItem } from "@/type/Common";

const authStore = useAuthStore();

defineProps<{
  searching: boolean;
}>();

const emit = defineEmits<{
  (event: "submitSearch", params: OrderListParam): void;
}>();

const categoryList = ref<CategoryTreeItem[]>([]);
const params = reactive<OrderListParam>({});

const searchHandler = () => {
  if (categoryList.value.length >= 1) {
    params.classify = categoryList.value[categoryList.value.length - 1].id;
  }

  emit("submitSearch", params);
};
</script>

<style scoped lang="less"></style>
