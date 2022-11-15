<template>
  <main-layout>
    <template v-slot:menu>
      <main-menu></main-menu>
    </template>

    <template v-slot:head>
      <section class="head">head</section>
    </template>

    <template v-slot:page>
      <RouterView></RouterView>
    </template>
  </main-layout>
</template>

<script lang="ts" setup>
import mainLayout from "./mainLayout.vue";
import mainMenu from "./mainMenu.vue";
</script>

<style scoped lang="less">
.menu {
}
.head {
  color: var(--color);
}
</style>
