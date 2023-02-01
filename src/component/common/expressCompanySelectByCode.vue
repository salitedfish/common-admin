<template>
  <n-select
    :value="modelValue"
    @update:value="comfirmValue"
    clearable
    remote
    filterable
    :loading="loading"
    :options="list"
    placeholder="请选择物流公司，如果不确定可不选"
    :disabled="disabled"
  ></n-select>
</template>

<script lang="ts">
// 框架
import { defineComponent, ref, reactive, watch } from "vue";
// 组件库
// 自定义组件
// 工具库
import { useDebounce } from "@ultra-man/noa";
// 自定义工具
// 网络请求
import { getExpressCompanyListByCode } from "@/request/order";
// store
// 类型
// 组件名
export default defineComponent({
  name: "expressCompanySelectByCode",
});
</script>

<script lang="ts" setup>
const props = defineProps<{
  expressCode: string | null;
  modelValue: string | null;
  disabled?: boolean;
  expressName: string | null;
}>();
const emit = defineEmits<{
  (event: "update:modelValue", payload: string | null): void;
  (event: "update:expressName", payload: string | null): void;
}>();

// 组件自身的展示列表
const params = reactive({ expressCode: props.expressCode || "" });
const list = ref<{ label: string; value: string }[]>([]);
const loading = ref(false);

// 请求快递公司
const getExpressCompany = async (params: { expressCode: string }) => {
  loading.value = true;
  const res = await getExpressCompanyListByCode(params);
  loading.value = false;
  if (res.data) {
    return res.data.data;
  }
};

// 清空所有数据
const clear = () => {
  list.value = [];
  emit("update:modelValue", null);
  emit("update:expressName", null);
};

// 监听到快递单号改变时查询快递公司（500ms防抖）
watch(
  () => props.expressCode,
  useDebounce(async (newValue) => {
    params.expressCode = newValue;
    if (params.expressCode) {
      const listOrigin = await getExpressCompany(params);
      if (listOrigin) {
        list.value = listOrigin.map((item) => {
          return {
            label: item.expName,
            value: item.simpleName,
          };
        });
      } else {
        // 如果未查到快递公司则都要清空
        clear();
      }
    } else {
      // 如果用户清空快递单号,则都要清空
      clear();
    }
  }, 500)
);

const comfirmValue = (value: string | null, payload: { label: string; value: string }) => {
  emit("update:modelValue", value);
  emit("update:expressName", payload ? payload.label : null);
};
</script>

<style scoped lang="less"></style>
