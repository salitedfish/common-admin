<template>
  <n-space>
    <n-button type="primary" @click="searchHandler" :disabled="searching" :loading="searching">搜索 / 刷新</n-button>
    <n-button type="primary" @click="apply" :disabled="applying || searching" :loading="applying">应用系统配置</n-button>
  </n-space>
</template>

<script lang="ts" setup>
// 框架
import { reactive, ref } from "vue";
// 组件库
// 自定义组件
// 工具库
// 自定义工具
import { commonNotify } from "@/util/common";
// 网络请求
import { applySystemConfig } from "@/request/system";
// store
// 类型

defineProps<{
  searching: boolean;
}>();

const emit = defineEmits<{
  (event: "submitSearch", params: Record<string, unknown>): void;
}>();

const params = reactive<Record<string, unknown>>({});

const searchHandler = () => {
  emit("submitSearch", params);
};
const applying = ref(false);
const apply = async () => {
  applying.value = true;
  const res = await applySystemConfig();
  if (res) {
    commonNotify("success", "系统配置应用成功");
    searchHandler();
  }
  applying.value = false;
};
</script>

<style scoped lang="less"></style>
