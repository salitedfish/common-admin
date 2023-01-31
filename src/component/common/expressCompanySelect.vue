<template>
  <n-select
    v-model:value="selectValue"
    @update:value="comfirmValue"
    @search="search"
    clearable
    remote
    filterable
    :loading="loading"
    :options="list"
    placeholder="请输入物流名称搜索，如果不确定可不填"
    @scroll="scroll"
    :disabled="disabled"
  ></n-select>
</template>

<script lang="ts" setup>
// 框架
import { reactive, ref, onMounted, watch } from "vue";
// 组件库
// 自定义组件
import { getExpressCompanyList as getExpressCompanyListRequest } from "@/request/order";
// 工具库
import { useDebounce } from "@ultra-man/noa";
// 自定义工具
// 网络请求
// store
// 类型

const props = defineProps<{
  modelValue: string | null;
  disabled?: boolean;
  expressName: string | null;
}>();
const emit = defineEmits<{
  (event: "update:modelValue", payload: string): void;
  (event: "update:expressName", payload: string): void;
}>();

// 组件自身保存的value
const selectValue = ref<string | null>(null);
watch(
  () => props.modelValue,
  (newValue) => {
    selectValue.value = newValue;
  }
);
// 组件自身的展示列表
const params = reactive({ page: 1, size: 10, name: "" });
const list = ref<{ label: string; value: string }[]>([]);
const loading = ref(false);

const search = useDebounce(async (searchName: string) => {
  list.value = [];
  params.page = 1;
  params.name = searchName;
  await request();
}, 500);

const scroll = async (e: Event) => {
  const currentTarget = e.currentTarget as HTMLElement;
  if (Math.ceil(currentTarget.scrollTop) + Math.ceil(currentTarget.offsetHeight) >= Math.floor(currentTarget.scrollHeight)) {
    params.page = params.page + 1;
    await request();
  }
};

const request = async () => {
  loading.value = true;
  const res = await getExpressCompanyListRequest(params);
  if (res) {
    for (const item of res.data.expressList) {
      list.value.push({
        label: item.expName,
        value: item.simpleName,
      });
    }
  }
  loading.value = false;
};

const comfirmValue = (value: string, { label }: { label: string }) => {
  emit("update:modelValue", value);
  emit("update:expressName", label);
};

onMounted(() => {
  request();
});
</script>

<style scoped lang="less"></style>
