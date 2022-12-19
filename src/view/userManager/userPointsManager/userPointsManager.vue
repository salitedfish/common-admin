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
import { h } from "vue";
// 组件库
import { NImage } from "naive-ui";
// 自定义组件
import screenSection from "./screenSection.vue";
// 工具库
// 自定义工具
import { useListPage } from "@/util/common";
// 网络请求
import { getUserPointsList } from "@/request/user";
// store
// 类型
import type { DataTableColumns } from "naive-ui";
import type { UserPointsListItem } from "@/type/User";

// 列表渲染函数
const createColumns = () => {
  const list: DataTableColumns<UserPointsListItem> = [
    {
      title: "用户编号",
      key: "uid",
      width: 120,
      align: "center",
      fixed: "left",
    },
    {
      title: "积分token",
      key: "token",
      width: 120,
      align: "center",
    },
    {
      title: "积分编号",
      key: "pointsId",
      width: 120,
      align: "center",
    },
    {
      title: "积分名称",
      key: "pointsName",
      width: 120,
      align: "center",
    },
    {
      title: "积分封面",
      key: "pointsCover",
      align: "center",
      width: 100,
      render(row) {
        return h(NImage, {
          width: 30,
          src: row.pointsCover,
        });
      },
    },
    {
      title: "商铺编号",
      key: "merchantUid",
      width: 120,
      align: "center",
    },
    {
      title: "商铺名称",
      key: "merchantName",
      width: 120,
      align: "center",
    },

    {
      title: "持有数量",
      key: "holdNum",
      width: 100,
      align: "center",
    },
    {
      title: "冻结数量",
      key: "freezeNum",
      width: 100,
      align: "center",
    },
    {
      title: "获取时间",
      key: "updateTime",
      width: 180,
      align: "center",
    },
  ];
  return list;
};

const { totalPage, getList, searchParam, list, listXWidth, listYHeight, searching, submitSearch } = useListPage(getUserPointsList, createColumns);
</script>

<style scoped lang="less"></style>
