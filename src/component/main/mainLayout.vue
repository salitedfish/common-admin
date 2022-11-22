<template>
  <section class="main-layout">
    <section class="menu-layout">
      <slot name="menu"></slot>
    </section>

    <section class="work-layout">
      <section class="head-layout">
        <slot name="head"></slot>
      </section>

      <section class="banner-layout">
        <slot name="tabs"></slot>
      </section>

      <section class="page-layout">
        <slot name="page"></slot>
      </section>
    </section>
  </section>
</template>

<script lang="ts" setup></script>

<style scoped lang="less">
.main-layout {
  height: 100vh;
  display: flex;
  overflow: hidden;
  .menu-layout {
    overflow-y: auto;
  }
  .work-layout {
    width: 0;
    flex: 1;
    display: flex;
    flex-direction: column;
    .page-layout {
      flex: 1;
      overflow-y: auto;
    }
  }
}
</style>
