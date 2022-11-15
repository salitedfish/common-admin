<template>
  <svg class="al-icon" aria-hidden="true" :width="`${size}px`" :height="`${size}px`">
    <use :xlink:href="`#icon-${name}`"></use>
  </svg>
</template>

<script lang="ts" setup>
defineProps<{
  size: number;
  name: string;
}>();
</script>

<style scoped lang="less"></style>
