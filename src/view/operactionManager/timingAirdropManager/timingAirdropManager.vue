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
  name: "timingAirdropManager",
});
</script>
<script lang="ts" setup>
// 框架
import { h } from "vue";
import { useRouter } from "vue-router";
// 组件库
import { NSpace, NButton, useDialog } from "naive-ui";
// 自定义组件
import screenSection from "./screenSection.vue";
// 工具库
// 自定义工具
import { useListPage, commonNotify } from "@/util/common";
// 网络请求
import { getListTimingAirDrop, deleteTimingAirDrop, updateTimingAirDropState } from "@/request/operator";
// store
import { useAuthStore } from "@/store/authStore";
import { airDropTimeTypeList } from "./timingAirdropManagerStore";
import { airDropItemTypeList, airDropStateList, AirDropStateType } from "../manualAirdropManager/manualAirdropManagerStore";
// 类型
import type { VNode } from "vue";
import type { DataTableColumns } from "naive-ui";
import type { TimingAirDropListItem } from "@/type/Operator";

const isAdmin = useAuthStore().isAdmin;
const authStore = useAuthStore();
const dialog = useDialog();
const router = useRouter();

// 列表项
const createColumns = () => {
  const list: DataTableColumns<TimingAirDropListItem> = [
    {
      title: "任务编号",
      key: "id",
      align: "center",
      width: 100,
    },
    {
      title: "任务名称",
      key: "name",
      width: 120,
      align: "center",
      fixed: "left",
    },

    {
      title: "空投物品类型",
      key: "itemType",
      align: "center",
      width: 120,
      render(row) {
        return airDropItemTypeList.getItem(row.itemType)?.label;
      },
    },
    {
      title: "空投物品名称",
      key: "itemName",
      align: "center",
      width: 160,
    },
    {
      title: "执行类型",
      key: "timeType",
      align: "center",
      width: 120,
      render: (row) => {
        return airDropTimeTypeList.getItem(row.timeType)?.label;
      },
    },
    {
      title: "总执行次数",
      key: "totalNum",
      align: "center",
      width: 120,
      render: (row) => {
        return row.totalNum === 0 ? "不限次数" : row.totalNum;
      },
    },
    {
      title: "已执行次数",
      key: "runNum",
      align: "center",
      width: 120,
    },
    {
      title: "任务状态",
      width: 100,
      align: "center",
      key: "state",
      render(row) {
        return airDropStateList.getItem(row.state)?.label;
      },
    },
    {
      title: "操作",
      key: "operaction",
      align: "center",
      width: 200,
      fixed: "right",
      render(row) {
        const list: VNode[] = [];
        const size = "small";
        const isMy = isAdmin ? Number(row.merchantUid) === 0 : Number(authStore.userInfo?.uid) === Number(row.merchantUid);
        // 查看空投
        list.push(
          h(
            NButton,
            {
              size,
              type: "primary",
              secondary: true,
              onClick: () => {
                router.push({
                  name: "checkTimingAirdrop",
                  query: {
                    id: row.id,
                    isCheck: "true",
                  },
                });
              },
            },
            {
              default: () => "详情",
            }
          )
        );
        if (row.state === AirDropStateType.OFFLINE) {
          // 删除空投
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
                    content: `确认删除${row.name}吗？`,
                    positiveText: "确认",
                    onPositiveClick: async () => {
                      dialogInfo.loading = true;
                      const res = await deleteTimingAirDrop({ id: row.id });
                      if (res) {
                        await getList();
                        commonNotify("success", "空投删除成功");
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
          if (isMy) {
            // 编辑空投
            list.push(
              h(
                NButton,
                {
                  size,
                  type: "primary",
                  secondary: true,
                  onClick: () => {
                    router.push({
                      name: "editTimingAirdrop",
                      query: {
                        id: row.id,
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
        }
        // 空投上下线
        const lineActionLabel = airDropStateList.getItem(row.state)?.action.label;
        const lineActionValue = airDropStateList.getItem(row.state)?.action.value;
        if (isMy && lineActionValue !== undefined) {
          list.push(
            h(
              NButton,
              {
                size,
                type: "primary",
                secondary: true,
                onClick: () => {
                  const dialogInfo = dialog.success({
                    title: lineActionLabel,
                    content: `确认${lineActionLabel}${row.name}吗？`,
                    positiveText: "确认",
                    onPositiveClick: async () => {
                      dialogInfo.loading = true;
                      const res = await updateTimingAirDropState({ id: row.id, state: lineActionValue });
                      if (res) {
                        await getList();
                        commonNotify("success", `空投${lineActionLabel}成功`);
                      }
                      dialogInfo.loading = false;
                    },
                  });
                },
              },
              {
                default: () => airDropStateList.getItem(row.state)?.action.label,
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
        return row.merchantUid === "0" ? "平台" : row.merchantName;
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

const { totalPage, getList, searchParam, list, listXWidth, listYHeight, searching, submitSearch } = useListPage(getListTimingAirDrop, createColumns);
</script>

<style scoped lang="less"></style>
