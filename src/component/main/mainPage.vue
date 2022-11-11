<template>
  <main-layout>
    <template v-slot:menu>
      <section class="menu">menu</section>
    </template>

    <template v-slot:head>
      <section class="head">head</section>
    </template>

    <template v-slot:page>
      page
      <RouterView></RouterView>
    </template>
  </main-layout>
</template>

<script lang="ts" setup>
import mainLayout from "./mainLayout.vue";
</script>

<style scoped lang="less">
.menu {
}
.head {
}
</style>
