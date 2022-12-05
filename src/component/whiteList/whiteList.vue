<template>
  <n-data-table :single-line="false" :columns="createColumns()" :data="list" :scroll-x="listXWidth" :max-height="listYHeight" :loading="searching"></n-data-table>
</template>

<script lang="ts" setup>
// 框架
import { computed } from "vue";
// 组件库
// 自定义组件
// 工具库
// 自定义工具
// 网络请求
// store
import { useCommonStore } from "@/store/commonStore";
// 类型
import type { DataTableColumns } from "naive-ui";
import type { WhiteListItem } from "@/type/Common";

defineProps<{
  list: WhiteListItem[];
  searching: boolean;
}>();

const commonStore = useCommonStore();

// 列表宽度和高度
const listXWidth = computed(() => {
  let width = 0;
  const list = createColumns();
  for (const item of list) {
    width = (item.width as number) + width;
  }
  return width;
});
const listYHeight = computed(() => {
  return commonStore.pageContentHeight - 255;
});

const createColumns = () => {
  const list: DataTableColumns<WhiteListItem> = [
    {
      title: "手机号",
      key: "phone",
      width: 120,
    },
    {
      title: "编号",
      key: "uid",
      width: 120,
    },
    {
      title: "数量",
      key: "unitNum",
      width: 120,
    },
  ];
  return list;
};
</script>

<style scoped lang="less"></style>
