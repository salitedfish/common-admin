<template>
  <n-select
    :value="modelValue"
    :options="channelList"
    :placeholder="placeholder || '请选择版本渠道'"
    :style="style"
    @update:value="valueChange"
    :disabled="disabled || searching"
    :clearable="true"
    :filterable="createable"
    tag
  ></n-select>
</template>

<script lang="ts" setup>
// 框架
import { onMounted, ref } from "vue";
// 组件库
// 自定义组件
// 工具库
// 自定义工具
// 网络请求
import { getChannelList } from "@/request/system";
// store
// 类型

const props = defineProps<{
  modelValue?: string;
  searching?: boolean;
  width?: string;
  createable?: boolean;
  placeholder?: string;
}>();
const emit = defineEmits<{
  (event: "update:modelValue", value: string): void;
}>();

const style = `width: ${props.width || "200px"}`;

const channelList = ref([]);

const disabled = ref(false);
const initData = async () => {
  disabled.value = true;
  const res = await getChannelList();
  if (res) {
    channelList.value = res.data.map((item: string) => {
      return {
        label: item,
        value: item,
      };
    });
  }
  disabled.value = false;
};

const valueChange = (value: string) => {
  emit("update:modelValue", value);
};

onMounted(() => {
  initData();
});
</script>

<style scoped lang="less"></style>
