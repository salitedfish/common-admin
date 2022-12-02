<template>
  <section class="page-layout-container" ref="pageDom">
    <layout-scroll-card>
      <slot></slot>
    </layout-scroll-card>

    <div class="totast" v-if="commonStore.pageLoading">
      <n-spin size="large" />
    </div>
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
  const pageContentHeight = (pageDom.value as HTMLElement).offsetHeight - 125;
  commonStore.setPageContentHeight(pageContentHeight);
});
</script>

<style scoped lang="less">
.page-layout-container {
  height: 100%;
  padding: 15px 18px 15px;

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
  }
}
</style>
