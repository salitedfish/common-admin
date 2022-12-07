<template>
  <n-button type="primary" @click="downLoadWhiteListTemplate" :loading="downloading">白名单模板下载</n-button>
</template>

<script lang="ts" setup>
// 框架
import { ref } from "vue";
// 组件库
// 自定义组件
// 工具库
import { useBinaryToURL, useDownloadByURL } from "@ultra-man/noa";
// 自定义工具
import { commonNotify } from "@/util/common";
// 网络请求
import { downLoadWhiteListTemplate as downLoadWhiteListTemplateRequest } from "@/request/common";
// store
// 类型

const downloading = ref(false);
const downLoadWhiteListTemplate = async () => {
  downloading.value = true;
  const res = await downLoadWhiteListTemplateRequest();
  if (res) {
    const url = useBinaryToURL(res);
    if (url) {
      useDownloadByURL(url)("白名单模板");
      commonNotify("success", "白名单模板获取成功");
    }
  }
  downloading.value = false;
};
</script>

<style scoped lang="less"></style>
