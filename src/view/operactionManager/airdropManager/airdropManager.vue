<template>
  <n-card>
    <screen-section @submitSearch="submitSearch" :searching="searching"></screen-section>
  </n-card>
  <n-data-table :single-line="false" :columns="createColumns()" :data="list" :scroll-x="listXWidth" :max-height="listYHeight" :loading="searching"></n-data-table>
  <n-card>
    <n-pagination v-model:page="searchParam.page" :page-count="totalPage" @update:page="getList" />
  </n-card>
</template>

<script lang="ts" setup>
// 框架
// 组件库
// 自定义组件
import screenSection from "./screenSection.vue";
// 工具库
// 自定义工具
import { useListPage } from "@/util/common";
// 网络请求
import { getGoodsList } from "@/request/goods";
// store
// 类型
import type { DataTableColumns } from "naive-ui";
import type { GoodsListItem, SearchParams } from "@/type/GoodsManager";

// 列表项
const createColumns = () => {
  const list: DataTableColumns<GoodsListItem> = [
    {
      key: "goodsName",
    },
  ];
  return list;
};

const { totalPage, getList, searchParam, list, listXWidth, listYHeight, searching, submitSearch } = useListPage<SearchParams, GoodsListItem>(getGoodsList, createColumns);
</script>

<style scoped lang="less"></style>
