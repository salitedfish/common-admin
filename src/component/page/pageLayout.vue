<template>
  <section class="page-layout">
    <n-card>
      <slot></slot>
    </n-card>
  </section>
</template>

<script lang="ts" setup></script>

<style scoped lang="less">
.page-layout {
  height: 100%;
  padding: 15px 18px 20px;
  .n-card {
    height: 100%;
    overflow-y: scroll;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
