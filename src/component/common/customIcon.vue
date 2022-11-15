<template>
  <svg class="al-icon" aria-hidden="true" :style="style">
    <use :xlink:href="`#icon-${name}`"></use>
  </svg>
</template>

<script lang="ts" setup>
const props = defineProps<{
  size: number;
  name: string;
}>();

const style = `width: ${props.size}px !important; height: ${props.size}px !important;`;
</script>

<style scoped lang="less"></style>
