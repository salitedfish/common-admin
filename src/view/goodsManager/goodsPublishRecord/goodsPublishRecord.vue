<template>
  <n-data-table
    :single-line="false"
    :columns="createColumns()"
    :data="list"
    :scroll-x="listXWidth"
    :max-height="listYHeight"
    :loading="searching"
    :scrollbar-props="{ trigger: 'none' }"
  >
  </n-data-table>
</template>

<script lang="ts">
// 框架
import { defineComponent, computed } from "vue";
import { useRoute } from "vue-router";
// 组件库
// 自定义组件
// 工具库
// 自定义工具
import { useListNoPage } from "@/util/common";
// 网络请求
import { getGoodsPublishRecord } from "@/request/goods";
// store
import { GoodsPublishStateList } from "./goodsPublishRecordStore";
// 类型
import type { DataTableColumns } from "naive-ui";
import type { GoodsPublishRecordItem } from "@/type/GoodsManager";
// 组件名
export default defineComponent({
  name: "goodsPublishRecord",
});
</script>

<script lang="ts" setup>
const route = useRoute();
const goodsId = computed(() => {
  return (route.query.id as string) || "";
});
// 列表项
const createColumns = () => {
  const list: DataTableColumns<GoodsPublishRecordItem> = [
    {
      title: "起始序列号",
      key: "startNum",
      align: "center",
      width: 80,
    },
    {
      title: "结束序列号",
      key: "endNum",
      align: "center",
      width: 80,
    },
    {
      title: "发行状态",
      key: "state",
      align: "center",
      width: 100,
      render: (goods) => {
        return GoodsPublishStateList.getItem(goods.state)?.label;
      },
    },
    {
      title: "区块链哈希",
      key: "chainHash",
      align: "center",
      width: 180,
    },
    {
      title: "更新时间",
      key: "updateTime",
      align: "center",
      width: 180,
    },
  ];
  return list;
};

const { list, listXWidth, listYHeight, searching } = useListNoPage(getGoodsPublishRecord, createColumns, { params: { goodsId: goodsId.value } });
</script>

<style scoped lang="less"></style>
