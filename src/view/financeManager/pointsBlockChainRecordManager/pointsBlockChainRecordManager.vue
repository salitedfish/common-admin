<template>
  <n-card>
    <screen-section @submitSearch="submitSearch" :searching="searching" :checkedRowKeys="checkedRowKeysRef" @clearSelected="clearSelected"></screen-section>
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
    :row-key="(item: PointsChainRecordItem) => item.transferId"
    v-model:checked-row-keys="checkedRowKeysRef"
    :row-class-name="rowClassName"
  ></n-data-table>
  <n-card>
    <n-pagination v-model:page="searchParam.page" :page-count="totalPage" @update:page="getList" />
  </n-card>
</template>

<script lang="ts">
// 框架
import { h, ref } from "vue";
import { defineComponent } from "vue";
// 组件库
import { NSpace, NButton, useDialog, NEllipsis } from "naive-ui";
// 自定义组件
import screenSection from "./screenSection.vue";
// 工具库
import { useDeepInclude } from "@ultra-man/noa";
// 自定义工具
import { useListPage, commonNotify } from "@/util/common";
// 网络请求
import { getPointsChainRecord, syncPointsChainRecord } from "@/request/finance";
// store
import { RecordType } from "../parallelRecordManager/parallelRecordManagerStore";
import { userTypeList, transferStateList, recordTypeList, TransferState } from "../goodsBlockChainRecordManager/goodsBlockChainRecordManagerStore";
// 类型
import type { VNode } from "vue";
import type { DataTableColumns, DataTableRowKey } from "naive-ui";
import type { PointsChainRecordItem } from "@/type/Finance";
export default defineComponent({
  name: "pointsBlockChainRecordManager",
});
</script>
<script lang="ts" setup>
const dialog = useDialog();

// 列表项
const createColumns = () => {
  const list: DataTableColumns<PointsChainRecordItem> = [
    {
      fixed: "left",
      type: "selection",
      multiple: true,
      disabled: (item) => {
        return TransferState.FAIL !== item.transState || item.recordType === RecordType.FIRST_BUY;
      },
    },
    {
      title: "交易编号",
      key: "transferId",
      align: "center",
      width: 180,
      fixed: "left",
    },
    {
      title: "积分编号",
      key: "pointsId",
      align: "center",
      width: 180,
    },
    {
      title: "积分名称",
      key: "pointsName",
      align: "center",
      width: 120,
    },
    // {
    //   title: "积分封面",
    //   key: "pointsCover",
    //   align: "center",
    //   width: 100,
    //   render(row) {
    //     return h(NImage, {
    //       width: 30,
    //       src: row.pointsCover,
    //     });
    //   },
    // },
    {
      title: "token",
      key: "token",
      align: "center",
      width: 120,
      render: (row) => {
        return h(
          NEllipsis,
          {},
          {
            default: () => row.token,
          }
        );
      },
    },
    {
      title: "积分数量",
      key: "num",
      align: "center",
      width: 120,
    },

    {
      title: "交易类型",
      key: "recordType",
      align: "center",
      width: 100,
      render: (row) => {
        return recordTypeList.getItem(row.recordType)?.label;
      },
    },
    {
      title: "来源用户类型",
      key: "fromType",
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
      width: 100,
    },
    {
      title: "来源地址",
      key: "fromChainAddress",
      align: "center",
      width: 180,
      render: (row) => {
        return h(
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
      key: "toType",
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
      width: 100,
    },
    {
      title: "去向地址",
      key: "toChainAddress",
      align: "center",
      width: 180,
      render: (row) => {
        return h(
          NEllipsis,
          {},
          {
            default: () => row.toChainAddress,
          }
        );
      },
    },
    {
      title: "区块链哈希",
      key: "chainHash",
      align: "center",
      width: 180,
      render: (row) => {
        return h(
          NEllipsis,
          {},
          {
            default: () => row.chainHash,
          }
        );
      },
    },

    {
      title: "交易状态",
      key: "transState",
      align: "center",
      width: 100,
      render: (row) => {
        return transferStateList.getItem(row.transState)?.label;
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
  return list;
};

const rowClassName = (row: PointsChainRecordItem) => {
  if (TransferState.FAIL === row.transState && row.recordType !== RecordType.FIRST_BUY) {
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

const { totalPage, getList, searchParam, list, listXWidth, listYHeight, searching, submitSearch } = useListPage(getPointsChainRecord, createColumns);
</script>

<style lang="less">
.fail {
  td {
    background: var(--tabel-fail-bg-color) !important;
  }
}
</style>
