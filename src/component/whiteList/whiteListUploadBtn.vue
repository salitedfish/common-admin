<template>
  <input type="file" hidden ref="inputDom" accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" @change="handleUploadWhiteList" />
  <n-button @click="triggerInputDom" size="small" type="primary" secondary :disabled="uploading" :loading="uploading">上传白名单</n-button>
</template>

<script lang="ts" setup>
// 框架
import { ref } from "vue";
// 组件库
// 自定义组件
// 工具库
// 自定义工具
import { commonNotify } from "@/util/common";
// 网络请求
import { uploadWhiteList } from "@/request/common";
// store
// 类型

const inputDom = ref<HTMLInputElement | null>(null);

const props = defineProps<{
  goodsId: string;
  whiteListType: number;
}>();

const uploading = ref(false);

const triggerInputDom = () => {
  inputDom.value?.click();
};

const handleUploadWhiteList = async (event: any) => {
  uploading.value = true;
  const res = await uploadWhiteList({ goodsId: props.goodsId, file: event.target.files[0] }, props.whiteListType);
  if (res) {
    commonNotify("success", "白名单上传成功");
  }
  uploading.value = false;
};
</script>

<style scoped lang="less"></style>
