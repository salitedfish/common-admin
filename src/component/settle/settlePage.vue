<template>
  <settle-layout>
    <n-card contentStyle="display: flex; flex-direction: column; height: 100%;">
      <div class="head-text">商户入驻</div>
      <settle-head :steps="steps" :currentStep="currentStep"></settle-head>
      <n-scrollbar>
        <settle-step-one @updateStep="updateStep" v-if="currentStep === 1"></settle-step-one>
        <settle-step-two @updateStep="updateStep" v-if="currentStep === 2"></settle-step-two>
        <settle-step-three @updateStep="updateStep" v-if="currentStep === 3"></settle-step-three>
      </n-scrollbar>
    </n-card>
  </settle-layout>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { useRoute } from "vue-router";
import settleLayout from "@/component/common/centerLayout.vue";
import settleHead from "@/component/settle/settleHead.vue";
import settleStepOne from "@/component/settle/settleStepOne.vue";
import settleStepTwo from "@/component/settle/settleStepTwo.vue";
import settleStepThree from "@/component/settle/settleStepThree.vue";

import type { Step } from "@/type/Common";

const route = useRoute();

// 步骤条
const steps = reactive<Step[]>([
  { title: "注册", description: "注册账号" },
  { title: "完善信息", description: "完善企业信息" },
  { title: "申请结果", description: "完善企业信息" },
]);
// const currentStep = ref(Number(route.query.step) || 1);
const currentStep = ref(2);

// 下一步
const updateStep = () => {
  currentStep.value++;
};
</script>

<style scoped lang="less">
.n-card {
  width: 80%;
  height: 80%;
  min-width: 1080px;
  border-radius: 16px;
  .head-text {
    text-align: center;
    font-size: 40px;
    font-weight: 600;
    margin-bottom: 20px;
  }
}
</style>
