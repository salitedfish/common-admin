<template>
  <settle-layout>
    <n-card class="settle-content" contentStyle="display: flex; flex-direction: column">
      <div class="head-text">商户入驻</div>
      <settle-head :steps="steps" :currentStep="currentStep"></settle-head>
      <section class="settle-form">
        <settle-step-one @updateStep="updateStep" v-if="currentStep === 1"></settle-step-one>
      </section>
    </n-card>
  </settle-layout>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import settleLayout from "@/component/common/centerLayout.vue";
import settleHead from "@/component/settle/settleHead.vue";
import settleStepOne from "@/component/settle/settleStepOne.vue";

import type { Step } from "@/type/Common";

// 步骤条
const steps = reactive<Step[]>([
  { title: "注册", description: "注册账号" },
  { title: "完善信息", description: "完善企业信息" },
  { title: "申请结果", description: "完善企业信息" },
]);
const currentStep = ref(1);

// 下一步
const updateStep = () => {
  currentStep.value++;
};
</script>

<style scoped lang="less">
.settle-content {
  width: 80%;
  height: 80%;
  min-width: 1080px;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  .head-text {
    text-align: center;
    font-size: 40px;
    font-weight: 600;
    margin-bottom: 20px;
  }
  .settle-form {
    flex: 1;
    overflow-y: auto;
  }
}
</style>
