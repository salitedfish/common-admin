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
    :row-key="(item: GoodsChainRecordItem) => item.transferId"
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
// 自定义工具
import { useListPage, commonNotify } from "@/util/common";
// 网络请求
import { getGoodsChainRecord, syncGoodsChainRecord } from "@/request/finance";
// store
import { userTypeList, transferStateList, recordTypeList, TransferState } from "./goodsBlockChainRecordManagerStore";
// 类型
import type { VNode } from "vue";
import type { DataTableColumns, DataTableRowKey } from "naive-ui";
import type { GoodsChainRecordItem } from "@/type/Finance";
export default defineComponent({
  name: "goodsBlockChainRecordManager",
});
</script>
<script lang="ts" setup>
const dialog = useDialog();

// 列表项
const createColumns = () => {
  const list: DataTableColumns<GoodsChainRecordItem> = [
    {
      type: "selection",
      multiple: true,
      disabled: (item) => {
        return TransferState.FAIL !== item.transState;
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
      title: "商品编号",
      key: "goodsId",
      align: "center",
      width: 180,
    },
    {
      title: "商品名称",
      key: "goodsName",
      align: "center",
      width: 120,
    },
    // {
    //   title: "商品封面",
    //   key: "goodsCover",
    //   align: "center",
    //   width: 100,
    //   render(row) {
    //     return h(NImage, {
    //       width: 30,
    //       src: row.goodsCover,
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

const rowClassName = (row: GoodsChainRecordItem) => {
  if (TransferState.FAIL === row.transState) {
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

const { totalPage, getList, searchParam, list, listXWidth, listYHeight, searching, submitSearch } = useListPage(getGoodsChainRecord, createColumns);
</script>

<style lang="less">
.fail {
  td {
    background: var(--tabel-fail-bg-color) !important;
  }
}
</style>
