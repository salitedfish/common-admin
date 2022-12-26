<template>
  <n-space>
    <n-input v-model:value="params.uid" autosize placeholder="请输入用户编号" style="width: 200px" :disabled="searching" clearable></n-input>
    <n-select v-model:value="params.invoiceState" :options="invoiceStateList" placeholder="请选择开票状态" style="width: 200px" :disabled="searching" clearable />

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
    <custom-export-btn :export-params="params" :export-request="exportInvoiceList" file-name="发票"></custom-export-btn>
  </n-space>
</template>

<script lang="ts" setup>
// 框架
import { reactive } from "vue";
// 组件库
// 自定义组件
import customExportBtn from "@/component/common/customExportBtn.vue";

// 工具库
// 自定义工具
// 网络请求
import { exportInvoiceList } from "@/request/order";

// store
import { invoiceStateList } from "./invoiceListManagerStore";
// 类型
import type { InvoiceListParam } from "@/type/Order";

defineProps<{
  searching: boolean;
}>();

const emit = defineEmits<{
  (event: "submitSearch", params: InvoiceListParam): void;
}>();

const params = reactive<InvoiceListParam>({});

const searchHandler = () => {
  emit("submitSearch", params);
};
</script>

<style scoped lang="less"></style>
