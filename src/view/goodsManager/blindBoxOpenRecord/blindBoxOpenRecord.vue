<template>
  <n-card>
    <screen-section @submitSearch="submitSearch" :searching="searching"></screen-section>
  </n-card>
  <n-data-table
    :single-line="false"
    :columns="createColumns()"
    :data="list"
    :scroll-x="listXWidth"
    :max-height="listYHeight"
    :loading="searching"
    :scrollbar-props="{ trigger: 'none' }"
  ></n-data-table>
  <n-card>
    <n-pagination v-model:page="searchParam.page" :page-count="totalPage" @update:page="getList" />
  </n-card>
</template>

<script lang="ts">
// 框架
import { defineComponent, computed } from "vue";
import { useRoute } from "vue-router";
// 组件库
// 自定义组件
import screenSection from "./screenSection.vue";
// 工具库
// 自定义工具
import { useListPage } from "@/util";
// 网络请求
import { getBlindBoxOpenRecord } from "@/request/goods";
// store
// 类型
import type { DataTableColumns } from "naive-ui";
import type { BlindBoxOpenRecordItem } from "@/type/GoodsManager";
// 组件名
export default defineComponent({
  name: "blindBoxOpenRecord",
});
</script>

<script lang="ts" setup>
const route = useRoute();
const goodsId = computed(() => {
  return (route.query.id as string) || "";
});

// 列表项
const createColumns = () => {
  const list: DataTableColumns<BlindBoxOpenRecordItem> = [
    {
      title: "盲盒奖品编号",
      key: "boxGoodsId",
      width: 180,
      align: "center",
      fixed: "left",
    },
    {
      title: "商品名称",
      key: "goodsName",
      width: 120,
      align: "center",
    },
    {
      title: "用户编号",
      key: "uid",
      width: 120,
      align: "center",
    },
    {
      title: "用户昵称",
      key: "nickName",
      width: 120,
      align: "center",
    },

    {
      title: "开盒时间",
      key: "createTime",
      width: 180,
      align: "center",
    },
  ];

  return list;
};

const { totalPage, getList, searchParam, list, listXWidth, listYHeight, searching, submitSearch } = useListPage(getBlindBoxOpenRecord, createColumns, {
  params: { goodsId: goodsId.value },
});
</script>

<style scoped lang="less"></style>
