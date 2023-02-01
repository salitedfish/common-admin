<template>
  <n-space>
    <n-input
      v-model:value="params.merchantUid"
      autosize
      placeholder="请输入商户编号, 0表示平台"
      v-if="authStore.isAdmin"
      style="width: 220px"
      :disabled="searching"
      clearable
    ></n-input>
    <n-select v-model:value="params.type" :options="bulletinBoardTypeList" placeholder="请选择公告类型" style="width: 200px" :disabled="searching" clearable />
    <n-input v-model:value="params.title" autosize placeholder="请输入公告标题" style="width: 200px" :disabled="searching" clearable></n-input>
    <n-select v-model:value="params.state" :options="bulletinBoardStateList" placeholder="请选择公告状态" style="width: 200px" :disabled="searching" clearable />
    <n-select v-model:value="params.topState" :options="bulletinBoardTopStateList" placeholder="请选择公告置顶状态" style="width: 200px" :disabled="searching" clearable />
    <category-select v-model="categoryList" checkType="all" style="width: 200px" :type="CategoryType.NOTICE"></category-select>
    <n-button type="primary" @click="searchHandler" :disabled="searching" :loading="searching">搜索 / 刷新</n-button>
    <n-button type="primary" @click="addBulletinBoard">添加公告</n-button>
  </n-space>
</template>

<script lang="ts" setup>
// 框架
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
// 组件库
// 自定义组件
import categorySelect from "@/component/common/categorySelect.vue";
// 工具库
// 自定义工具
// 网络请求
// store
import { bulletinBoardStateList, bulletinBoardTopStateList, bulletinBoardTypeList } from "./bulletinBoardManagerStore";
import { useAuthStore } from "@/store/authStore";
import { CategoryType } from "@/type/Common";
// 类型
import type { BulletinBoardListParams } from "@/type/Operator";
import type { CategoryTreeItem } from "@/type/Common";

const authStore = useAuthStore();
const router = useRouter();

defineProps<{
  searching: boolean;
}>();

const emit = defineEmits<{
  (event: "submitSearch", params: BulletinBoardListParams): void;
}>();

const categoryList = ref<CategoryTreeItem[]>([]);
const params = reactive<BulletinBoardListParams>({});

const addBulletinBoard = () => {
  router.push({
    name: "addBulletinBoard",
  });
};

const searchHandler = () => {
  if (categoryList.value.length >= 1) {
    params.classify = categoryList.value[categoryList.value.length - 1].id;
  } else {
    Reflect.deleteProperty(params, "classify");
  }
  emit("submitSearch", params);
};
</script>

<style scoped lang="less"></style>
