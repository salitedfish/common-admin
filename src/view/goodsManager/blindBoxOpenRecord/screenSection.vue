<template>
  <n-space>
    <n-input v-model:value="params.uid" autosize placeholder="请输入uid" style="width: 200px" :disabled="searching" clearable></n-input>
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
// 类型

defineProps<{
  searching: boolean;
}>();

const emit = defineEmits<{
  (event: "submitSearch", params: { uid: string }): void;
}>();

const params = reactive({
  uid: "",
});

const searchHandler = () => {
  emit("submitSearch", params);
};
</script>

<style scoped lang="less"></style>
