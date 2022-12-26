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
  name: "goodsRecommendManager",
});
</script>
<script lang="ts" setup>
// 框架
import { h } from "vue";
// 组件库
import { NSpace, NButton, useDialog, NImage } from "naive-ui";
// 自定义组件
import screenSection from "./screenSection.vue";
// 工具库
// 自定义工具
import { useListPage, commonNotify } from "@/util/common";
// 网络请求
import { getGoodsRecommendList, deleteGoodsRecommend, updateGoodsRecommendState } from "@/request/operator";
// store
import { useAuthStore } from "@/store/authStore";
import { goodsRecommendTopStateList } from "./goodsRecommendManagerStore";
// 类型
import type { VNode } from "vue";
import type { DataTableColumns } from "naive-ui";
import type { GoodsRecommendListItem } from "@/type/Operator";

const isAdmin = useAuthStore().isAdmin();
const authStore = useAuthStore();
const dialog = useDialog();

// 列表项
const createColumns = () => {
  const list: DataTableColumns<GoodsRecommendListItem> = [
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
          width: 30,
          src: row.goodsCover,
        });
      },
    },
    {
      title: "商品总量",
      key: "goodsTotal",
      width: 120,
      align: "center",
    },
    {
      title: "商品库存",
      key: "goodsStock",
      width: 120,
      align: "center",
    },
    {
      title: "商品销量",
      key: "goodsSales",
      width: 120,
      align: "center",
    },
    {
      title: "置顶状态",
      key: "topState",
      width: 120,
      align: "center",
      render: (row) => {
        return goodsRecommendTopStateList.getItem(row.topState)?.label;
      },
    },
    {
      title: "操作",
      key: "operaction",
      align: "center",
      width: 120,
      fixed: "right",
      render(row) {
        const list: VNode[] = [];
        const size = "small";
        const isMy = isAdmin ? Number(row.merchantUid) === 0 : Number(authStore.getUserInfo()?.uid) === Number(row.merchantUid);
        if (isMy) {
          // 删除
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
                    content: `确认删除${row.goodsName}吗？`,
                    positiveText: "确认",
                    onPositiveClick: async () => {
                      dialogInfo.loading = true;
                      const res = await deleteGoodsRecommend({ goodsId: row.goodsId });
                      if (res) {
                        await getList();
                        commonNotify("success", "商品推荐删除成功");
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
          // 置顶与不置顶
          const actionLabel = goodsRecommendTopStateList.getItem(row.topState)?.action.label;
          const actionValue = goodsRecommendTopStateList.getItem(row.topState)?.action.value as number;
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
                    content: `确认${actionLabel}${row.goodsName}吗？`,
                    positiveText: "确认",
                    onPositiveClick: async () => {
                      dialogInfo.loading = true;
                      const res = await updateGoodsRecommendState({ goodsId: row.goodsId, topState: actionValue });
                      if (res) {
                        await getList();
                        commonNotify("success", `${actionLabel}成功`);
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
        return row.merchantUid === 0 ? "平台" : row.merchantName;
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

const { totalPage, getList, searchParam, list, listXWidth, listYHeight, searching, submitSearch } = useListPage(getGoodsRecommendList, createColumns);
</script>

<style scoped lang="less"></style>
