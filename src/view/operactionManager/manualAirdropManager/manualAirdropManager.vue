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
import { defineComponent } from "vue";
export default defineComponent({
  name: "manualAirdropManager",
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
import whiteListUploadBtn from "@/component/whiteList/whiteListUploadBtn.vue";
// 工具库
// 自定义工具
import { useListPage, commonNotify } from "@/util/common";
// 网络请求
import { deleteWhiteList } from "@/request/common";
import { getListManualAirDrop, deleteManualAirDrop, updateManualAirDropState, syncManualAirDrop } from "@/request/operator";
// store
import { useAuthStore } from "@/store/authStore";
import { airDropItemTypeList, airDropTypeList, airDropStateList, airDropTaskStateList, AirDropStateType, AirDropTypeType, AirDropTaskStateType } from "./manualAirdropManagerStore";
import { WhiteListType } from "@/type/Common";
// 类型
import type { VNode } from "vue";
import type { DataTableColumns } from "naive-ui";
import type { ManualAirDropListItem } from "@/type/Operator";

const isAdmin = useAuthStore().isAdmin;
const authStore = useAuthStore();
const dialog = useDialog();
const router = useRouter();

// 列表项
const createColumns = () => {
  const list: DataTableColumns<ManualAirDropListItem> = [
    {
      title: "空投编号",
      key: "id",
      align: "center",
      width: 100,
    },
    {
      title: "空投名称",
      key: "name",
      width: 120,
      align: "center",
      fixed: "left",
    },

    {
      title: "空投类型",
      key: "itemType",
      align: "center",
      width: 120,
      render(row) {
        return airDropTypeList.getItem(row.type)?.label;
      },
    },
    {
      title: "空投物品类型",
      key: "itemType",
      align: "center",
      width: 120,
      render(row) {
        return airDropItemTypeList.getItem(row.rewardType)?.label;
      },
    },
    {
      title: "空投物品名称",
      key: "rewardName",
      align: "center",
      width: 160,
    },
    {
      title: "名单人数",
      key: "totalUsers",
      align: "center",
      width: 100,
    },
    {
      title: "空投人数",
      key: "hitUsers",
      align: "center",
      width: 100,
    },
    {
      title: "空投状态",
      width: 100,
      align: "center",
      key: "state",
      render(row) {
        return airDropStateList.getItem(row.state)?.label;
      },
    },
    {
      title: "空投进度",
      width: 100,
      align: "center",
      key: "taskState",
      render(row) {
        return airDropTaskStateList.getItem(row.taskState)?.label;
      },
    },
    {
      title: "空投时间",
      key: "startTime",
      align: "center",
      width: 180,
      render(row) {
        return row.startTime ? row.startTime : "-";
      },
    },
    {
      title: "结果备注",
      key: "note",
      align: "center",
      width: 120,
    },
    {
      title: "操作",
      key: "operaction",
      width: 200,
      align: "center",
      fixed: "right",
      render(row) {
        const list: VNode[] = [];
        const size = "small";
        const isMy = isAdmin ? Number(row.merchantUid) === 0 : Number(authStore.userInfo?.uid) === Number(row.merchantUid);

        if (row.state === AirDropStateType.OFFLINE && row.type === AirDropTypeType.MANUAL && row.taskState === AirDropTaskStateType.BEFORE_AIR_DROP) {
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
                      const res = await deleteManualAirDrop({ id: row.id });
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
            // 编辑
            list.push(
              h(
                NButton,
                {
                  size,
                  type: "primary",
                  secondary: true,
                  onClick: () => {
                    router.push({
                      name: "editManualAirdrop",
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
            // 上传白名单
            list.push(h(whiteListUploadBtn, { id: String(row.id), whiteListType: WhiteListType.AIR_DROP }));
            // 删除白名单
            list.push(
              h(
                NButton,
                {
                  type: "warning",
                  size,
                  secondary: true,
                  onClick: () => {
                    const dialogInfo = dialog.warning({
                      title: "删除白名单",
                      content: `确认删除${row.name}的白名单吗？`,
                      positiveText: "确认",
                      onPositiveClick: async () => {
                        dialogInfo.loading = true;
                        const res = await deleteWhiteList({ id: String(row.id) }, WhiteListType.AIR_DROP);
                        if (res) {
                          await getList();
                          commonNotify("success", "白名单删除成功");
                        }
                        dialogInfo.loading = false;
                      },
                    });
                  },
                },
                {
                  default: () => "删除白名单",
                }
              )
            );
          }
        }
        // 空投上下线
        const lineActionLabel = airDropStateList.getItem(row.state)?.action.label;
        const lineActionValue = airDropStateList.getItem(row.state)?.action.value;
        if (row.taskState === AirDropTaskStateType.BEFORE_AIR_DROP && isMy && lineActionValue !== undefined) {
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
                      const res = await updateManualAirDropState({ id: row.id, state: lineActionValue });
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
        // 差错同步-补发
        if (row.taskState === AirDropTaskStateType.AIR_DROP_ING && isMy) {
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
                    content: `确认补发${row.name}吗？`,
                    positiveText: "确认",
                    onPositiveClick: async () => {
                      dialogInfo.loading = true;
                      const res = await syncManualAirDrop({ id: row.id });
                      if (res) {
                        await getList();
                        commonNotify("success", "空投补发成功");
                      }
                      dialogInfo.loading = false;
                    },
                  });
                },
              },
              {
                default: () => "补发",
              }
            )
          );
        }

        list.push(
          h(
            NButton,
            {
              type: "primary",
              size,
              secondary: true,
              onClick: () => {
                router.push({
                  name: "manaualAirdropWhiteListManager",
                  query: { id: row.id, name: row.name },
                });
              },
            },
            {
              default: () => "查看白名单",
            }
          )
        );

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

const { totalPage, getList, searchParam, list, listXWidth, listYHeight, searching, submitSearch } = useListPage(getListManualAirDrop, createColumns, { heightLevel: 1 });
</script>

<style scoped lang="less"></style>
