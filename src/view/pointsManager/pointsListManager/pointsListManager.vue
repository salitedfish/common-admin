<template>
  <n-card>
    <screen-header @submitSearch="submitSearch" :searching="searching"></screen-header>
  </n-card>
  <n-data-table :single-line="false" :columns="createColumns()" :data="list" :scroll-x="listXWidth" :max-height="listYHeight" :loading="searching"></n-data-table>
  <n-card>
    <n-pagination v-model:page="searchParam.page" :page-count="totalPage" @update:page="getList" />
  </n-card>

  <!-- 改变积分状态的modal，包括提交审核、审核失败等 -->
  <n-modal :show="showUpdatePointsModal" @update:show="(state: boolean) => (showUpdatePointsModal = state)">
    <n-card style="width: 600px" :title="updateInfo.actionText" :bordered="false" size="huge" role="dialog" aria-modal="true">
      <template #header-extra>
        <custom-icon name="guanbi" :size="16" @click="showUpdatePointsModal = false"></custom-icon>
      </template>

      <n-form
        label-placement="left"
        label-width="80px"
        label-align="left"
        v-if="[PointsState.APPROVIAL_FAILED, PointsState.APPROVIAL_FAILED_NEW, PointsState.PUBLISHING, PointsState.ADD_PUBLISHING].includes(updateParams.pointsState)"
      >
        <n-form-item label="审核备注:">
          <n-input v-model:value="updateParams.auditNote"></n-input>
        </n-form-item>
        <n-form-item label="审核结果:" v-if="[PointsState.APPROVIAL_FAILED, PointsState.PUBLISHING].includes(updateParams.pointsState)">
          <n-select v-model:value="updateParams.pointsState" :options="approvialList" placeholder="请选择审核结果" :disabled="updateLoading" />
        </n-form-item>
        <n-form-item label="审核结果:" v-if="[PointsState.APPROVIAL_FAILED_NEW, PointsState.ADD_PUBLISHING].includes(updateParams.pointsState)">
          <n-select v-model:value="updateParams.pointsState" :options="approvialNewList" placeholder="请选择审核结果" :disabled="updateLoading" />
        </n-form-item>
      </n-form>
      <div v-else>{{ `确认${updateInfo.actionText}吗？` }}</div>

      <template #footer>
        <div style="display: flex; justify-content: end">
          <n-button type="primary" inline-block @click="comfirmUpdate" :disabled="updateLoading" :loading="updateLoading">确认</n-button>
        </div>
      </template>
    </n-card>
  </n-modal>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "pointsListManager",
});
</script>
<script lang="ts" setup>
// 框架
import { ref, h, reactive } from "vue";
import { useRouter } from "vue-router";
// 组件库
import { NButton, NSpace, useDialog } from "naive-ui";
// 自定义组件
import screenHeader from "./screenHeader.vue";
import customIcon from "@/component/common/customIcon.vue";
// 工具库
// 自定义工具
import { commonNotify, useListPage } from "@/util/common";
// 网络请求
import {
  getPointsList as getPointsListRequest,
  deletePoints as deletePointsRequest,
  updatePointsAudit as updatePointsAuditRequest,
  updatePointsState as updatePointsStateRequest,
} from "@/request/points";
// store
import { useAuthStore } from "@/store/authStore";
import { pointsStateList } from "./pointsListManagerStore";
import { PointsState, approvialList, approvialNewList } from "./pointsListManagerStore";

// 类型
import type { VNode } from "vue";
import type { DataTableColumns } from "naive-ui";
import type { PointsItem } from "@/type/Points";

const authStore = useAuthStore();
const dialog = useDialog();
const router = useRouter();

