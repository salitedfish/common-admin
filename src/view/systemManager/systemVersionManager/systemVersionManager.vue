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
</template>

<script lang="ts">
// 框架
import { h } from "vue";
import { useRouter } from "vue-router";
// 组件库
import { NSpace, NButton, useDialog, NEllipsis } from "naive-ui";
// 自定义组件
import screenSection from "./screenSection.vue";
// 工具库
// 自定义工具
import { useListPage, commonNotify } from "@/util/common";
// 网络请求
import { getSystemVersionList, updateSystemVersion, deleteSystemVersion } from "@/request/system";
// store
import { forceUpdateList, versionStateList, VersionState } from "./systemVersionManagerStore";
// 类型
import type { VNode } from "vue";
import type { DataTableColumns } from "naive-ui";
import type { SystemVersionListItem } from "@/type/System";
import { defineComponent } from "vue";
export default defineComponent({
  name: "systemVersionManager",
});
</script>
<script lang="ts" setup>
const dialog = useDialog();
const router = useRouter();

// 列表项
const createColumns = () => {
  const list: DataTableColumns<SystemVersionListItem> = [
    {
      title: "渠道",
      key: "channel",
      width: 120,
      align: "center",
    },
    {
      title: "版本名称",
      key: "versionName",
      width: 120,
      align: "center",
    },
    {
      title: "版本号",
      key: "versionCode",
      align: "center",
      width: 120,
      fixed: "left",
    },

    {
      title: "更新内容",
      key: "descrition",
      width: 180,
      align: "center",
      render: (row) => {
        return h(
          NEllipsis,
          {},
          {
            default: () => row.description || "-",
          }
        );
      },
    },

    {
      title: "下载地址",
      key: "downloadUrl",
      width: 180,
      align: "center",
      render: (row) => {
        return h(
          NEllipsis,
          {},
          {
            default: () => row.downloadUrl,
          }
        );
      },
    },

    {
      title: "强制更新",
      key: "updateTime",
      width: 120,
      align: "center",
      render: (row) => {
        return forceUpdateList.getItem(row.forceUpdate)?.label;
      },
    },
    {
      title: "状态",
      key: "state",
      width: 120,
      align: "center",
      render: (row) => {
        return versionStateList.getItem(row.state)?.label;
      },
    },
    {
      title: "更新时间",
      key: "updateTime",
      width: 180,
      align: "center",
    },

    {
      title: "操作",
      key: "operaction",
      align: "center",
      width: 160,
      fixed: "right",
      render(row) {
        const list: VNode[] = [];
        const size = "small";
        if (row.state === VersionState.OFF_LINE) {
          list.push(
            h(
              NButton,
              {
                size,
                type: "primary",
                secondary: true,
                onClick: () => {
                  router.push({
                    name: "editSystemVersion",
                    query: {
                      id: String(row.id),
                    },
                  });
                },
              },
              {
                default: () => "编辑",
              }
            )
          );
          list.push(
            h(
              NButton,
              {
                size,
                type: "warning",
                secondary: true,
                onClick: () => {
                  const dialogInfo = dialog.warning({
                    title: "删除版本",
                    content: `确认删除${row.versionName}吗？`,
                    positiveText: "确认",
                    onPositiveClick: async () => {
                      dialogInfo.loading = true;
                      const res = await deleteSystemVersion({ id: row.id });
                      if (res) {
                        await getList();
                        commonNotify("success", `${row.versionName}删除成功`);
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
        }

        const actionLabel = versionStateList.getItem(row.state)?.action.label;
        const actionValue = versionStateList.getItem(row.state)?.action.value as number;
        list.push(
          h(
            NButton,
            {
              size,
              type: "warning",
              secondary: true,
              onClick: () => {
                const dialogInfo = dialog.warning({
                  title: `${actionLabel}版本`,
                  content: `确认${actionLabel}${row.versionName}吗？`,
                  positiveText: "确认",
                  onPositiveClick: async () => {
                    dialogInfo.loading = true;
                    const res = await updateSystemVersion({ id: row.id, state: actionValue });
                    if (res) {
                      await getList();
                      commonNotify("success", `${row.versionName}${actionLabel}成功`);
                    }
                    dialogInfo.loading = false;
                  },
                });
              },
            },
            {
              default: () => actionLabel,
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
const { totalPage, getList, searchParam, list, listXWidth, listYHeight, searching, submitSearch } = useListPage(getSystemVersionList, createColumns);
</script>

<style scoped lang="less"></style>
