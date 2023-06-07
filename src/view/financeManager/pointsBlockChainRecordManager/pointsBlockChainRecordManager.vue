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
import { defineComponent } from "vue";
// 组件库
import { NSpace, NButton, useDialog, NEllipsis } from "naive-ui";
// 自定义组件
import screenSection from "./screenSection.vue";
// 工具库
// 自定义工具
import { useListPage, commonNotify } from "@/util/common";
// 网络请求
import { getPointsChainRecord, syncPointsChainRecord } from "@/request/finance";
// store
import { RecordType } from "../parallelRecordManager/parallelRecordManagerStore";
import { userTypeList, transferStateList, recordTypeList, TransferState } from "../goodsBlockChainRecordManager/goodsBlockChainRecordManagerStore";
// 类型
import type { VNode } from "vue";
import type { DataTableColumns } from "naive-ui";
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

    {
      title: "操作",
      key: "operaction",
      align: "center",
      width: 100,
      fixed: "right",
      render(row) {
        const list: VNode[] = [];
        const size = "small";
        if (TransferState.FAIL === row.transState && row.recordType !== RecordType.FIRST_BUY) {
          list.push(
            h(
              NButton,
              {
                size,
                type: "warning",
                secondary: true,
                onClick: () => {
                  const dialogInfo = dialog.warning({
                    title: "补发",
                    content: "确认同步吗？",
                    positiveText: "确认",
                    onPositiveClick: async () => {
                      dialogInfo.loading = true;
                      const res = await syncPointsChainRecord({ transferId: row.transferId });
                      if (res) {
                        await getList();
                        commonNotify("success", "同步成功");
                      }
                      dialogInfo.loading = false;
                    },
                  });
                },
              },
              {
                default: () => "差错同步",
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
  return list;
};

const { totalPage, getList, searchParam, list, listXWidth, listYHeight, searching, submitSearch } = useListPage(getPointsChainRecord, createColumns);
</script>

<style scoped lang="less"></style>