// 列表渲染函数
const createColumns = () => {
  const list: DataTableColumns<PointsItem> = [
    {
      title: "积分编号",
      key: "pointsId",
      align: "center",
      width: 160,
    },
    {
      title: "积分名称",
      key: "pointsName",
      width: 120,
      align: "center",
      fixed: "left",
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
      title: "积分总量",
      key: "pointsTotal",
      align: "center",
      width: 100,
    },
    {
      title: "积分库存",
      key: "pointsStock",
      align: "center",
      width: 100,
    },
    {
      title: "积分状态",
      key: "pointsState",
      align: "center",
      width: 120,
      render(row) {
        return pointsStateList.getItem(row.pointsState)?.label;
      },
    },
    {
      title: "创建时间",
      key: "createTime",
      align: "center",
      width: 180,
      render(order) {
        return order.createTime || "-";
      },
    },
    {
      title: "审核时间",
      key: "auditorTime",
      align: "center",
      width: 180,
      render(row) {
        return row.auditorTime || "-";
      },
    },
    {
      title: "审核备注",
      key: "auditorNote",
      align: "center",
      width: 120,
      render(row) {
        return row.auditorNote || "-";
      },
    },

    {
      title: "操作",
      key: "operaction",
      align: "center",
      width: 200,
      fixed: "right",
      render(points) {
        const btnList: VNode[] = [];
        const size = "small";
        const isAdmin = authStore.isAdmin;
        if ([PointsState.DRAFT, PointsState.APPROVIAL_FAILED, PointsState.PUBLISH_SUCCESS, PointsState.DRAFT_NEW].includes(points.pointsState)) {
          if ((isAdmin && points.merchantUid === "0") || !isAdmin) {
            btnList.push(
              h(
                NButton,
                {
                  type: "primary",
                  secondary: true,
                  size,
                  onClick: () => {
                    router.push({
                      name: "editPoints",
                      query: {
                        id: points.pointsId,
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
        // 删除
        if ([PointsState.DRAFT, PointsState.APPROVIAL_FAILED].includes(points.pointsState)) {
          btnList.push(
            h(
              NButton,
              {
                type: "warning",
                secondary: true,
                size,
                onClick: () => {
                  handleDelete(points);
                },
              },
              {
                default: () => "删除",
              }
            )
          );
        }

        if ([PointsState.TO_BE_APPROVIAL, PointsState.TO_BE_APPROVIAL_NEW].includes(points.pointsState)) {
          if ((isAdmin && points.merchantUid === "0") || !isAdmin) {
            btnList.push(
              h(
                NButton,
                {
                  type: "primary",
                  secondary: true,
                  size,
                  onClick: () => {
                    const action = points.pointsState === PointsState.TO_BE_APPROVIAL ? PointsState.DRAFT : PointsState.DRAFT_NEW;
                    handleUpdate(points, action, "撤销审核", updatePointsStateRequest);
                  },
                },
                {
                  default: () => "撤销审核",
                }
              )
            );
          }
        }
        if ([PointsState.DRAFT, PointsState.DRAFT_NEW].includes(points.pointsState)) {
          if ((isAdmin && points.merchantUid === "0") || !isAdmin) {
            btnList.push(
              h(
                NButton,
                {
                  type: "primary",
                  secondary: true,
                  size,
                  onClick: () => {
                    const action = points.pointsState === PointsState.DRAFT ? PointsState.TO_BE_APPROVIAL : PointsState.TO_BE_APPROVIAL_NEW;
                    handleUpdate(points, action, "提交审核", updatePointsStateRequest);
                  },
                },
                {
                  default: () => "提交审核",
                }
              )
            );
          }
        }
        if ([PointsState.TO_BE_APPROVIAL, PointsState.TO_BE_APPROVIAL_NEW].includes(points.pointsState) && isAdmin) {
          btnList.push(
            h(
              NButton,
              {
                type: "primary",
                secondary: true,
                size,
                onClick: () => {
                  const action = points.pointsState === PointsState.TO_BE_APPROVIAL ? PointsState.APPROVIAL_FAILED : PointsState.APPROVIAL_FAILED_NEW;
                  handleUpdate(points, action, "审核", updatePointsAuditRequest);
                },
              },
              {
                default: () => "审核",
              }
            )
          );
        }
        if ([PointsState.PUBLISH_FAILED].includes(points.pointsState) && isAdmin) {
          btnList.push(
            h(
              NButton,
              {
                type: "primary",
                secondary: true,
                size,
                onClick: () => {
                  const action = PointsState.PUBLISH_FAILED;
                  handleUpdate(points, action, "重新发行", updatePointsAuditRequest);
                },
              },
              {
                default: () => "重新发行",
              }
            )
          );
        }
        if ([PointsState.ADD_PUBLISH_FAILED].includes(points.pointsState) && isAdmin) {
          btnList.push(
            h(
              NButton,
              {
                type: "primary",
                secondary: true,
                size,
                onClick: () => {
                  const action = PointsState.ADD_PUBLISH_FAILED;
                  handleUpdate(points, action, "重新增发", updatePointsAuditRequest);
                },
              },
              {
                default: () => "重新增发",
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
  if (authStore.isAdmin) {
    list.splice(0, 0, {
      title: "商铺名称",
      key: "merchantName",
      align: "center",
      width: 120,
      render: (points) => {
        return points.merchantUid === "0" ? "平台" : points.merchantName;
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

// 删除积分
const handleDelete = (points: PointsItem) => {
  const dialogInfo = dialog.warning({
    title: "删除积分",
    content: `确认删除${points.pointsName}吗？`,
    positiveText: "确认",
    onPositiveClick: async () => {
      dialogInfo.loading = true;
      const res = await deletePointsRequest({ pointsId: points.pointsId });
      if (res) {
        await getList();
        commonNotify("success", "商品删除成功");
      }
      dialogInfo.loading = false;
    },
  });
};

//一些改变积分状态的操作
const showUpdatePointsModal = ref(false);
const updateLoading = ref(false);
const currentPoint = ref<PointsItem | null>(null);
const updateInfo = reactive({
  actionText: "",
  actionRequest: null as unknown as typeof updatePointsAuditRequest,
});
const updateParams = reactive({
  auditNote: "",
  pointsId: "",
  pointsState: 0,
});
const handleUpdate = (points: PointsItem, action: number, actionText: string, request: typeof updatePointsAuditRequest) => {
  currentPoint.value = points;
  updateInfo.actionText = actionText;
  updateParams.pointsId = points.pointsId;
  updateParams.pointsState = action;
  updateInfo.actionRequest = request;
  showUpdatePointsModal.value = true;
};

const comfirmUpdate = async () => {
  updateLoading.value = true;
  const res = await updateInfo.actionRequest(updateParams);
  if (res) {
    commonNotify("success", "操作成功");
    await getList();
    showUpdatePointsModal.value = false;
  }

  updateLoading.value = false;
};

const { totalPage, getList, searchParam, list, listXWidth, listYHeight, searching, submitSearch } = useListPage(getPointsListRequest, createColumns);
</script>

<style scoped lang="less">
.step-box {
  padding: 4px;
}
</style>
