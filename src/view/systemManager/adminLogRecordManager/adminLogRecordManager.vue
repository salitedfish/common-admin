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

  <n-modal :show="showDialog" @update:show="(state: boolean) => (showDialog = state)">
    <n-card style="width: 1000px" :title="currentInfo.title" :bordered="false" size="huge" role="dialog" aria-modal="true">
      <template #header-extra>
        <custom-icon name="guanbi" :size="16" @click="showDialog = false"></custom-icon>
      </template>
      <div style="display: flex">
        <div style="width: 50%; height: 600px; overflow-y: scroll">
          <JsonViewer :value="currentInfo.detail?.requestJson" boxed sort theme="jv-light" :expanded="true" :expand-depth="10" />
        </div>
        <div style="width: 50%; height: 600px; overflow-y: scroll">
          <JsonViewer :value="currentInfo.detail?.responseJson" boxed sort theme="jv-light" :expanded="true" :expand-depth="10" />
        </div>
      </div>

      <template #footer>
        <div style="display: flex; justify-content: end">
          <n-button type="primary" inline-block @click="showDialog = false">确认</n-button>
        </div>
      </template>
    </n-card>
  </n-modal>
</template>

<script lang="ts">
// 框架
import { h, ref } from "vue";
// 组件库
import { NEllipsis, NButton, NSpace } from "naive-ui";
// 自定义组件
import screenSection from "./screenSection.vue";
import customIcon from "@/component/common/customIcon.vue";
// 工具库
// 自定义工具
import { useListPage } from "@/util/common";
// 网络请求
import { getAdminLogRecordList, getAdminLogRecordDetail } from "@/request/system";
// store
// 类型
import type { VNode } from "vue";
import type { DataTableColumns } from "naive-ui";
import type { AdminLogRecordListItem, AdminLogRecordDetail } from "@/type/System";

import { defineComponent } from "vue";
export default defineComponent({
  name: "adminLogRecordManager",
});
</script>
<script lang="ts" setup>
// 列表项
const createColumns = () => {
  const list: DataTableColumns<AdminLogRecordListItem> = [
    {
      title: "用户编号",
      key: "adminUid",
      width: 80,
      align: "center",
      fixed: "left",
    },
    {
      title: "用户名称",
      key: "nickName",
      width: 100,
      align: "center",
    },
    {
      title: "IP地址",
      key: "clientIp",
      width: 120,
      align: "center",
    },
    {
      title: "请求方法",
      key: "requestMethod",
      width: 80,
      align: "center",
    },
    {
      title: "操作名称",
      key: "requestUriName",
      width: 180,
      align: "center",
      render: (row) => {
        return h(
          NEllipsis,
          {},
          {
            default: () => row.requestUriName,
          }
        );
      },
    },
    {
      title: "User-Agent",
      key: "userAgent",
      width: 180,
      align: "center",
      render: (row) => {
        return h(
          NEllipsis,
          {},
          {
            default: () => row.userAgent,
          }
        );
      },
    },
    {
      title: "请求时间",
      key: "createTime",
      align: "center",
      width: 180,
    },
    {
      title: "操作",
      key: "operaction",
      align: "center",
      width: 140,
      fixed: "right",
      render(row) {
        const list: VNode[] = [];
        const size = "small";
        // list.push(
        //   h(
        //     NButton,
        //     {
        //       size,
        //       type: "primary",
        //       secondary: true,
        //       onClick: () => {
        //         showDialog.value = true;
        //         currentInfo.value.title = "请求参数";
        //         currentInfo.value.content = row.requestJson;
        //       },
        //     },
        //     {
        //       default: () => "请求参数",
        //     }
        //   )
        // );
        // list.push(
        //   h(
        //     NButton,
        //     {
        //       size,
        //       type: "primary",
        //       secondary: true,
        //       onClick: () => {
        //         showDialog.value = true;
        //         currentInfo.value.title = "请求结果";
        //         currentInfo.value.content = row.responseJson;
        //       },
        //     },
        //     {
        //       default: () => "请求结果",
        //     }
        //   )
        // );
        const btnLoading = ref(false);

        list.push(
          h(
            NButton,
            {
              size,
              type: "primary",
              secondary: true,
              loading: btnLoading.value,
              onClick: async () => {
                btnLoading.value = true;
                const res = await getAdminLogRecordDetail({ id: row.id });
                if (res) {
                  showDialog.value = true;
                  currentInfo.value.title = "请求详情";
                  currentInfo.value.detail = res.data;
                }
                btnLoading.value = false;
              },
            },
            {
              default: () => "查看详情",
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

const { totalPage, getList, searchParam, list, listXWidth, listYHeight, searching, submitSearch } = useListPage(getAdminLogRecordList, createColumns);

const showDialog = ref(false);
const currentInfo = ref<{
  title: string;
  detail: AdminLogRecordDetail | null;
}>({
  title: "",
  detail: null,
});
</script>

<style scoped lang="less"></style>
