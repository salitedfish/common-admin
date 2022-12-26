<template>
  <n-card>
    <screen-header @submitSearch="submitSearch" :searching="searching"></screen-header>
  </n-card>
  <n-data-table :single-line="false" :columns="createColumns()" :data="list" :scroll-x="listXWidth" :max-height="listYHeight" :loading="searching"></n-data-table>
  <n-card>
    <n-pagination v-model:page="searchParam.page" :page-count="totalPage" @update:page="getList" />
  </n-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "expressListManager",
});
</script>
<script lang="ts" setup>
// 框架
import { h } from "vue";
import { useRouter } from "vue-router";
// 组件库
import { NImage, NEllipsis, NSpace, NButton } from "naive-ui";
// 自定义组件
import screenHeader from "./screenHeader.vue";
// 工具库
// 自定义工具
import { useListPage } from "@/util/common";
// 网络请求
import { getInvoiceList } from "@/request/order";
// store
import { invoiceStateList, invoiceTitleTypeList, invoiceTypeList, InvoiceState } from "./invoiceListManagerStore";
// 类型
import type { VNode } from "vue";
import type { DataTableColumns } from "naive-ui";
import type { InvoiceListItem } from "@/type/Order";

const router = useRouter();

// 列表渲染函数
const createColumns = () => {
  const list: DataTableColumns<InvoiceListItem> = [
    {
      title: "税号",
      key: "tin",
      align: "center",
      width: 180,
      render: (invoice) => {
        return h(
          NEllipsis,
          {},
          {
            default: () => invoice.tin || "-",
          }
        );
      },
    },
    {
      title: "发票抬头",
      key: "title",
      align: "center",
      width: 180,
      render: (invoice) => {
        return h(
          NEllipsis,
          {},
          {
            default: () => invoice.title || "-",
          }
        );
      },
    },
    {
      title: "抬头类型",
      key: "titleType",
      align: "center",
      width: 140,
      render: (invoice) => {
        return invoiceTitleTypeList.getItem(invoice.titleType)?.label;
      },
    },
    {
      title: "发票类型",
      key: "type",
      align: "center",
      width: 140,
      render: (invoice) => {
        return invoiceTypeList.getItem(invoice.type)?.label;
      },
    },
    {
      title: "订单编号",
      key: "orderId",
      align: "center",
      width: 180,
      render: (invoice) => {
        return h(
          NEllipsis,
          {},
          {
            default: () => invoice.orderId || "-",
          }
        );
      },
    },
    {
      title: "用户编号",
      key: "uid",
      align: "center",
      width: 180,
      render: (invoice) => {
        return h(
          NEllipsis,
          {},
          {
            default: () => invoice.uid || "-",
          }
        );
      },
    },
    {
      title: "电子发票",
      key: "electronicImage",
      align: "center",
      width: 100,
      render(row) {
        return h(NImage, {
          width: 30,
          src: row.electronicImage,
        });
      },
    },
    {
      title: "开票金额（元）",
      key: "invoiceAmount",
      align: "center",
      width: 140,
    },
    {
      title: "开票状态",
      key: "invoiceState",
      align: "center",
      width: 140,

      render: (invoice) => {
        return invoiceStateList.getItem(invoice.invoiceState)?.label;
      },
    },
    {
      title: "注册地址",
      key: "registerAddress",
      align: "center",
      width: 180,
      render: (invoice) => {
        return h(
          NEllipsis,
          {},
          {
            default: () => invoice.registerAddress || "-",
          }
        );
      },
    },
    {
      title: "注册电话",
      key: "registerPhone",
      align: "center",
      width: 180,
      render: (invoice) => {
        return h(
          NEllipsis,
          {},
          {
            default: () => invoice.registerPhone || "-",
          }
        );
      },
    },
    {
      title: "银行账户",
      key: "bankCardCode",
      align: "center",
      width: 180,
      render: (invoice) => {
        return h(
          NEllipsis,
          {},
          {
            default: () => invoice.bankCardCode || "-",
          }
        );
      },
    },
    {
      title: "开户银行",
      key: "bankName",
      align: "center",
      width: 180,
      render: (invoice) => {
        return h(
          NEllipsis,
          {},
          {
            default: () => invoice.bankName || "-",
          }
        );
      },
    },
    {
      title: "申请时间",
      key: "createTime",
      align: "center",
      width: 180,
    },
    {
      title: "开票时间",
      key: "updateTime",
      align: "center",
      width: 180,
    },
    {
      title: "操作",
      key: "operaction",
      align: "center",
      width: 80,
      fixed: "right",
      render(invoice) {
        const btnList: VNode[] = [];
        if (invoice.invoiceState === InvoiceState.IN_INVOICE) {
          btnList.push(
            h(
              NButton,
              {
                type: "primary",
                size: "small",
                secondary: true,
                onClick: () => {
                  router.push({
                    name: "addInvoice",
                    query: {
                      id: invoice.orderId,
                    },
                  });
                },
              },
              {
                default: () => "开票",
              }
            )
          );
        }
        // 用来放按钮的容器
        const btnBox = h(NSpace, {}, { default: () => btnList });
        return btnBox;
      },
    },
  ];

  return list;
};

const { totalPage, getList, searchParam, list, listXWidth, listYHeight, searching, submitSearch } = useListPage(getInvoiceList, createColumns);
</script>

<style scoped lang="less">
.step-box {
  padding: 4px;
}
</style>
