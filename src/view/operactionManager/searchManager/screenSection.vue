<template>
  <n-space>
    <n-button type="primary" @click="searchHandler" :disabled="searching" :loading="searching">搜索 / 刷新</n-button>
    <n-button type="primary" @click="addKeyword">添加关键字</n-button>
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
// 类型

const router = useRouter();

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

const addKeyword = () => {
  router.push({
    name: "addSearchKeywords",
  });
};
</script>

<style scoped lang="less"></style>
