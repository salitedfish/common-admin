<template>
  <n-space>
    <app-channel-select v-model="params.channel" :searching="searching"></app-channel-select>
    <n-select :options="versionStateList" v-model:value="params.state" placeholder="请选择版本状态" clearable :disabled="searching" style="width: 200px"></n-select>
    <n-button type="primary" @click="searchHandler" :disabled="searching" :loading="searching">搜索 / 刷新</n-button>
    <n-button type="primary" @click="addVersion">更新版本</n-button>
  </n-space>
</template>

<script lang="ts" setup>
// 框架
import { reactive } from "vue";
import { useRouter } from "vue-router";
// 组件库
// 自定义组件
import appChannelSelect from "@/component/common/appChannelSelect.vue";
// 工具库
// 自定义工具
// 网络请求
// store
import { versionStateList } from "./systemVersionManagerStore";
// 类型
import type { SystemVersionListParams } from "@/type/System";

const router = useRouter();

defineProps<{
  searching: boolean;
}>();

const emit = defineEmits<{
  (event: "submitSearch", params: SystemVersionListParams): void;
}>();

const params = reactive<SystemVersionListParams>({});

const addVersion = () => {
  router.push({
    name: "addSystemVersion",
  });
};

const searchHandler = () => {
  emit("submitSearch", params);
};
</script>

<style scoped lang="less"></style>
