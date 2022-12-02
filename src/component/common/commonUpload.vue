<template>
  <input ref="inputDom" type="file" :accept="acceptType" hidden @change="handleUpload" />
  <n-space v-if="type === 'img'">
    <n-dropdown trigger="hover" :options="options" @select="(key: string | number) => handleSelect(key, index)" v-for="(item, index) in fileList" :key="index">
      <n-image :src="item.fileUrl" width="100" height="100"></n-image>
    </n-dropdown>
    <n-button @click="handleClick" v-if="fileList.length < max" :loading="uploading" :disabled="disabled || uploading" style="width: 100px; height: 100px" dashed>上传</n-button>
  </n-space>
  <n-space v-if="type === 'video'">
    <n-dropdown trigger="hover" :options="options" @select="(key: string | number) => handleSelect(key, index)" v-for="(item, index) in fileList" :key="index" :disabled="disabled">
      <video :src="item.fileUrl" width="200" height="200" controls></video>
    </n-dropdown>
    <n-button @click="handleClick" v-if="fileList.length < max" :loading="uploading" :disabled="disabled || uploading" style="width: 200px; height: 200px" dashed>上传</n-button>
  </n-space>
</template>

<script lang="ts" setup>
// 框架
import { computed, ref } from "vue";
// 组件库
// 自定义组件
// 工具库
// 自定义工具
// 网络请求
import { uploadImg, uploadVideo } from "@/request/common";
// store
// 类型
import type { FileUpload } from "@/type/Common";

const props = defineProps<{
  modelValue: FileUpload[];
  type: "img" | "video";
  max: number;
  disabled?: boolean;
}>();

const emit = defineEmits<{
  (name: "update:modelValue", payload: FileUpload[]): void;
}>();

const acceptType = computed(() => {
  if (props.type === "video") {
    return "video/mp4";
  } else {
    return "image/png, image/jpeg";
  }
});

const inputDom = ref<HTMLInputElement | null>(null);

const fileList = computed(() => {
  return props.modelValue;
});
const uploading = ref(false);

enum Options {
  DELETE = 0,
}

// 弹出的选项
const options = [
  {
    label: "删除",
    key: Options.DELETE,
    disabled: props.disabled,
  },
];

const handleClick = () => {
  inputDom.value?.click();
};
const handleUpload = async (event: any) => {
  const file = event.target?.files[0];
  if (file) {
    uploading.value = true;
    try {
      if (props.type === "video") {
        const res = await uploadVideo(file);
        handleRes(res);
      } else {
        const res = await uploadImg(file);
        handleRes(res);
      }
      uploading.value = false;
    } catch (error) {
      uploading.value = false;
    }
  }
};
const handleRes = (res: { code: number; data: FileUpload }) => {
  if (res && res.code === 0) {
    fileList.value.push(res.data);
    emit("update:modelValue", fileList.value);
  }
};
const handleSelect = async (key: string | number, index: number) => {
  if (key === Options.DELETE) {
    fileList.value.splice(index, 1);
    emit("update:modelValue", fileList.value);
  }
};
</script>

<style scoped lang="less"></style>
