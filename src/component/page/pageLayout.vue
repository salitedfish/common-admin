<template>
  <section class="page-layout">
    <layout-scroll-card>
      <slot></slot>
    </layout-scroll-card>
  </section>
</template>

<script lang="ts" setup>
import layoutScrollCard from "@/component/common/layoutScrollCard.vue";
</script>

<style scoped lang="less">
.page-layout {
  height: 100%;
  padding: 15px 18px 20px;
}
</style>
