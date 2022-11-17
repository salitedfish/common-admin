<template>
  <div class="form">
    <n-form ref="formDom" :model="formData" :rules="formDataRules">
      <n-form-item label="主体类型" path="organizationType">
        <n-radio-group v-model:value="formData.organizationType">
          <n-space>
            <n-radio :label="item.label" :value="item.value" v-for="(item, index) in organizationTypes" :key="index" />
          </n-space>
        </n-radio-group>
      </n-form-item>

      <n-form-item></n-form-item>
    </n-form>
  </div>
</template>

<script lang="ts" setup>
// 框架
import { reactive, ref } from "vue";
// 组件库
import type { FormInst, FormRules, FormItemRule } from "naive-ui";
// 自定义组件
// 工具库
// 自定义工具
// 网络请求

// 主体类型数据依据
const organizationTypes = [
  {
    label: "企业",
    value: 2,
  },
  {
    label: "个体工商户",
    value: 4,
  },
  {
    label: "小微商户",
    value: 2401,
  },
];

// 表单元素
const formDom = ref<FormInst | null>(null);
// 表单数据
const formData = reactive({
  organizationType: organizationTypes[0].value,
});
// 表单规则
const formDataRules: FormRules = {
  organizationType: [
    {
      required: true,
    },
  ],
};
</script>

<style scoped lang="less">
.form {
  padding: 16px 0;
  height: 1000px;
}
</style>
