<template>
  <n-steps status="process" size="medium" :current="currentStep">
    <n-step v-for="(step, key) in steps" :key="key" :title="step.title" :description="step.description"></n-step>
  </n-steps>
</template>

<script lang="ts" setup>
import type { Step } from "@/type/Common";
defineProps<{
  currentStep: number;
  steps: Step[];
}>();
</script>

<style scoped lang="less"></style>
