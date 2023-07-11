<script lang="ts">
// 框架
import { defineComponent, ref, reactive, createVNode } from "vue";
import { NSpace, NButton } from "naive-ui";
// 组件库
// 自定义组件
import screenHeader from "./screenHeader.vue";
import customIcon from "@/component/common/customIcon.vue";
// 工具库
// 自定义工具
import { useListPage, commonNotify } from "@/util/common";
// 网络请求
import { getParallelCoinWithdrawList, approvialParallelCoinWithdraw } from "@/request/finance";
// store
import { useAuthStore } from "@/store/authStore";
import { parallelCoinWithdrawStates, ParallelCoinWithdrawState } from "./parallelCoinWithdrawManagerStore";
// 类型
import type { VNode } from "vue";
import type { DataTableColumns } from "naive-ui";
import type { ParallelCoinWithdrawListItem } from "@/type/Finance";
// 组件名
export default defineComponent({
  name: "parallelCoinWithdrawManager",
});
</script>

<script lang="ts" setup>
const isAdmin = useAuthStore().isAdmin;
// 列表渲染函数
const createColumns = () => {
  const list: DataTableColumns<ParallelCoinWithdrawListItem> = [
    {
      title: "用户编号",
      key: "uid",
      width: 100,
      align: "center",
      fixed: "left",
    },
    {
      title: "token",
      key: "token",
      align: "center",
      width: 120,
    },
    {
      title: "数量",
      key: "num",
      align: "center",
      width: 120,
    },
    {
      title: "提币地址",
      key: "toAddress",
      align: "center",
      width: 200,
    },
    {
      title: "申请时间",
      key: "createTime",
      align: "center",
      width: 180,
    },
    {
      title: "审核时间",
      key: "auditorTime",
      align: "center",
      width: 180,
    },

    {
      title: "状态",
      key: "state",
      align: "center",
      width: 120,

      render: (row) => {
        return parallelCoinWithdrawStates.getItem(row.state)?.label;
      },
    },

    {
      title: "操作",
      key: "operaction",
      align: "center",
      width: 340,
      fixed: "right",
      render(row) {
        const size = "small";

        const btnList: VNode[] = [];
        if (row.state === ParallelCoinWithdrawState.APPROVIAL_ING) {
          btnList.push(
            createVNode(
              NButton,
              {
                type: "primary",
                size,
                secondary: true,
                onClick: () => {
                  currentInfo.value.id = row.id;
                  showModal.value = true;
                },
              },
              {
                default: () => "审核",
              }
            )
          );
        }
        // 用来放按钮的容器
        const btnBox = createVNode(NSpace, {}, { default: () => btnList });

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
const { totalPage, getList, searchParam, list, listXWidth, listYHeight, searching, submitSearch } = useListPage(getParallelCoinWithdrawList, createColumns, { heightLevel: 1 });

// 审核
const showModal = ref(false);
const currentInfo = ref({
  id: NaN,
  state: null,
});
const approvialIng = ref(false);
const comfirmApprovial = async () => {
  const { id, state } = currentInfo.value;
  approvialIng.value = true;
  const res = await approvialParallelCoinWithdraw({
    id,
    state,
  });
  if (res) {
    commonNotify("success", "提币审核完成");
    getList();
    showModal.value = false;
  }
  approvialIng.value = false;
};
</script>

<template>
  <n-card>
    <screen-header @submitSearch="submitSearch" :searching="searching"></screen-header>
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

  <n-modal :show="showModal" @update:show="(state: boolean) => (showModal = state)">
    <n-card style="width: 600px" title="提币审核" :bordered="false" size="huge" role="dialog" aria-modal="true">
      <template #header-extra>
        <custom-icon name="guanbi" :size="16" @click="showModal = false"></custom-icon>
      </template>

      <n-form label-placement="left" label-width="80px" label-align="left">
        <n-form-item label="审核结果:">
          <n-select v-model:value="currentInfo.state" :options="parallelCoinWithdrawStates.slice(1)" placeholder="请选择审核结果" />
        </n-form-item>
      </n-form>

      <template #footer>
        <div style="display: flex; justify-content: end">
          <n-button type="primary" inline-block @click="comfirmApprovial" :disabled="approvialIng" :loading="approvialIng">确认</n-button>
        </div>
      </template>
    </n-card>
  </n-modal>
</template>

<style scoped lang="less"></style>
