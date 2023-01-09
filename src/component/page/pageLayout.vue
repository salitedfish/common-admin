<template>
  <section class="page-layout-container" ref="pageDom">
    <layout-scroll-card :loading="commonStore.pageLoading">
      <slot></slot>
    </layout-scroll-card>
  </section>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import layoutScrollCard from "@/component/common/layoutScrollCard.vue";
import { useCommonStore } from "@/store/commonStore";
// 网络请求

const pageDom = ref<HTMLElement | null>(null);
const commonStore = useCommonStore();

onMounted(() => {
  const pageContentHeight = (pageDom.value as HTMLElement).offsetHeight;
  commonStore.setPageContentHeight(pageContentHeight);
});
</script>

<style scoped lang="less">
.page-layout-container {
  height: 100%;
  padding: 15px 18px 15px;
}
</style>
