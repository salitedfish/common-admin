<script lang="ts">
// 框架
import { defineComponent, createVNode } from "vue";
import { useRouter } from "vue-router";
// 组件库
import { NSpace, NButton, useDialog } from "naive-ui";
// 自定义组件
import ScreenSection from "./component/screenSection.vue";
// 工具库
// 自定义工具
import { useListPage, commonNotify } from "@/util/common";
// 网络请求
import { getGoodsActivityList, delGoodsActivity, updateGoodsActivityState } from "@/request/operator";
// store
import { useAuthStore } from "@/store/authStore";
import { rewardTypeList } from "@/view/operactionManager/goodsActivityDetail/goodsActivityDetailStore";
import { goodsActivityStateList, GoodsActivityState } from "./goodsActivityManagerStore";
// 类型
import type { VNode } from "vue";
import type { DataTableColumns } from "naive-ui";
import type { GoodsActivityListItem } from "@/type/Operator";
import { DetailCheckType } from "@/type/Common";
// 组件名
export default defineComponent({
  name: "goodsActivityManager",
});
</script>

<script lang="ts" setup>
const authStore = useAuthStore();
const router = useRouter();
const dialog = useDialog();

const createColumns = () => {
  const list: DataTableColumns<GoodsActivityListItem> = [
    {
      title: "活动编号",
      key: "id",
      align: "center",
      width: 100,
    },
    {
      title: "活动名称",
      key: "name",
      align: "center",
      width: 120,
    },

    {
      title: "活动商品",
      key: "goodsName",
      align: "center",
      width: 120,
    },
    {
      title: "奖励物品类型",
      key: "itemName",
      align: "center",
      width: 120,
      render: (row) => {
        return rewardTypeList.getItem(row.itemType)?.label;
      },
    },
    {
      title: "奖励物品",
      key: "itemName",
      align: "center",
      width: 120,
    },
    {
      title: "活动状态",
      key: "name",
      align: "center",
      width: 120,
      render: (row) => {
        return goodsActivityStateList.getItem(row.state)?.label;
      },
    },

    {
      title: "操作",
      key: "operaction",
      align: "center",
      width: 240,
      fixed: "right",
      render(row) {
        const { state, id } = row;
        const isMy = authStore.isAdmin ? Number(row.merchantUid) === 0 : Number(authStore.userInfo?.uid) === Number(row.merchantUid);
        const list: VNode[] = [];
        const size = "small";
        const type = "primary";

        // 详情
        list.push(
          createVNode(
            NButton,
            {
              type,
              size,
              secondary: true,
              onClick: () => {
                router.push({
                  name: "goodsActivityDetail",
                  query: {
                    type: DetailCheckType.CHECK,
                    id: row.id,
                  },
                });
              },
            },
            {
              default: () => "详情",
            }
          )
        );

        // 删除，编辑
        if (isMy && state === GoodsActivityState.TO_BE_SHELVES) {
          list.push(
            createVNode(
              NButton,
              {
                type: "warning",
                size,
                secondary: true,
                onClick: () => {
                  const dialogInfo = dialog.warning({
                    title: "删除商品活动",
                    content: `确认删除${row.name}吗？`,
                    positiveText: "确认",
                    onPositiveClick: async () => {
                      dialogInfo.loading = true;
                      const res = await delGoodsActivity({ id: row.id });
                      if (res) {
                        await getList();
                        commonNotify("success", "商品活动删除成功");
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
            createVNode(
              NButton,
              {
                type,
                size,
                secondary: true,
                onClick: () => {
                  router.push({
                    name: "goodsActivityDetail",
                    query: {
                      type: DetailCheckType.EDIT,
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

        // 上下线
        if (isMy) {
          const action = goodsActivityStateList.getItem(row.state)?.action;
          list.push(
            createVNode(
              NButton,
              {
                type,
                size,
                secondary: true,
                onClick: () => {
                  const dialogInfo = dialog.success({
                    title: `${action?.label}商品活动`,
                    content: `确认${action?.label}${row.name}吗？`,
                    positiveText: "确认",
                    onPositiveClick: async () => {
                      dialogInfo.loading = true;
                      const res = await updateGoodsActivityState({ id: row.id, state: action?.value });
                      if (res) {
                        await getList();
                        commonNotify("success", `商品活动${action?.label}成功`);
                      }
                      dialogInfo.loading = false;
                    },
                  });
                },
              },
              {
                default: () => action?.label,
              }
            )
          );
        }

        // 用来放按钮的容器
        const btnBox = createVNode(NSpace, {}, { default: () => list });
        return btnBox;
      },
    },
  ];

  if (authStore.isAdmin) {
    list.splice(0, 0, {
      title: "商户名称",
      key: "merchantName",
      align: "center",
      width: 100,
      render: (row) => {
        return Number(row.merchantUid) === 0 ? "平台" : row.merchantName;
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
const { submitSearch, searching, list, listXWidth, listYHeight, searchParam, totalPage, getList } = useListPage(getGoodsActivityList, createColumns, {
  heightLevel: 1,
});
</script>

<template>
  <n-card>
    <screen-section @submitSearch="submitSearch" :searching="searching"></screen-section>
  </n-card>
  <n-data-table :single-line="false" :columns="createColumns()" :data="list" :scroll-x="listXWidth" :max-height="listYHeight" :loading="searching"></n-data-table>
  <n-card>
    <n-pagination v-model:page="searchParam.page" :page-count="totalPage" @update:page="getList" />
  </n-card>
</template>

<style scoped lang="less"></style>
