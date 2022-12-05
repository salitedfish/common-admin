<template>
  <n-space>
    <n-input v-model:value="params.phone" autosize placeholder="请输入手机号" style="width: 200px" :disabled="searching"></n-input>
    <n-input v-model:value="params.uid" autosize placeholder="请输入编号" style="width: 200px" :disabled="searching"></n-input>
    <n-button type="primary" @click="searchHandler" :disabled="searching" :loading="searching">搜索/刷新</n-button>
    <n-button @click="handleDownloadWhiteList" type="primary" :disabled="downloading" :loading="downloading">导出名单</n-button>
  </n-space>
</template>

<script lang="ts" setup>
// 框架
import { reactive, ref } from "vue";
// 组件库
// 自定义组件
import { useBinaryToURL, useDownloadByURL } from "@ultra-man/noa";
// 自定义工具
import { commonNotify } from "@/util/common";
// 网络请求

// store
// 类型
import type { WhiteListSearchParams } from "@/type/Common";

const props = defineProps<{
  searching: boolean;
  id: string;
  name: string;
  downLoadRequest: (params: { id: string }, whiteListType: number) => Promise<Blob>;
  whiteListType: number;
}>();

const emit = defineEmits<{
  (event: "submitSearch", params: WhiteListSearchParams): void;
}>();

const params = reactive<WhiteListSearchParams>({
  phone: "",
  uid: "",
});

const searchHandler = () => {
  emit("submitSearch", params);
};

const downloading = ref(false);
const handleDownloadWhiteList = async () => {
  downloading.value = true;
  const res = await props.downLoadRequest({ id: props.id }, props.whiteListType);
  if (res) {
    const url = useBinaryToURL(res);
    if (url) {
      useDownloadByURL(url)(`${props.name}`);
      commonNotify("success", "名单获取成功");
    }
  }
  downloading.value = false;
};
</script>

<style scoped lang="less"></style>
