<template>
  <n-card>
    <screen-section @submitSearch="() => getList()" :searching="searching"></screen-section>
  </n-card>
  <n-data-table :single-line="false" :columns="createColumns()" :data="list" :scroll-x="listXWidth" :max-height="listYHeight" :loading="searching"> </n-data-table>
</template>

<script lang="ts">
// 框架
import { h, ref, defineComponent } from "vue";
// 组件库
import { NButton, NSpace, useDialog } from "naive-ui";
// 自定义组件
import screenSection from "./screenSection.vue";
// 工具库
// 自定义工具
import { useListNoPage, commonNotify } from "@/util/common";
// 网络请求
import { getSearchKeywordsList, deleteSearchKeywords } from "@/request/operator";
// store
// 类型
import type { VNode } from "vue";
import type { DataTableColumns } from "naive-ui";
// 组件名
export default defineComponent({
  name: "searchManager",
});
</script>

<script lang="ts" setup>
const dialog = useDialog();
// 列表项
const createColumns = () => {
  const list: DataTableColumns<{ id: number; keyword: string; order: number }> = [
    {
      title: "id",
      key: "id",
      align: "center",
      width: 80,
    },
    {
      title: "关键词",
      key: "keyword",
      align: "center",
      width: 160,
    },
    {
      title: "排序",
      key: "order",
      align: "center",
      width: 80,
    },
    {
      title: "操作",
      key: "operaction",
      align: "center",
      width: 30,
      fixed: "right",
      render(row) {
        const list: VNode[] = [];
        const size = "small";
        const loading = ref(false);
        list.push(
          h(
            NButton,
            {
              size,
              type: "warning",
              secondary: true,
              loading: loading.value,
              onClick: async () => {
                const dialogInfo = dialog.warning({
                  title: "删除关键词",
                  content: `确认删除${row.keyword}吗？`,
                  positiveText: "确认",
                  onPositiveClick: async () => {
                    dialogInfo.loading = true;
                    const res = await deleteSearchKeywords({ id: row.id });
                    if (res) {
                      await getList();
                      commonNotify("success", "关键词删除成功");
                    }
                    dialogInfo.loading = false;
                  },
                });
              },
            },
            {
              default: () => "删除",
            }
          )
        );

        // 用来放按钮的容器
        const btnBox = h(NSpace, {}, { default: () => list });
        return btnBox;
      },
    },
  ];
  return list;
};

const { getList, list, listXWidth, listYHeight, searching } = useListNoPage(getSearchKeywordsList, createColumns);
</script>

<style scoped lang="less"></style>
