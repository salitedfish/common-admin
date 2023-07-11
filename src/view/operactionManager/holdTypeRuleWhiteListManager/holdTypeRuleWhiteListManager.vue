<script lang="ts">
// 框架
import { defineComponent } from "vue";
import { useRoute } from "vue-router";
// 组件库
// 自定义组件
import screenSection from "./screenSection.vue";
// 工具库
// 自定义工具
import { useListPage } from "@/util/common";

// 网络请求
import { getHoldTypeRuleWhiteList } from "@/request/operator";
// store
// 类型
import type { DataTableColumns } from "naive-ui";
import type { HoldTypeRuleWhiteListItem } from "@/type/Operator";

// 组件名
export default defineComponent({
  name: "ruleWhiteListManager",
});
</script>

<script lang="ts" setup>
const route = useRoute();

const createColumns = () => {
  const list: DataTableColumns<HoldTypeRuleWhiteListItem> = [
    {
      title: "token",
      key: "token",
      align: "center",
      width: 120,
    },
    // {
    //   title: "类型",
    //   key: "orderId",
    //   align: "center",
    //   width: 120,
    //   render: (row) => {
    //     return userTypes.getItem(row.userType)?.label;
    //   },
    // },
    {
      title: "已发放次数",
      key: "provideNum",
      align: "center",
      width: 120,
    },

    {
      title: "已发放数量",
      key: "provideTotalNum",
      align: "center",
      width: 120,
    },
    {
      title: "上次发放时间",
      key: "provideTime",
      align: "center",
      width: 120,
    },
  ];
  return list;
};

const { totalPage, getList, searchParam, list, listXWidth, listYHeight, searching, submitSearch } = useListPage(getHoldTypeRuleWhiteList, createColumns, {
  params: {
    ruleId: Number(route.query.id),
  },
});
</script>

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

<style scoped lang="less"></style>
