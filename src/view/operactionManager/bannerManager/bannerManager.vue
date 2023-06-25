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
import { NEllipsis, NButton, NSpace, NImage, useDialog } from "naive-ui";
// 自定义组件
import screenSection from "./screenSection.vue";
// 工具库
// 自定义工具
import { useListPage, commonNotify } from "@/util/common";
// 网络请求
import { getBannerList, updateBannerState, deleteBanner } from "@/request/operator";
// store
import { useAuthStore } from "@/store/authStore";
import { BannerState, bannerStateList, bannerTargetTypeList } from "./bannerManagerStore";
// 类型
import type { VNode } from "vue";
import type { DataTableColumns } from "naive-ui";
import type { BannerListItem } from "@/type/Operator";

import { defineComponent } from "vue";
export default defineComponent({
  name: "bannerManager",
});
</script>
<script lang="ts" setup>
const authStore = useAuthStore();
const isAdmin = authStore.isAdmin;
const router = useRouter();
const dialog = useDialog();
// 列表项
const createColumns = () => {
  const list: DataTableColumns<BannerListItem> = [
    {
      title: "标题",
      key: "title",
      width: 100,
      align: "center",
      fixed: "left",
    },
    {
      title: "封面",
      key: "cover",
      align: "center",
      width: 100,
      render(row) {
        return h(NImage, {
          width: 30,
          src: row.cover,
        });
      },
    },
    {
      title: "指向类型",
      key: "type",
      width: 100,
      align: "center",
      render: (row) => {
        return bannerTargetTypeList.getItem(row.type)?.label;
      },
    },
    {
      title: "目标地址/编号",
      key: "target",
      align: "center",
      width: 180,
      render(row) {
        return h(
          NEllipsis,
          {},
          {
            default: () => row.target || "-",
          }
        );
      },
    },
    {
      title: "排序",
      key: "order",
      width: 80,
      align: "center",
    },
    {
      title: "状态",
      key: "state",
      width: 80,
      align: "center",
      render: (row) => {
        return bannerStateList.getItem(row.state)?.label;
      },
    },

    {
      title: "有效开始时间",
      key: "startTime",
      width: 180,
      align: "center",
    },
    {
      title: "有效截止时间",
      key: "endTime",
      width: 180,
      align: "center",
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
        const actionLabel = bannerStateList.getItem(row.state)?.action.label;
        const actionValue = bannerStateList.getItem(row.state)?.action.value as number;
        list.push(
          h(
            NButton,
            {
              size,
              type: "primary",
              secondary: true,
              onClick: () => {
                const dialogInfo = dialog.success({
                  title: actionLabel,
                  content: `确认${actionLabel}${row.title}吗？`,
                  positiveText: "确认",
                  onPositiveClick: async () => {
                    dialogInfo.loading = true;
                    const res = await updateBannerState({ id: row.id, state: actionValue });
                    if (res) {
                      await getList();
                      commonNotify("success", `${row.title}${actionLabel}成功`);
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

        if (row.state === BannerState.OFFLINE) {
          list.push(
            h(
              NButton,
              {
                size,
                type: "warning",
                secondary: true,
                onClick: () => {
                  const dialogInfo = dialog.warning({
                    title: "删除",
                    content: `确认删除${row.title}吗？`,
                    positiveText: "确认",
                    onPositiveClick: async () => {
                      dialogInfo.loading = true;
                      const res = await deleteBanner({ id: row.id });
                      if (res) {
                        await getList();
                        commonNotify("success", `${row.title}删除成功`);
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
          list.push(
            h(
              NButton,
              {
                size,
                type: "primary",
                secondary: true,
                onClick: () => {
                  router.push({
                    name: "editBanner",
                    query: {
                      id: row.id,
                    },
                  });
                },
              },
              {
                default: () => "编辑",
              }
            )
          );
        }

        // 用来放按钮的容器
        const btnBox = h(NSpace, {}, { default: () => list });
        return btnBox;
      },
    },
  ];

  if (isAdmin) {
    list.splice(0, 0, {
      title: "商户名称",
      key: "merchantName",
      align: "center",
      width: 100,
      render: (row) => {
        return row.merchantUid === "0" ? "平台" : row.merchantName;
      },
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

const { totalPage, getList, searchParam, list, listXWidth, listYHeight, searching, submitSearch } = useListPage(getBannerList, createColumns);
</script>

<style scoped lang="less"></style>
