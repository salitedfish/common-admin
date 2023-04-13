<script lang="ts">
// 框架
import { defineComponent, ref, reactive, createVNode } from "vue";
// 组件库
import { NSpace, NEllipsis, NButton, useDialog } from "naive-ui";
// 自定义组件
import screenSection from "./screenSection.vue";

// 工具库
// 自定义工具
import { useListPage, commonNotify } from "@/util/common";
// 网络请求
import { getParallelRecord, syncParallelCoin } from "@/request/finance";
// store
import { useAuthStore } from "@/store/authStore";
import { parallelRecordStateList, recordTypeList, userTypeList, ParallelRecordState } from "./parallelRecordManagerStore";
// 类型
import type { VNode } from "vue";
import type { ParallelRecordItem } from "@/type/Finance";
import type { DataTableColumns } from "naive-ui";
// 组件名
export default defineComponent({
  name: "parallelRecordManager",
});
</script>

<script lang="ts" setup>
const isAdmin = useAuthStore().isAdmin;
const dialog = useDialog();

// 列表项
const createColumns = () => {
  const list: DataTableColumns<ParallelRecordItem> = [
    {
      title: "token",
      key: "token",
      align: "center",
      width: 120,
      render: (row) => {
        return createVNode(
          NEllipsis,
          {},
          {
            default: () => row.token,
          }
        );
      },
    },

    {
      title: "区块链hash",
      key: "chainHash",
      align: "center",
      width: 120,
      render: (row) => {
        return createVNode(
          NEllipsis,
          {},
          {
            default: () => row.chainHash,
          }
        );
      },
    },

    {
      title: "交易编号",
      key: "transferId",
      align: "center",
      width: 120,
      render: (row) => {
        return createVNode(
          NEllipsis,
          {},
          {
            default: () => row.transferId,
          }
        );
      },
    },

    {
      title: "状态",
      key: "transState",
      align: "center",
      width: 120,
      render: (row) => {
        return parallelRecordStateList.getItem(row.transState)?.label;
      },
    },

    {
      title: "来源地址",
      key: "fromChainAddress",
      align: "center",
      width: 120,
      render: (row) => {
        return createVNode(
          NEllipsis,
          {},
          {
            default: () => row.fromChainAddress,
          }
        );
      },
    },
    {
      title: "来源Uid",
      key: "fromUid",
      align: "center",
      width: 120,
      render: (row) => {
        return createVNode(
          NEllipsis,
          {},
          {
            default: () => row.fromUid,
          }
        );
      },
    },
    {
      title: "来源用户类型",
      key: "createTime",
      align: "center",
      width: 120,
      render: (row) => {
        return userTypeList.getItem(row.fromType)?.label;
      },
    },

    {
      title: "去向地址",
      key: "toChainAddress",
      align: "center",
      width: 120,
      render: (row) => {
        return createVNode(
          NEllipsis,
          {},
          {
            default: () => row.toChainAddress,
          }
        );
      },
    },
    {
      title: "去向Uid",
      key: "toUid",
      align: "center",
      width: 120,
      render: (row) => {
        return createVNode(
          NEllipsis,
          {},
          {
            default: () => row.toUid,
          }
        );
      },
    },
    {
      title: "去向用户类型",
      key: "createTime",
      align: "center",
      width: 120,
      render: (row) => {
        return userTypeList.getItem(row.toType)?.label;
      },
    },

    {
      title: "数量",
      key: "num",
      align: "center",
      width: 120,
    },

    {
      title: "类型",
      key: "createTime",
      align: "center",
      width: 120,
      render: (row) => {
        return recordTypeList.getItem(row.fromType)?.label;
      },
    },

    {
      title: "记录开始时间",
      key: "createTime",
      align: "center",
      width: 180,
    },
    {
      title: "区块链确认时间",
      key: "updateTime",
      align: "center",
      width: 180,
    },

    {
      title: "操作",
      key: "operaction",
      width: 120,
      align: "center",

      fixed: "right",
      render(row) {
        const list: VNode[] = [];
        const size = "small";

        if (row.transState === ParallelRecordState.FAIL && isAdmin) {
          list.push(
            createVNode(
              NButton,
              {
                type: "warning",
                size,
                secondary: true,
                onClick: () => {
                  const dialogInfo = dialog.warning({
                    title: "差错同步确认",
                    content: "确认差错同步吗",
                    positiveText: "确认",
                    onPositiveClick: async () => {
                      dialogInfo.loading = true;
                      const res = await syncParallelCoin({ transferId: row.transferId });
                      if (res) {
                        await getList();
                        commonNotify("success", "差错同步成功");
                      }
                      dialogInfo.loading = false;
                    },
                  });
                },
              },
              { default: () => "差错同步确认" }
            )
          );
        }

        // 用来放按钮的容器
        const btnBox = createVNode(NSpace, {}, { default: () => list });
        return btnBox;
      },
    },
  ];
  //   if (isAdmin) {
  //     list.splice(0, 0, {
  //       title: "商户名称",
  //       key: "merchantName",
  //       align: "center",
  //       width: 100,
  //       render: (row) => {
  //         return row.merchantUid === 0 ? "平台" : row.merchantName;
  //       },
  //     });
  //     list.splice(0, 0, {
  //       title: "商户编号",
  //       key: "merchantUid",
  //       align: "center",
  //       width: 100,
  //     });
  //   }
  return list;
};

// 差错同步确认
// const showDialog = ref(false);
// const syncing = ref(false);
// const syncInfo = reactive({
//   accept: null,
//   inOrderId: "",
//   state: null,
// });
// const syncComfirm = (row: ProfitShareListItem) => {
//   syncInfo.inOrderId = row.inOrderId;
//   showDialog.value = true;
// };
// const comfirmSync = async () => {
//   syncing.value = true;
//   const res = await syncProfitShare(syncInfo);
//   if (res) {
//     await getList();
//     showDialog.value = false;
//     commonNotify("success", "差错同步成功");
//   }
//   syncing.value = false;
// };

const { totalPage, getList, searchParam, list, listXWidth, listYHeight, searching, submitSearch } = useListPage(getParallelRecord, createColumns);
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
