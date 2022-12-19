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
import { getUserAssetsList } from "@/request/user";
// store
import { freezeReasonList, recordTypeList } from "./userAssetsManagerStore";
import { goodsLevelList } from "@/view/goodsManager/goodsDetailManager/goodsDetailManagerStore";
import { goodsTypeList } from "@/view/goodsManager/goodsListManager/goodsListManagerStore";

// 类型
import type { DataTableColumns } from "naive-ui";
import type { UserAssetsListItem } from "@/type/User";

// 列表渲染函数
const createColumns = () => {
  const list: DataTableColumns<UserAssetsListItem> = [
    {
      title: "用户编号",
      key: "uid",
      width: 120,
      align: "center",
      fixed: "left",
    },
    {
      title: "资产token",
      key: "token",
      width: 120,
      align: "center",
    },
    {
      title: "商品编号",
      key: "goodsId",
      width: 160,
      align: "center",
    },
    {
      title: "商品名称",
      key: "goodsName",
      width: 120,
      align: "center",
    },
    {
      title: "商品封面",
      key: "goodsCover",
      align: "center",
      width: 100,
      render(row) {
        return h(NImage, {
          width: 30,
          src: row.goodsCover,
        });
      },
    },
    {
      title: "商品类型",
      key: "goodsType",
      width: 100,
      align: "center",
      render: (row) => {
        return goodsTypeList.getItem(row.goodsType)?.label;
      },
    },
    {
      title: "商品品级",
      key: "goodsLevel",
      width: 100,
      align: "center",
      render: (row) => {
        return goodsLevelList.getItem(row.goodsLevel)?.label;
      },
    },
    {
      title: "获取时价格（元）",
      key: "price",
      width: 140,
      align: "center",
    },
    {
      title: "获取方式",
      key: "recordType",
      width: 100,
      align: "center",
      render: (row) => {
        return recordTypeList.getItem(row.recordType)?.label;
      },
    },
    {
      title: "获取时间",
      key: "updateTime",
      width: 180,
      align: "center",
    },
    {
      title: "持有数量",
      key: "holdNum",
      width: 100,
      align: "center",
    },

    {
      title: "商品总量",
      key: "goodsTotal",
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
      title: "冻结原因",
      key: "freezeType",
      width: 100,
      align: "center",
      render: (row) => {
        return freezeReasonList.getItem(row.freezeType)?.label;
      },
    },
  ];
  return list;
};

const { totalPage, getList, searchParam, list, listXWidth, listYHeight, searching, submitSearch } = useListPage(getUserAssetsList, createColumns, { heightLevel: 1 });
</script>

<style scoped lang="less"></style>
