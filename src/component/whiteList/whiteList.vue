<template>
  <n-data-table
    :single-line="false"
    :columns="createColumns()"
    :data="list"
    :scroll-x="listXWidth"
    :max-height="listYHeight"
    :loading="searching"
    :scrollbar-props="{ trigger: 'none' }"
  ></n-data-table>
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
import { WhiteListType } from "@/type/Common";
import { airDropNameStateList } from "@/view/operactionManager/manualAirdropManager/manualAirdropManagerStore";
// 类型
import type { DataTableColumns } from "naive-ui";
import type { WhiteListItem } from "@/type/Common";

const props = defineProps<{
  list: WhiteListItem[];
  searching: boolean;
  whiteListType: number;
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
      align: "center",
      width: 120,
    },
    {
      title: "编号",
      key: "uid",
      align: "center",
      width: 120,
    },
    {
      title: "数量",
      key: "unitNum",
      align: "center",
      width: 120,
    },
  ];
  if (props.whiteListType === WhiteListType.AIR_DROP) {
    list.push({
      title: "状态",
      key: "state",
      align: "center",
      width: 120,
      render: (row) => {
        return airDropNameStateList.getItem(row.state)?.label;
      },
    });
  }
  return list;
};
</script>

<style scoped lang="less"></style>
