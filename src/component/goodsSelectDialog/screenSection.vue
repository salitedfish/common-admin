<template>
  <n-space>
    <n-input v-model:value="params.goodsId" autosize placeholder="请输入商品ID" style="width: 200px" :disabled="searching" clearable></n-input>
    <n-input v-model:value="params.goodsName" autosize placeholder="请输入商品名称" style="width: 200px" :disabled="searching" clearable></n-input>
    <n-input v-model:value="params.merchantUid" autosize placeholder="请输入商户编号" style="width: 200px" :disabled="searching" v-if="authStore.isAdmin()" clearable></n-input>
    <category-select v-model="categoryList" checkType="all" style="width: 200px"></category-select>
    <n-button type="primary" @click="searchHandler" :disabled="searching" :loading="searching">搜索 / 刷新</n-button>
  </n-space>
</template>

<script lang="ts" setup>
// 框架
import { reactive, ref } from "vue";
// 组件库
// 自定义组件
import categorySelect from "@/component/common/categorySelect.vue";
// 工具库
// 自定义工具
// 网络请求
// store
import { useAuthStore } from "@/store/authStore";
// 类型
import type { SearchParams } from "@/type/GoodsManager";
import type { CategoryTreeItem } from "@/type/Common";

const authStore = useAuthStore();

defineProps<{
  searching: boolean;
}>();

const emit = defineEmits<{
  (event: "submitSearch", params: SearchParams): void;
}>();

const categoryList = ref<CategoryTreeItem[]>([]);
const params = reactive<SearchParams>({
  goodsId: "",
  goodsName: "",
  merchantUid: "",
});

const searchHandler = () => {
  if (categoryList.value.length >= 1) {
    params.classify = categoryList.value[categoryList.value.length - 1].id;
  } else {
    params.classify = undefined;
  }

  emit("submitSearch", params);
};
</script>

<style scoped lang="less"></style>
