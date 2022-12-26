<template>
  <n-button type="primary" @click="exportHandler" :disabled="exporting" :loading="exporting">导出列表</n-button>
</template>

<script lang="ts">
// 框架
import { defineComponent, ref } from "vue";
// 组件库
import { useBinaryToURL, useDownloadByURL } from "@ultra-man/noa";
// 自定义组件
// 工具库
// 自定义工具
import { commonNotify } from "@/util/common";
// 网络请求
// store
// 类型
// 组件名
export default defineComponent({
  name: "customExportBtn",
});
</script>

<script lang="ts" setup>
const props = defineProps<{
  exportParams: Record<string, unknown>;
  exportRequest: (params: Record<string, unknown>) => Promise<Blob>;
  fileName?: string;
}>();

const exporting = ref(false);
const exportHandler = async () => {
  exporting.value = true;
  // 后端接口不支持null的值，这里再筛选一下
  const params: Record<string, unknown> = {};
  for (const key in props.exportParams) {
    if (props.exportParams[key] !== null) {
      params[key] = props.exportParams[key];
    }
  }
  const res = await props.exportRequest(params);
  if (res) {
    const url = useBinaryToURL(res);
    if (url) {
      useDownloadByURL(url)(props.fileName || "列表文件");
      commonNotify("success", "导出成功");
    }
  }
  exporting.value = false;
};
</script>

<style scoped lang="less"></style>
