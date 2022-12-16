<template>
  <n-form label-placement="left" label-width="120px" label-align="left">
    <n-card title="公告信息：">
      <n-form-item label="公告标题：">
        <n-input v-model:value="bulletinBoardInfo.title" placeholder="请输入公告标题" :disabled="isCheck || submiting"></n-input>
      </n-form-item>

      <n-form-item label="公告封面">
        <common-upload type="img" v-model="coverList" :max="1" :disabled="isCheck || submiting"></common-upload>
      </n-form-item>

      <n-form-item label="公告概述：">
        <n-input v-model:value="bulletinBoardInfo.summary" placeholder="请输入公告概述" :disabled="isCheck || submiting"></n-input>
      </n-form-item>

      <n-form-item label="公告内容：">
        <rich-text-editor v-model="bulletinBoardInfo.content" placeHolder="编辑公告内容" :disabled="isCheck || submiting"></rich-text-editor>
      </n-form-item>

      <n-form-item label="公告类目:">
        <category-select
          v-model="classify"
          :default-value="bulletinBoardInfo.classifies[bulletinBoardInfo.classifies.length - 1]"
          :type="CategoryType.NOTICE"
          :disabled="isCheck || submiting"
        ></category-select>
      </n-form-item>

      <n-form-item label="公告类型">
        <n-select v-model:value="bulletinBoardInfo.type" :options="bulletinBoardTypeList" placeholder="请选择公告类型" :disabled="isCheck || submiting"></n-select>
      </n-form-item>
    </n-card>
  </n-form>

  <n-button type="primary" @click="submitHandler" block style="margin-top: 15px" v-if="!isCheck" :loading="submiting" :disabled="isCheck || submiting">确认提交</n-button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "addBulletinBoard",
});
</script>
<script lang="ts" setup>
// 框架
import { computed, reactive, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
// 组件库
import { useFileNameFromURL } from "@ultra-man/noa";
// 自定义组件
import richTextEditor from "@/component/common/richTextEditor.vue";
import categorySelect from "@/component/common/categorySelect.vue";
import commonUpload from "@/component/common/commonUpload.vue";
// 工具库
// 自定义工具
import { commonNotify } from "@/util/common";
// 网络请求
import { addEditBulletinBoard, getBulletinBoard } from "@/request/operator";
// store
import { CategoryType } from "@/type/Common";
import { useCommonStore } from "@/store/commonStore";
import { useRouteStore } from "@/store/routeStore";
import { bulletinBoardTypeList } from "../bulletinBoardManager/bulletinBoardManagerStore";
// 类型
import type { AddBulletinBoard } from "@/type/Operator";
import type { CategoryTreeItem, FileUpload } from "@/type/Common";

const route = useRoute();
const router = useRouter();
const routeStore = useRouteStore();
const commonStore = useCommonStore();
const isEdit = computed(() => {
  return route.name === "editBulletinBoard";
});
const isCheck = computed(() => {
  return route.name === "checkBulletinBoard";
});
const id = computed(() => {
  return (route.query.id as string) || "";
});

const classify = ref<CategoryTreeItem[]>([]);
const coverList = ref<FileUpload[]>([]);
const bulletinBoardInfo = reactive<AddBulletinBoard>({
  classifies: [],
  content: "",
  cover: "",
  id: id.value,
  summary: "",
  title: "",
  type: null,
});

const submiting = ref(false);
const submitHandler = async () => {
  if (coverList.value.length <= 0) {
    commonNotify("warning", "请上传公告背景图片");
    return;
  }
  if (classify.value.length > 0) {
    bulletinBoardInfo.classifies = classify.value.map((item) => item.id);
  }
  bulletinBoardInfo.cover = coverList.value[0].hashName;
  submiting.value = true;
  const res = await addEditBulletinBoard(bulletinBoardInfo);
  if (res) {
    commonNotify("success", "公告提交成功");
    routeStore.deleteCurrentRoute();
    router.push({
      name: "bulletinBoardManager",
    });
  }
  submiting.value = false;
};

onMounted(() => {
  if (isCheck.value || isEdit.value) {
    initForm();
  }
});

const initForm = async () => {
  commonStore.pageLoading = true;
  const res = await getBulletinBoard({ id: id.value });
  if (res) {
    const { classifies, content, cover, type, summary, title } = res.data;
    bulletinBoardInfo.content = content;
    bulletinBoardInfo.type = type;
    bulletinBoardInfo.summary = summary;
    bulletinBoardInfo.title = title;
    bulletinBoardInfo.classifies = classifies;
    coverList.value = [
      {
        fileUrl: cover,
        hashName: useFileNameFromURL(cover)(true),
      },
    ];
  }
  commonStore.pageLoading = false;
};
</script>

<style scoped lang="less"></style>
