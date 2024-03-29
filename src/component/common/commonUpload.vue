<template>
  <section>
    <input ref="inputDom" type="file" :accept="typeInfo.acceptType" hidden @change="handleUpload" />
    <n-space v-if="type === 'img'">
      <n-dropdown trigger="hover" :options="options" @select="(key: string | number) => handleSelect(key, index)" v-for="(item, index) in fileList" :key="index">
        <n-image :src="item.fileUrl" width="100" height="100"></n-image>
      </n-dropdown>
      <n-button @click="handleClick" v-if="fileList.length < max" :loading="uploading" :disabled="disabled || uploading" style="width: 100px; height: 100px" dashed>上传</n-button>
    </n-space>
    <n-space v-if="type === 'video'">
      <n-dropdown
        trigger="hover"
        :options="options"
        @select="(key: string | number) => handleSelect(key, index)"
        v-for="(item, index) in fileList"
        :key="index"
        :disabled="disabled"
      >
        <video :src="item.fileUrl" width="200" height="200" controls></video>
      </n-dropdown>
      <n-button @click="handleClick" v-if="fileList.length < max" :loading="uploading" :disabled="disabled || uploading" style="width: 200px; height: 200px" dashed>上传</n-button>
    </n-space>
    <n-space v-if="type === 'file'">
      <n-dropdown
        trigger="hover"
        :options="options"
        @select="(key: string | number) => handleSelect(key, index)"
        v-for="(item, index) in fileList"
        :key="index"
        :disabled="disabled"
      >
        <custom-icon :size="30" name="ruanjiankaifabao"></custom-icon>
      </n-dropdown>
      <n-button @click="handleClick" v-if="fileList.length < max" :loading="uploading" :disabled="disabled || uploading" style="width: 80px; height: 34px" dashed>上传</n-button>
    </n-space>
    <section class="upload-tip">
      <span v-if="typeInfo.tipType">{{ `上传文件类型为：${typeInfo.tipType}；` }}</span>
      <span v-if="maxSize">{{ `上传文件最大为：${maxSize}mb` }}</span>
    </section>
  </section>
</template>

<script lang="ts" setup>
// 框架
import { computed, ref } from "vue";
// 组件库
// 自定义组件
import customIcon from "./customIcon.vue";
// 工具库
// 自定义工具
import { commonNotify } from "@/util/common";
// 网络请求
import { uploadImg, uploadVideo, uploadApp } from "@/request/common";
// store
// 类型
import type { FileUpload } from "@/type/Common";

const props = defineProps<{
  modelValue: FileUpload[];
  type: keyof typeof typeMapMethod;
  max: number;
  disabled?: boolean;
}>();

const typeMapMethod = {
  video: {
    method: uploadVideo,
    acceptType: "video/mp4",
    tipType: "mp4",
    maxSize: 0,
  },
  img: {
    method: uploadImg,
    acceptType: "image/png, image/jpeg, image/jpg, image/gif",
    tipType: "png、 jpeg、jpg、gif",
    maxSize: 3,
  },

  file: {
    method: uploadApp,
    acceptType: "application/vnd.android.package-archive",
    tipType: "apk",
    maxSize: 0,
  },
};
const typeInfo = typeMapMethod[props.type];
const maxSize = typeInfo.maxSize;

const emit = defineEmits<{
  (name: "update:modelValue", payload: FileUpload[]): void;
}>();

const inputDom = ref<HTMLInputElement | null>(null);

const fileList = computed(() => {
  return props.modelValue;
});
const uploading = ref(false);

const handleClick = () => {
  inputDom.value?.click();
};
const handleUpload = async (event: any) => {
  const file = event.target?.files[0];
  if (file) {
    if (maxSize && file.size > maxSize * 1024 * 1024) {
      commonNotify("warning", `文件不能超过${maxSize}mb`);
      return;
    } else {
      uploading.value = true;
      try {
        const res = await typeInfo.method(file);
        if (res) {
          handleRes(res);
        }
        uploading.value = false;
        if (inputDom.value) (inputDom.value as HTMLInputElement).value = "";
      } catch (error) {
        uploading.value = false;
        if (inputDom.value) (inputDom.value as HTMLInputElement).value = "";
      }
    }
  }
};
const handleRes = (res: { code: number; data: FileUpload }) => {
  fileList.value.push(res.data);
  emit("update:modelValue", fileList.value);
};

// 弹出的选项
enum Options {
  DELETE = 0,
}
const options = [
  {
    label: "删除",
    key: Options.DELETE,
    disabled: props.disabled,
  },
];
const handleSelect = async (key: string | number, index: number) => {
  if (key === Options.DELETE) {
    fileList.value.splice(index, 1);
    emit("update:modelValue", fileList.value);
  }
};
</script>

<style scoped lang="less">
.upload-tip {
  margin-top: 5px;
  color: var(--font-color-danger);
}
</style>
