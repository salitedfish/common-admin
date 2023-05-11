<script lang="ts">
// 框架
import { defineComponent, createVNode, h } from "vue";
import { useRouter } from "vue-router";
// 组件库
import { NSpace, NButton, useDialog, NEllipsis, NImage } from "naive-ui";
// 自定义组件
import screenHeader from "./screenHeader.vue";
// 工具库
// 自定义工具
import { useListPage, commonNotify } from "@/util/common";
// 网络请求
import { getParallelCoinList, delParallelCoin } from "@/request/points";
// store
import { useAuthStore } from "@/store/authStore";
import { giftTypeList, coinTypeList } from "../parallelCoinDetail/parallelCoinDetailStore";
import { auditTypes } from "./parallelCoinManagerStore";

// 类型
import type { VNode } from "vue";
import type { DataTableColumns } from "naive-ui";
import type { ParallelCoinItem } from "@/type/Points";
// 组件名
export default defineComponent({
  name: "parallelCoinManager",
});
</script>

<script lang="ts" setup>
const router = useRouter();
const dialog = useDialog();
const authStore = useAuthStore();

// 列表渲染函数
const createColumns = () => {
  const list: DataTableColumns<ParallelCoinItem> = [
    {
      title: "类型",
      key: "fromChainAddress",
      align: "center",
      width: 120,
      render: (row) => {
        return coinTypeList.getItem(row.type)?.label;
      },
    },
    {
      title: "代币",
      key: "token",
      align: "center",
      width: 120,
    },
    {
      title: "标签",
      key: "fromChainAddress",
      align: "center",
      width: 120,
      render: (row) => {
        return createVNode(
          NEllipsis,
          {},
          {
            default: () => row.label,
          }
        );
      },
    },
    {
      title: "代币icon",
      key: "pointsCover",
      align: "center",
      width: 100,
      render(row) {
        return h(NImage, {
          width: 30,
          src: row.icon,
        });
      },
    },
    {
      title: "持有数量",
      key: "holdNum",
      align: "center",
      width: 120,
    },
    {
      title: "冻结数量",
      key: "freezeNum",
      align: "center",
      width: 120,
    },

    {
      title: "是否可转赠",
      key: "fromChainAddress",
      align: "center",
      width: 120,
      render: (row) => {
        return giftTypeList.getItem(row.giftType)?.label;
      },
    },
    {
      title: "提币是否需要审核",
      key: "fromChainAddress",
      align: "center",
      width: 120,
      render: (row) => {
        return auditTypes.getItem(row.auditType)?.label;
      },
    },
    {
      title: "发行地址",
      key: "fromChainAddress",
      align: "center",
      width: 120,
      render: (row) => {
        return createVNode(
          NEllipsis,
          {},
          {
            default: () => row.address,
          }
        );
      },
    },
    {
      title: "私钥",
      key: "privateKey",
      align: "center",
      width: 120,
      render: (row) => {
        return createVNode(
          NEllipsis,
          {},
          {
            default: () => row.privateKey,
          }
        );
      },
    },
  ];
  if (authStore.isAdmin) {
    list.splice(0, 0, {
      title: "商铺名称",
      key: "merchantName",
      align: "center",
      width: 120,
      render: (points) => {
        return points.merchantUid === 0 ? "平台" : points.merchantName;
      },
    });

    list.splice(0, 0, {
      title: "商户编号",
      key: "merchantUid",
      align: "center",
      width: 100,
    });
  } else {
    list.push({
      title: "操作",
      key: "operaction",
      align: "center",
      width: 200,
      fixed: "right",
      render(row) {
        const btnList: VNode[] = [];
        const size = "small";
        const isAdmin = authStore.isAdmin;
        const isMy = isAdmin ? Number(row.merchantUid) === 0 : Number(authStore.userInfo?.uid) === Number(row.merchantUid);

        if (isMy && !isAdmin) {
          btnList.push(
            createVNode(
              NButton,
              {
                type: "warning",
                secondary: true,
                size,
                onClick: () => {
                  const dialogInfo = dialog.warning({
                    title: "删除代币",
                    content: `确认删除${row.token}吗？`,
                    positiveText: "确认",
                    onPositiveClick: async () => {
                      dialogInfo.loading = true;
                      const res = await delParallelCoin({ id: row.id });
                      if (res) {
                        await getList();
                        commonNotify("success", "代币删除成功");
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
          btnList.push(
            createVNode(
              NButton,
              {
                type: "primary",
                secondary: true,
                size,
                onClick: () => {
                  router.push({
                    name: "parallelCoinDetail",
                    query: {
                      detailType: "EDIT",
                      token: row.token,
                      address: row.address,
                      privateKey: row.privateKey,
                      id: row.id,
                      label: row.label,
                      giftType: row.giftType,
                      type: row.type,
                      icon: row.icon,
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
        const btnBox = createVNode(NSpace, {}, { default: () => btnList });
        return btnBox;
      },
    });
  }
  return list;
};

const { totalPage, getList, searchParam, list, listXWidth, listYHeight, searching, submitSearch } = useListPage(getParallelCoinList, createColumns);
</script>

<template>
  <n-card>
    <screen-header @submitSearch="submitSearch" :searching="searching"></screen-header>
  </n-card>
  <n-data-table :single-line="false" :columns="createColumns()" :data="list" :scroll-x="listXWidth" :max-height="listYHeight" :loading="searching"></n-data-table>
  <n-card>
    <n-pagination v-model:page="searchParam.page" :page-count="totalPage" @update:page="getList" />
  </n-card>
</template>

<style scoped lang="less"></style>
