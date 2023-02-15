<template>
  <section class="page-layout-container" ref="pageDom">
    <!-- <layout-scroll-card :loading="commonStore.pageLoading"> -->
    <n-scrollbar>
      <slot></slot>
    </n-scrollbar>
    <!-- </layout-scroll-card> -->
    <div class="totast" v-if="commonStore.pageLoading">
      <n-spin size="large" />
    </div>
  </section>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
// 用这个组件的话，虽然结构感觉更合理，但是页面看起来层级太深了
// import layoutScrollCard from "@/component/common/layoutScrollCard.vue";
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
  overflow-y: scroll;
  position: relative;
  .totast {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: var(--background-color);
    opacity: 0.6;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99;
  }
}
</style>
