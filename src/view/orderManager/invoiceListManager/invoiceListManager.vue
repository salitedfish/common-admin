<template>
  <n-card>
    <screen-header @submitSearch="submitSearch" :searching="searching"></screen-header>
  </n-card>
  <n-data-table :single-line="false" :columns="createColumns()" :data="list" :scroll-x="listXWidth" :max-height="listYHeight" :loading="searching"></n-data-table>
  <n-card>
    <n-pagination v-model:page="searchParam.page" :page-count="totalPage" @update:page="getList" />
  </n-card>

  <n-modal :show="showApprovialModal" @update:show="(state: boolean) => (showApprovialModal = state)">
    <n-card style="width: 600px" title="开票审核" :bordered="false" size="huge" role="dialog" aria-modal="true">
      <template #header-extra>
        <custom-icon name="guanbi" :size="16" @click="showApprovialModal = false"></custom-icon>
      </template>

      <n-form label-placement="left" label-width="100px" label-align="left">
        <n-form-item label="是否同意:" required>
          <n-select v-model:value="approvialInfo.state" :options="approvialInvoiceList" placeholder="请选择是否同意" />
        </n-form-item>
        <n-form-item label="发票照片:" v-show="approvialInfo.state === ApprovialInvoice.YES" required>
          <common-upload type="img" v-model="fileList" :max="1"></common-upload>
        </n-form-item>
      </n-form>

      <template #footer>
        <div style="display: flex; justify-content: end">
          <n-button type="primary" inline-block @click="handleApprovialComfirm" :disabled="approvialIng" :loading="approvialIng">确认</n-button>
        </div>
      </template>
    </n-card>
  </n-modal>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "expressListManager",
});
</script>
<script lang="ts" setup>
// 框架
import { h, ref, reactive } from "vue";
// 组件库
import { NImage, NEllipsis, NSpace, NButton } from "naive-ui";
// 自定义组件
import screenHeader from "./screenHeader.vue";
import commonUpload from "@/component/common/commonUpload.vue";
import customIcon from "@/component/common/customIcon.vue";
// 工具库
// 自定义工具
import { commonNotify, useListPage } from "@/util/common";
// 网络请求
import { getInvoiceList, addInvoice } from "@/request/order";
// store
import { useCommonStore } from "@/store/commonStore";
import { invoiceStateList, invoiceTitleTypeList, invoiceTypeList, InvoiceState, approvialInvoiceList, ApprovialInvoice } from "./invoiceListManagerStore";
// 类型
import type { VNode } from "vue";
import type { DataTableColumns } from "naive-ui";
import type { InvoiceListItem } from "@/type/Order";
import type { FileUpload } from "@/type/Common";

const commonStore = useCommonStore();

// 列表渲染函数
const createColumns = () => {
  const list: DataTableColumns<InvoiceListItem> = [
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
      title: "开票金额（元）",
      key: "invoiceAmount",
      align: "center",
      width: 140,
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
      title: "抬头类型",
      key: "titleType",
      align: "center",
      width: 140,
      render: (invoice) => {
        return invoiceTitleTypeList.getItem(invoice.titleType)?.label;
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
      title: "开票状态",
      key: "invoiceState",
      align: "center",
      width: 140,

      render: (invoice) => {
        return invoiceStateList.getItem(invoice.invoiceState)?.label;
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
      title: "申请时间",
      key: "createTime",
      align: "center",
      width: 180,
    },
    {
      title: "审核时间",
      key: "updateTime",
      align: "center",
      width: 180,
      render: (invoice) => {
        return h(
          NEllipsis,
          {},
          {
            default: () => invoice.updateTime || "-",
          }
        );
      },
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
                  approvialInfo.orderId = invoice.orderId;
                  approvialInfo.state = ApprovialInvoice.NO;
                  showApprovialModal.value = true;
                },
              },
              {
                default: () => "审核",
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

/**审核开票 */
const fileList = ref<FileUpload[]>([]);
const showApprovialModal = ref(false);
const approvialIng = ref(false);
const approvialInfo = reactive({
  orderId: "",
  state: ApprovialInvoice.NO,
  electronicImage: "",
});
const handleApprovialComfirm = async () => {
  if (approvialInfo.state === ApprovialInvoice.YES && fileList.value.length <= 0) {
    commonNotify("warning", "请上传发票图片");
    return;
  }
  for (const item of fileList.value) {
    approvialInfo.electronicImage = item.hashName;
  }
  approvialIng.value = true;
  const res = await addInvoice(approvialInfo);
  if (res) {
    commonNotify("success", "开票审核完成");
    await getList();
    showApprovialModal.value = false;
  }
  approvialIng.value = false;
};
</script>

<style scoped lang="less">
.step-box {
  padding: 4px;
}
</style>
