<template>
  <div @contextmenu.prevent="clickRight">右键点击</div>
  <RouterView />
</template>

<script lang="ts" setup>
const clickRight = () => {
  console.log("右键点击了");
};
</script>

<style scoped lang="less"></style>
