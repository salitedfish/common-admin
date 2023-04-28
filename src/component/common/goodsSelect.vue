<template>
  <n-button @click="() => (showModel = !showModel)" secondary type="primary" :disabled="disabled">请选择商品</n-button>
  <goodsSelectModal
    v-model:show-goods-select-modal="showModel"
    :goods-selected-list="goodsSelectedList"
    @update:goods-selected-list="updateGoodsSelectedList"
    :goodsType="goodsType"
    :goodsStates="goodsStates"
    :funcType="funcType"
    :max="max"
    :selectDisabled="selectDisabled"
  ></goodsSelectModal>
</template>

<script lang="ts">
// 框架
import { defineComponent, ref } from "vue";
// 组件库
// 自定义组件
import goodsSelectModal from "@/component/goodsSelectDialog/goodsSelectDialog.vue";

// 工具库
// 自定义工具
// 网络请求
// store
// 类型
import type { GoodsType } from "@/view/goodsManager/goodsListManager/goodsListManagerStore";
import type { GoodsFuncType } from "@/type/GoodsManager";
import type { GoodsState } from "@/view/goodsManager/goodsListManager/goodsListManagerStore";
// 组件名
export default defineComponent({
  name: "goodsSelect",
});
</script>

<script lang="ts" setup>
defineProps<{
  goodsSelectedList: { goodsId: string | number; goodsName: string }[];
  goodsType?: GoodsType;
  goodsStates?: GoodsState[];
  funcType?: GoodsFuncType;
  max?: number;
  disabled?: boolean;
  selectDisabled?: boolean;
}>();

const emit = defineEmits<{
  (event: "update:goodsSelectedList", value: { goodsId: string | number; goodsName: string }[]): void;
}>();
const updateGoodsSelectedList = (e: { goodsId: string | number; goodsName: string }[]) => {
  emit("update:goodsSelectedList", e);
};

const showModel = ref(false);
</script>

<style scoped lang="less"></style>
