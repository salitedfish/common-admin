<script lang="ts">
// 框架
import { defineComponent, ref, reactive, createVNode } from "vue";
// 组件库
// 自定义组件
import screenHeader from "./screenHeader.vue";

// 工具库
// 自定义工具
import { useListPage } from "@/util/common";
// 网络请求
import { getUserParallelCoinList } from "@/request/user";
// store
import { giftTypeList, coinTypeList } from "@/view/pointsManager/parallelCoinDetail/parallelCoinDetailStore";

// 类型
import type { UserParallelCoinListItem } from "@/type/User";
import type { DataTableColumns } from "naive-ui";
// 组件名
export default defineComponent({
  name: "userParallelCoinManager",
});
</script>

<script lang="ts" setup>
// 列表渲染函数
const createColumns = () => {
  const list: DataTableColumns<UserParallelCoinListItem> = [
    {
      title: "用户编号",
      key: "uid",
      width: 100,
      align: "center",
      fixed: "left",
    },
    {
      title: "token",
      key: "token",
      align: "center",
      width: 120,
    },

    {
      title: "持有数量",
      key: "holdNum",
      align: "center",
      width: 120,
    },
    {
      title: "冻结数量",
      key: "freezeNum",
      align: "center",
      width: 120,
    },
    {
      title: "是否可转赠",
      key: "fromChainAddress",
      align: "center",
      width: 120,
      render: (row) => {
        return giftTypeList.getItem(row.giftType)?.label;
      },
    },

    // {
    //   title: "操作",
    //   key: "operaction",
    //   align: "center",
    //   width: 340,
    //   fixed: "right",
    //   render(user) {
    //     const btnList = [];
    //     // 用来放按钮的容器
    //     const btnBox = createVNode(NSpace, {}, { default: () => btnList });
    //     return btnBox;
    //   },
    // },
  ];
  return list;
};

const { totalPage, getList, searchParam, list, listXWidth, listYHeight, searching, submitSearch } = useListPage(getUserParallelCoinList, createColumns, { heightLevel: 1 });
</script>

<template>
  <n-card>
    <screen-header @submitSearch="submitSearch" :searching="searching"></screen-header>
  </n-card>
  <n-data-table :single-line="false" :columns="createColumns()" :data="list" :scroll-x="listXWidth" :max-height="listYHeight" :loading="searching"></n-data-table>
  <n-card>
    <n-pagination v-model:page="searchParam.page" :page-count="totalPage" @update:page="getList" />
  </n-card>
</template>

<style scoped lang="less"></style>
