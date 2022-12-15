<template>
  <n-card>
    <screen-section @submitSearch="submitSearch" :searching="searching"></screen-section>
  </n-card>
  <n-data-table :single-line="false" :columns="createColumns()" :data="list" :scroll-x="listXWidth" :max-height="listYHeight" :loading="searching"></n-data-table>
  <n-card>
    <n-pagination v-model:page="searchParam.page" :page-count="totalPage" @update:page="getList" />
  </n-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "goodsListManager",
});
</script>

<script lang="ts" setup>
import { onBeforeMount, h } from "vue";
import { NImage } from "naive-ui";
import screenSection from "./component/screenSection.vue";

import { getGoodsList as getListRequest } from "@/request/goods";

import type { GoodsListItem } from "@/type/GoodsManager";
import type { DataTableColumns } from "naive-ui";
import { goodsTypeList } from "@/view/goodsManager/goodsListManager/goodsListManagerStore";
import { useAuthStore } from "@/store/authStore";
import { useListPage } from "@/util/common";

const authStore = useAuthStore();
const isAdmin = authStore.isAdmin();

// 列表规则项
const createColumns = () => {
  const list: DataTableColumns<GoodsListItem> = [
    {
      title: "商品编号",
      key: "goodsId",
      align: "center",
      width: 160,
    },
    {
      title: "商品名称",
      key: "goodsName",
      width: 120,
      fixed: "left",
      align: "center",
    },

    {
      title: "商品封面",
      key: "goodsCover",
      align: "center",
      width: 100,
      render(row) {
        return h(NImage, {
          width: 50,
          src: row.goodsCover,
        });
      },
    },

    {
      title: "商品类型",
      key: "goodsType",
      align: "center",
      width: 100,
      render(row) {
        return goodsTypeList.getItem(row.goodsType)?.label;
      },
    },
    {
      title: "商品价格",
      key: "goodsPrice",
      align: "center",
      width: 100,
    },
    {
      title: "商品总量",
      key: "goodsTotal",
      align: "center",
      width: 100,
    },
    {
      title: "商品库存",
      key: "goodsStock",
      align: "center",
      width: 100,
    },
  ];
  if (isAdmin) {
    list.splice(0, 0, {
      title: "商户名称",
      key: "merchantName",
      align: "center",
      width: 100,
    });
    list.splice(0, 0, {
      title: "商户编号",
      key: "merchantUid",
      align: "center",
      width: 100,
    });
  }
  return list;
};
const { totalPage, getList, searchParam, list, listXWidth, listYHeight, searching, submitSearch } = useListPage(getListRequest, createColumns, { heightLevel: 1 });
</script>

<style scoped lang="less">
.constent-area {
  width: 1200px;
}
</style>
