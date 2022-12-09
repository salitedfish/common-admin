<template>
  <n-card content-style="height: 100%;">
    <n-scrollbar>
      <slot></slot>
    </n-scrollbar>
    <div class="totast" v-if="loading">
      <n-spin size="large" />
    </div>
  </n-card>
</template>

<script lang="ts" setup>
// 框架
// 组件库
// 自定义组件
// 工具库
// 自定义工具
// 网络请求

defineProps<{
  loading?: boolean;
}>();
</script>

<style scoped lang="less">
.n-card {
  height: 100%;
  position: relative;
  .totast {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: var(--background-color);
    opacity: 0.6;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99;
  }
}
</style>
