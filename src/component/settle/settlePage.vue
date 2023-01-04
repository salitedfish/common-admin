<template>
  <settle-layout>
    <n-card contentStyle="display: flex; flex-direction: column; height: 100%;">
      <header-layout class="settle-head">
        <template v-slot:left>
          <div class="head-left" @click="goLoginHandler"><custom-icon name="fanhui" :size="18"></custom-icon> <span class="back-text">退出登录</span></div>
        </template>
        <template v-slot:center>
          <div class="head-text">商户入驻</div>
        </template>
      </header-layout>

      <settle-head class="settle-step" :steps="steps" :currentStep="currentStep"></settle-head>
      <n-scrollbar>
        <settle-step-one @updateStep="updateStep" v-if="currentStep === 1"></settle-step-one>
        <settle-step-two @updateStep="updateStep" v-if="currentStep === 2"></settle-step-two>
        <settle-step-three @preStep="preStep" v-if="currentStep === 3"></settle-step-three>
      </n-scrollbar>
    </n-card>
  </settle-layout>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import settleLayout from "@/component/common/centerLayout.vue";
import headerLayout from "@/component/common/headerLayout.vue";
import settleHead from "@/component/settle/settleHead.vue";
import settleStepOne from "@/component/settle/settleStepOne.vue";
import settleStepTwo from "@/component/settle/settleStepTwo.vue";
import settleStepThree from "@/component/settle/settleStepThree.vue";
import customIcon from "@/component/common/customIcon.vue";

import type { Step } from "@/type/Common";

const router = useRouter();
const route = useRoute();

const goLoginHandler = () => {
  router.push({ name: "login" });
};

// 步骤条
const steps = reactive<Step[]>([
  { title: "注册", description: "注册账号" },
  { title: "完善信息", description: "完善企业相关信息" },
  { title: "申请结果", description: "确认入驻申请结果" },
]);
const currentStep = ref(Number(route.query.step) || 1);

// 下一步
const updateStep = () => {
  currentStep.value++;
};
// 上一步
const preStep = () => {
  currentStep.value--;
};
</script>

<style scoped lang="less">
.n-card {
  width: 80%;
  height: 80%;
  min-width: 1080px;
  border-radius: 16px;
  .settle-head {
    height: 80px;
    .head-left {
      display: flex;
      align-items: center;
      cursor: pointer;
      .back-text {
        font-size: 18px;
        margin-left: 6px;
      }
    }
    .head-text {
      text-align: center;
      font-size: 40px;
      font-weight: 600;
    }
  }
  .settle-step {
    transform: translateX(12%);
  }
}
</style>
