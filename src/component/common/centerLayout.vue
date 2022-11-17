<template>
  <section class="login-layout">
    <slot></slot>
  </section>
</template>

<script lang="ts" setup></script>

<style scoped lang="less">
.login-layout {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url("@/assets/img/login/login_bg.png");
  background-size: cover;
  overflow: hidden;
}
</style>
