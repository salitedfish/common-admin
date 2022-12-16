<template>
  <n-select
    @update:value="comfirmValue"
    @search="search"
    clearable
    remote
    filterable
    :loading="loading"
    :options="list"
    placeholder="请输入物流名称搜索"
    @scroll="scroll"
    :disabled="disabled"
  ></n-select>
</template>

<script lang="ts" setup>
// 框架
import { reactive, ref, onMounted } from "vue";
// 组件库
// 自定义组件
import { getExpressCompanyList as getExpressCompanyListRequest } from "@/request/order";
// 工具库
// 自定义工具
// 网络请求
// store
// 类型

defineProps<{
  modelValue: string;
  disabled?: boolean;
}>();
const emit = defineEmits<{
  (event: "update:modelValue", payload: string): void;
}>();

const params = reactive({ page: 1, size: 10, name: "" });
const list = ref<{ label: string; value: string }[]>([]);
const loading = ref(false);

const search = async (searchName: string) => {
  list.value = [];
  params.page = 1;
  params.name = searchName;
  await request();
};

const scroll = async (e: Event) => {
  const currentTarget = e.currentTarget as HTMLElement;
  if (currentTarget.scrollTop + currentTarget.offsetHeight >= currentTarget.scrollHeight) {
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

const comfirmValue = (value: string) => {
  emit("update:modelValue", value);
};

onMounted(() => {
  request();
});
</script>

<style scoped lang="less"></style>
