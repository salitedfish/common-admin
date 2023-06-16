<script lang="ts">
// 框架
import { defineComponent, createVNode, ref } from "vue";
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
import { parallelRecordStateList, recordTypeList, userTypeList, ParallelRecordState, RecordType } from "./parallelRecordManagerStore";
// 类型
import type { VNode } from "vue";
import type { ParallelRecordItem } from "@/type/Finance";
import type { DataTableColumns, DataTableRowKey } from "naive-ui";
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
      fixed: "left",
      type: "selection",
      multiple: true,
      disabled: (item) => {
        return ParallelRecordState.FAIL !== item.transState || item.recordType === RecordType.FIRST_BUY;
      },
    },
    {
      title: "交易编号",
      key: "transferId",
      align: "center",
      width: 180,
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
        return recordTypeList.getItem(row.recordType)?.label;
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
      title: "来源地址",
      key: "fromChainAddress",
      align: "center",
      width: 180,
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
      title: "去向用户类型",
      key: "createTime",
      align: "center",
      width: 120,
      render: (row) => {
        return userTypeList.getItem(row.toType)?.label;
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
      title: "去向地址",
      key: "toChainAddress",
      align: "center",
      width: 180,
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
      title: "状态",
      key: "transState",
      align: "center",
      width: 120,
      render: (row) => {
        return parallelRecordStateList.getItem(row.transState)?.label;
      },
    },

    {
      title: "交易时间",
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

const rowClassName = (row: ParallelRecordItem) => {
  if (ParallelRecordState.FAIL === row.transState && row.recordType !== RecordType.FIRST_BUY) {
    return "fail";
  }
};

const checkedRowKeysRef = ref<DataTableRowKey[]>([]);
const clearSelected = () => {
  checkedRowKeysRef.value = [];
};
const changeSelectList = (rowKeys: DataTableRowKey[]) => {
  checkedRowKeysRef.value = rowKeys;
};

const { totalPage, getList, searchParam, list, listXWidth, listYHeight, searching, submitSearch } = useListPage(getParallelRecord, createColumns);
</script>

<template>
  <n-card>
    <screen-section @submitSearch="submitSearch" :searching="searching" @clearSelected="clearSelected" :checkedRowKeys="checkedRowKeysRef"></screen-section>
  </n-card>
  <n-data-table
    :single-line="false"
    :columns="createColumns()"
    :data="list"
    :scroll-x="listXWidth"
    :max-height="listYHeight"
    :loading="searching"
    :scrollbar-props="{ trigger: 'none' }"
    @update:checked-row-keys="changeSelectList"
    :row-key="(item: ParallelRecordItem) => item.transferId"
    v-model:checked-row-keys="checkedRowKeysRef"
    :row-class-name="rowClassName"
  ></n-data-table>
  <n-card>
    <n-pagination v-model:page="searchParam.page" :page-count="totalPage" @update:page="getList" />
  </n-card>
</template>

<style lang="less">
.fail {
  td {
    background: var(--tabel-fail-bg-color) !important;
  }
}
</style>
