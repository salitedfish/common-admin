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
  id: string;
  whiteListType: number;
}>();

const uploading = ref(false);

const triggerInputDom = () => {
  inputDom.value?.click();
};

const handleUploadWhiteList = async (event: Event) => {
  if (event.target) {
    uploading.value = true;
    const res = await uploadWhiteList({ id: props.id, file: (event.target as any).files[0] }, props.whiteListType);
    if (res) {
      commonNotify("success", "白名单上传成功");
    }
    if (inputDom.value) (inputDom.value as HTMLInputElement).value = "";
    uploading.value = false;
  }
};
</script>

<style scoped lang="less"></style>
