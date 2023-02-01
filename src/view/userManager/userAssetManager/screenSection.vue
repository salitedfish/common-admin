<template>
  <n-space>
    <n-input v-model:value="params.uid" autosize placeholder="请输入用户编号" style="width: 200px" :disabled="searching" clearable></n-input>
    <n-input v-model:value="params.token" autosize placeholder="请输入token" style="width: 200px" :disabled="searching" clearable></n-input>
    <n-input v-model:value="params.goodsId" autosize placeholder="请输入商品编号" style="width: 200px" :disabled="searching" clearable></n-input>
    <n-input v-model:value="params.goodsName" autosize placeholder="请输入商品名称" style="width: 200px" :disabled="searching" clearable></n-input>
    <n-select v-model:value="params.goodsType" :options="goodsTypeList" placeholder="请选择商品类型" style="width: 200px" :disabled="searching" clearable />
    <n-select v-model:value="params.freezeType" :options="freezeTypeList" placeholder="请选择冻结原因" style="width: 200px" :disabled="searching" clearable />
    <category-select v-model="categoryList" checkType="child" style="width: 200px"></category-select>
    <n-button type="primary" @click="searchHandler" :disabled="searching" :loading="searching">搜索 / 刷新</n-button>
    <custom-export-btn :export-params="params" :export-request="exportUserAssestList" file-name="用户资产"></custom-export-btn>
  </n-space>
</template>

<script lang="ts" setup>
// 框架
import { reactive, ref } from "vue";
// 组件库
// 自定义组件
import categorySelect from "@/component/common/categorySelect.vue";
import customExportBtn from "@/component/common/customExportBtn.vue";

// 工具库
// 自定义工具
// 网络请求
import { exportUserAssestList } from "@/request/user";
// store
import { freezeTypeList } from "./userAssetsManagerStore";
import { goodsTypeList } from "@/view/goodsManager/goodsListManager/goodsListManagerStore";
// 类型
import type { GetUserAssetsListParams } from "@/type/User";
import type { CategoryTreeItem } from "@/type/Common";

defineProps<{
  searching: boolean;
}>();

const categoryList = ref<CategoryTreeItem[]>([]);

const emit = defineEmits<{
  (event: "submitSearch", params: GetUserAssetsListParams): void;
}>();

const params = reactive<GetUserAssetsListParams>({});

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
