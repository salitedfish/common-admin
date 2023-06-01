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
import { getRuleWhiteList } from "@/request/operator";
// store
import { userTypes } from "./ruleWhiteListManagerStore";
// 类型
import type { DataTableColumns } from "naive-ui";
import type { RuleWhiteListItem } from "@/type/Operator";

// 组件名
export default defineComponent({
  name: "ruleWhiteListManager",
});
</script>

<script lang="ts" setup>
const route = useRoute();

const createColumns = () => {
  const list: DataTableColumns<RuleWhiteListItem> = [
    {
      title: "订单编号",
      key: "orderId",
      align: "center",
      width: 120,
    },
    {
      title: "类型",
      key: "orderId",
      align: "center",
      width: 120,
      render: (row) => {
        return userTypes.getItem(row.userType)?.label;
      },
    },
    {
      title: "用户编号",
      key: "uid",
      align: "center",
      width: 120,
    },
    {
      title: "token",
      key: "token",
      align: "center",
      width: 120,
    },
    {
      title: "总数量",
      key: "totalNum",
      align: "center",
      width: 120,
    },
    {
      title: "每次释放数量",
      key: "unitNum",
      align: "center",
      width: 120,
    },
    {
      title: "未释放数量",
      key: "unusedNum",
      align: "center",
      width: 120,
    },
    {
      title: "开始释放时间",
      key: "startTime",
      align: "center",
      width: 120,
    },
  ];
  return list;
};

const { totalPage, getList, searchParam, list, listXWidth, listYHeight, searching, submitSearch } = useListPage(getRuleWhiteList, createColumns, {
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
