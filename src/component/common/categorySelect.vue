<template>
  <n-cascader
    v-model:value="value"
    @update:value="selectCategory"
    placeholder="请选择类目"
    :options="selectTree"
    :check-strategy="checkType"
    children-field="child"
    value-field="id"
    label-field="name"
    :disabled="disabled || searching"
    :clearable="true"
    :multiple="multiple"
    :showPath="showPath"
    :cascade="cascade"
  />
</template>

<script lang="ts" setup>
// 框架
import { onMounted, ref, watch } from "vue";
// 组件库
// 自定义组件
// 工具库
// 自定义工具
// 网络请求
import { getCategoryTree as getCategoryTreeRequest } from "@/request/common";
// store
// 类型
import { CategoryType as CategoryTypeValue } from "@/type/Common";
import type { CategoryType, CategoryTreeItem } from "@/type/Common";

const props = withDefaults(
  defineProps<{
    defaultValue?: number;
    type?: CategoryType;
    modelValue: Partial<CategoryTreeItem>[];
    checkType?: "all" | "child";
    disabled?: boolean;
    multiple?: boolean;
    showPath?: boolean;
    cascade?: boolean;
  }>(),
  {
    type: CategoryTypeValue.GOODS,
    checkType: "child",
    showPath: true,
  }
);

const emit = defineEmits<{
  (event: "update:modelValue", value: CategoryTreeItem[]): void;
}>();

const selectTree = ref<CategoryTreeItem[]>([]);

// 保存选中的值，默认值由外部传入
const value = ref(props.defaultValue);
watch(
  () => props.defaultValue,
  (newValue) => {
    value.value = newValue;
  }
);

//
const searching = ref(false);

// 获取类目(0: 商品， 1: 公告)
const getCategoryTree = async () => {
  searching.value = true;
  const res = await getCategoryTreeRequest(props.type);
  if (res) {
    selectTree.value = res.data;
  }
  searching.value = false;
};

// 选择的值更新后反射出去
const selectCategory = (categoryId: number, category: CategoryTreeItem, categoryList: CategoryTreeItem[]) => {
  emit("update:modelValue", categoryList || []);
};
onMounted(() => {
  getCategoryTree();
});
</script>

<style scoped lang="less"></style>
