<template>
  <white-list-manager
    :id="id"
    :name="name"
    :downLoadWhiteListRequest="downLoadWhiteList"
    :getListRequest="getGoodsWhiteList"
    :whiteListType="WhiteListType.GOODS"
  ></white-list-manager>
</template>

<script lang="ts" setup>
// 框架
import { computed } from "vue";
import { useRoute } from "vue-router";
// 组件库
// 自定义组件
import whiteListManager from "@/component/whiteList/whiteListManager.vue";
// 工具库
// 自定义工具
// 网络请求
import { getGoodsWhiteList, downLoadWhiteList } from "@/request/common";
// store
// 类型
import { WhiteListType } from "@/type/Common";

const route = useRoute();

const id = computed(() => {
  return (route.query.goodsId as string) || "";
});
const name = computed(() => {
  return (route.query.goodsName as string) + "的" + (route.meta.label as string);
});
</script>

<style scoped lang="less"></style>
