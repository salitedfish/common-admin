<template>
  <n-space>
    <n-input v-model:value="params.goodsId" autosize placeholder="请输入商品ID" style="width: 200px" :disabled="searching"></n-input>
    <n-input v-model:value="params.goodsName" autosize placeholder="请输入商品名称" style="width: 200px" :disabled="searching"></n-input>
    <n-input v-model:value="params.merchantUid" autosize placeholder="请输入商户编号" style="width: 200px" :disabled="searching" v-if="authStore.isAdmin()"></n-input>
    <n-select v-model:value="params.goodsState" :options="goodsStateList" placeholder="请选择商品状态" style="width: 200px" :disabled="searching" clearable />
    <n-select v-model:value="params.goodsType" :options="goodsTypeList" placeholder="请选择商品类型" style="width: 200px" :disabled="searching" clearable />
    <category-select v-model="categoryList" checkType="all" style="width: 200px"></category-select>
    <n-button type="primary" @click="searchHandler" :disabled="searching" :loading="searching">搜索 / 刷新</n-button>
    <whiteListTemplateDownload></whiteListTemplateDownload>
    <n-button type="primary" @click="gotoAddGoods" v-if="!authStore.isAdmin()">添加商品</n-button>
  </n-space>
</template>

<script lang="ts" setup>
// 框架
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
// 组件库
// 自定义组件
import whiteListTemplateDownload from "@/component/whiteList/whiteListTemplateDownload.vue";
import categorySelect from "@/component/common/categorySelect.vue";
// 工具库
// 自定义工具
// 网络请求
// store
import { useAuthStore } from "@/store/authStore";
import { goodsStateList, goodsTypeList } from "../goodsListManagerStore";
// 类型
import type { SearchParams } from "@/type/GoodsManager";
import type { CategoryTreeItem } from "@/type/Common";

const router = useRouter();
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

const gotoAddGoods = () => {
  router.push({
    name: "goodsAddManager",
  });
};
</script>

<style scoped lang="less"></style>
