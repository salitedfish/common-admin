<template>
  <div class="richEditorBox">
    <editor :init="tinymceInit" v-model="editValue" :disabled="disabled"></editor>
  </div>
</template>

<script lang="ts" setup>
// 框架
import { ref, watch, onMounted } from "vue";
// 组件库
import tinymce from "tinymce/tinymce";
import Editor from "@tinymce/tinymce-vue";
// 自定义组件
// 工具库
// 自定义工具
import "@/util/tinymceCH";
// 网络请求
import { uploadImg } from "@/request/common";
// store
// 类型

const props = withDefaults(
  defineProps<{
    modelValue: string;
    disabled: boolean;
    placeHolder?: string;
  }>(),
  {
    placeHolder: "编辑商品详情",
  }
);
const emit = defineEmits<{
  (event: "update:modelValue", value: string): void;
}>();

const editValue = ref(props.modelValue);
watch(
  () => props.modelValue,
  (newValue) => {
    editValue.value = newValue;
  }
);
watch(editValue, (newValue) => {
  emit("update:modelValue", newValue);
});

const tinymceInit = {
  selector: "#richTextEditor",
  menubar: false, // 隐藏菜单栏
  statusbar: false, // 隐藏底部状态栏
  skin_url: "/tinymce/skins/ui/oxide",
  content_css: "/tinymce/skins/content/default/content.css ",
  plugins: " wordcount quickbars paste insertdatetime image hr charmap table lists advlist",
  placeholder: props.placeHolder,
  width: 375,
  height: 750,
  language: "zh_CN",
  toolbar_mode: "none",
  object_resizing: false,
  toolbar:
    " fontselect fontsizeselect forecolor backcolor bold italic underline strikethrough charmap insertdatetime hr alignleft aligncenter alignright alignjustify  table numlist bullist wordcount ",

  images_upload_handler: async function (blobInfo: any, success: any) {
    const res = await uploadImg(blobInfo.blob());
    if (res) {
      success(res.data.fileUrl);
    }
  },
  content_style: "body, p {margin: 0; padding: 0} img {width: 100%; display: block}",
  resize: false, // 禁止改变大小
};

onMounted(() => {
  tinymce.init({});
});
</script>

<style scoped lang="less">
.richEditorBox {
  background-color: rgb(255, 255, 255);
}
</style>
