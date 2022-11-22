<template>
  <n-card>
    <screen-section @submitSearch="submitSearch" :searching="searching"></screen-section>
  </n-card>
  <n-data-table :columns="createColumns()" :data="goodsList" :scroll-x="1800" :max-height="540" :loading="searching"></n-data-table>
  <n-card>
    <n-pagination v-model:page="searchParam.page" :page-count="totalPage" @update:page="getGoodsList" />
  </n-card>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref, h } from "vue";
import { NImage } from "naive-ui";
import screenSection from "./component/screenSection.vue";

import { getGoodsList as getGoodsListRequest } from "@/request/goods";
import type * as RequestParam from "@/request/type/RequestParam";

import type { SearchParams, GoodsListItem } from "@/type/GoodsManager";
import type { DataTableColumns } from "naive-ui";
import { goodsStateList, goodsTypeList } from "./goodsListManagerType";

const searching = ref(false);

// 筛选的参数
const searchParam = ref<RequestParam.GetGoodsList>({
  page: 1,
  size: 15,
});
const totalPage = ref(0);

// 列表规则项
const createColumns = () => {
  const list: DataTableColumns<GoodsListItem> = [
    {
      title: "商品名称",
      key: "goodsName",
      width: 120,
      fixed: "left",
    },
    {
      title: "商品封面",
      key: "goodsCover",
      width: 100,
      render(row) {
        return h(NImage, {
          width: 50,
          src: row.goodsCover,
        });
      },
    },
    {
      title: "商品编号",
      key: "goodsId",
      width: 160,
    },
    {
      title: "商品类型",
      key: "goodsType",
      width: 140,
      render(row) {
        return goodsTypeList[row.goodsType].label;
      },
    },
    {
      title: "商品价格",
      key: "goodsPrice",
      width: 80,
    },
    {
      title: "商品总量",
      key: "goodsTotal",
      width: 80,
    },
    {
      title: "商品库存",
      key: "goodsStock",
      width: 80,
    },
    {
      title: "商品收藏",
      key: "goodsCollections",
      width: 80,
    },
    {
      title: "上架时间",
      key: "activeTime",
      width: 120,
      render(row) {
        return row.activeTime ? row.activeTime : "/";
      },
    },
    {
      title: "销售开始时间",
      key: "goodsSaleTime",
      width: 120,
      render(row) {
        return row.goodsSaleTime ? row.goodsSaleTime : "/";
      },
    },
    {
      title: "审核时间",
      key: "auditorTime",
      width: 120,
      render(row) {
        return row.auditorTime ? row.auditorTime : "/";
      },
    },
    {
      title: "商品状态",
      key: "goodsState",
      width: 140,
      render(row) {
        return goodsStateList[row.goodsState].label;
      },
    },

    {
      title: "操作",
      key: "",
      width: 200,
      fixed: "right",
    },
  ];
  return list;
};

// 展示的列表
const goodsList = ref<GoodsListItem[]>([]);

// 整合筛选参数
const submitSearch = (params: SearchParams) => {
  searchParam.value = { ...searchParam.value, ...params };
  getGoodsList();
};

// 请求列表
const getGoodsList = async () => {
  searching.value = true;
  const res = await getGoodsListRequest(searchParam.value);
  if (res && res.code === 0) {
    goodsList.value = res.data.data;
    totalPage.value = res.data.totalPage;
  }
  searching.value = false;
};

// 初始获取一次列表
onBeforeMount(() => {
  getGoodsList();
});
</script>

<style scoped lang="less">
.constent-area {
  width: 1200px;
}
</style>
