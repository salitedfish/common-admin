<template>
  <n-space>
    <n-input v-model:value="params.merchantUid" autosize placeholder="请输入商户编号" style="width: 200px" :disabled="searching" v-if="authStore.isAdmin" clearable></n-input>
    <n-input v-model:value="params.uid" autosize placeholder="请输入用户编号" style="width: 200px" :disabled="searching" clearable></n-input>
    <n-input v-model:value="params.orderId" autosize placeholder="请输入订单编号" style="width: 200px" :disabled="searching" clearable></n-input>
    <n-input v-model:value="params.goodsId" autosize placeholder="请输入商品编号" style="width: 200px" :disabled="searching" clearable></n-input>
    <n-input v-model:value="params.goodsName" autosize placeholder="请输入商品名称" style="width: 200px" :disabled="searching" clearable></n-input>
    <n-select v-model:value="params.orderState" :options="expressOrderStateList" placeholder="请选择订单状态" style="width: 200px" :disabled="searching" clearable />
    <category-select v-model="categoryList" checkType="all" style="width: 200px"></category-select>
    <n-date-picker
      placeholder="请选择开始时间"
      v-model:formatted-value="params.startTime"
      value-format="yyyy-MM-dd HH:mm:ss"
      type="datetime"
      style="width: 200px"
      clearable
      :disabled="searching"
    />
    <n-date-picker
      placeholder="请选择结束时间"
      v-model:formatted-value="params.endTime"
      value-format="yyyy-MM-dd HH:mm:ss"
      type="datetime"
      style="width: 200px"
      clearable
      :disabled="searching"
    />
    <n-button type="primary" @click="searchHandler" :disabled="searching" :loading="searching">搜索 / 刷新</n-button>
    <custom-export-btn :export-params="params" :export-request="exportExpressOrderList" file-name="发货订单"></custom-export-btn>
  </n-space>
</template>

<script lang="ts" setup>
// 框架
import { reactive, ref } from "vue";
// 组件库
// 自定义组件
import categorySelect from "@/component/common/categorySelect.vue";
import customExportBtn from "@/component/common/customExportBtn.vue";

// 工具库
// 自定义工具
// 网络请求
import { exportExpressOrderList } from "@/request/order";

// store
import { useAuthStore } from "@/store/authStore";
import { expressOrderStateList } from "./expressListManagerStore";
// 类型
import type { ExpressOrderListParam } from "@/type/Order";
import type { CategoryTreeItem } from "@/type/Common";

const authStore = useAuthStore();

defineProps<{
  searching: boolean;
}>();

const emit = defineEmits<{
  (event: "submitSearch", params: ExpressOrderListParam): void;
}>();

const categoryList = ref<CategoryTreeItem[]>([]);
const params = reactive<ExpressOrderListParam>({});

const searchHandler = () => {
  if (categoryList.value.length >= 1) {
    params.classify = categoryList.value[categoryList.value.length - 1].id;
  } else {
    params.classify = undefined;
  }

  emit("submitSearch", params);
};
</script>

<style scoped lang="less"></style>
