<template>
  <n-select @update:value="changeRole" :value="moduleValue" :options="roles" placeholder="请选择角色" style="width: 100%" clearable :disabled="disabled || loading" />
</template>

<script lang="ts" setup>
// 框架
import { onMounted, ref, watch } from "vue";
// 组件库
// 自定义组件
// 工具库
// 自定义工具
// 网络请求
import { getAuthRoles } from "@/request/auth";
// store
// 类型

defineProps<{
  moduleValue: number | null;
  disabled: boolean;
}>();
const emit = defineEmits<{
  (event: "update:moduleValue", id: number): void;
}>();

const roles = ref<{ label: string; value: number }[]>([]);
const loading = ref(false);

const changeRole = (value: number) => {
  emit("update:moduleValue", value);
};

const initRoles = async () => {
  loading.value = true;
  const res = await getAuthRoles();
  if (res) {
    roles.value = res.data.map((role) => {
      return {
        label: role.name,
        value: role.id,
      };
    });
    loading.value = false;
  }
};

onMounted(() => {
  initRoles();
});
</script>

<style scoped lang="less"></style>
