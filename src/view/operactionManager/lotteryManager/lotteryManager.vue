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

  <n-modal v-model:show="dialogState">
    <n-card style="width: 600px" :title="approvialInfo.name" :bordered="false" size="huge" role="dialog" aria-modal="true">
      <template #header-extra>
        <custom-icon name="guanbi" :size="16" @click="dialogState = false"></custom-icon>
      </template>

      <n-form label-placement="left" label-width="80px" label-align="left">
        <n-form-item label="审核备注:">
          <n-input v-model:value="approvialInfo.auditNote"></n-input>
        </n-form-item>
        <n-form-item label="审核结果:">
          <n-select v-model:value="approvialInfo.state" :options="lotteryApprovialState" placeholder="请选择审核结果" />
        </n-form-item>
      </n-form>

      <template #footer>
        <div style="display: flex; justify-content: end">
          <n-button type="primary" inline-block @click="lotteryApprovialHandler" :disabled="approvialLoading" :loading="approvialLoading">确认</n-button>
        </div>
      </template>
    </n-card>
  </n-modal>
</template>

<script lang="ts">
// 框架
import { defineComponent, h, ref, reactive } from "vue";
import { useRouter } from "vue-router";
// 组件库
import { NImage, NSpace, NButton, useDialog } from "naive-ui";
// 自定义组件
import screenSection from "./component/screenSection.vue";
import customIcon from "@/component/common/customIcon.vue";
import whiteListUploadBtn from "@/component/whiteList/whiteListUploadBtn.vue";
// 工具库
// 自定义工具
import { useListPage, commonNotify } from "@/util/common";
// 网络请求
import { deleteWhiteList } from "@/request/common";
import { getLotteryList, deleteLottery, updateLotteryState, lotteryApprovial, calcLottery } from "@/request/operator";
// store
import { useAuthStore } from "@/store/authStore";
import { lotteryStates, lotteryTaskStates, lotteryApprovialState, lotteryUseTypes, lotteryTabTypes } from "./lotteryManagerStore";
// 类型
import { RateType } from "@/view/operactionManager/lotteryDetail/lotteryDetailStore";
import { WhiteListType } from "@/type/Common";
import type { VNode } from "vue";
import type { DataTableColumns } from "naive-ui";
import { LotteryState, LotteryTaskState, type LotteryListItem } from "@/type/Operator";
// 组件名
export default defineComponent({
  name: "lotteryManager",
});
</script>

<script lang="ts" setup>
const router = useRouter();
const authStore = useAuthStore();
const dialog = useDialog();

const createColumns = () => {
  const list: DataTableColumns<LotteryListItem> = [
    {
      title: "抽签编号",
      key: "id",
      align: "center",
      width: 100,
    },
    {
      title: "抽签名称",
      key: "name",
      align: "center",
      width: 160,
      fixed: "left",
    },
    {
      title: "宣传封面",
      key: "adImage",
      align: "center",
      width: 100,
      render(row) {
        return h(NImage, {
          width: 30,
          src: row.adImage,
        });
      },
    },
    {
      title: "预设中签数",
      key: "hitNum",
      align: "center",
      width: 100,
      render: (row) => {
        return row.rateType === RateType.NUM ? row.rate : "-";
      },
    },
    {
      title: "预设中签率(%)",
      key: "rate",
      align: "center",
      width: 120,
      render: (row) => {
        return row.rateType === RateType.RATE ? Number(((row.rate || 0) / 100).toFixed(2)) : "-";
      },
    },
    {
      title: "参与人数",
      key: "joinNum",
      align: "center",
      width: 100,
    },
    {
      title: "参与总签数",
      key: "totalNum",
      align: "center",
      width: 100,
    },
    {
      title: "实际中签数",
      key: "realHitNum",
      align: "center",
      width: 100,
    },

    {
      title: "抽签作用",
      key: "state",
      align: "center",
      width: 100,
      render(row) {
        return lotteryUseTypes.getItem(row.useType)?.label;
      },
    },
    {
      title: "标记类型",
      key: "state",
      align: "center",
      width: 100,
      render(row) {
        return lotteryTabTypes.getItem(row.lotteryTabType)?.label;
      },
    },
    {
      title: "抽签状态",
      key: "state",
      align: "center",
      width: 100,
      render(row) {
        return lotteryStates.getItem(row.state)?.label;
      },
    },
    {
      title: "抽签进度",
      key: "taskState",
      align: "center",
      width: 100,
      render(row) {
        return lotteryTaskStates.getItem(row.taskState)?.label;
      },
    },

    {
      title: "审核备注",
      key: "auditorNote",
      align: "center",
      width: 180,
      render(row) {
        return row.auditorNote ? row.auditorNote : "-";
      },
    },

    {
      title: "开始时间",
      key: "startTime",
      align: "center",
      width: 180,
      render(row) {
        return row.startTime ? row.startTime : "-";
      },
    },

    {
      title: "结束时间",
      key: "endTime",
      align: "center",
      width: 180,
      render(row) {
        return row.endTime ? row.endTime : "-";
      },
    },
    {
      title: "发签时间",
      key: "distributeTime",
      align: "center",
      width: 180,
      render(row) {
        return row.distributeTime ? row.distributeTime : "-";
      },
    },
    {
      title: "开奖时间",
      key: "lotteryTime",
      align: "center",
      width: 180,
      render(row) {
        return row.lotteryTime ? row.lotteryTime : "-";
      },
    },

    {
      title: "操作",
      key: "operaction",
      align: "center",
      width: 240,
      fixed: "right",
      render(lottery) {
        const { state, taskState, id } = lottery;
        const isMy = authStore.isAdmin ? Number(lottery.merchantUid) === 0 : Number(authStore.userInfo?.uid) === Number(lottery.merchantUid);
        const list: VNode[] = [];
        const size = "small";
        const type = "primary";

        // 详情
        list.push(
          h(
            NButton,
            {
              type,
              size,
              secondary: true,
              onClick: () => {
                router.push({
                  name: "lotteryDetail",
                  query: {
                    type: "CHECK",
                    id,
                  },
                });
              },
            },
            {
              default: () => "详情",
            }
          )
        );
        // 计算总签数
        if ([LotteryState.ON_THE_SHELF].includes(state) && [LotteryTaskState.INIT].includes(taskState)) {
          list.push(
            h(
              NButton,
              {
                type,
                size,
                secondary: true,
                onClick: async () => {
                  const res = await calcLottery({ id: lottery.id });
                  if (res) {
                    commonNotify("success", "计算总签数成功！");
                    getList();
                  }
                },
              },
              {
                default: () => "计算总签数",
              }
            )
          );
        }
        // 编辑
        if (isMy && [LotteryState.DRAFT, LotteryState.APPROVIAL_FAILED, LotteryState.TO_BE_SHELVES].includes(state) && [LotteryTaskState.INIT].includes(taskState)) {
          list.push(
            h(
              NButton,
              {
                type,
                size,
                secondary: true,
                onClick: () => {
                  router.push({
                    name: "lotteryDetail",
                    query: {
                      type: "EDIT",
                      id,
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
        // 删除
        if (isMy && [LotteryState.DRAFT, LotteryState.APPROVIAL_FAILED].includes(state)) {
          list.push(
            h(
              NButton,
              {
                type: "warning",
                size,
                secondary: true,
                onClick: () => {
                  delLotteryHandler(lottery);
                },
              },
              {
                default: () => "删除",
              }
            )
          );
        }
        // 提交审核
        if (isMy && [LotteryState.DRAFT, LotteryState.APPROVIAL_FAILED].includes(state)) {
          list.push(
            h(
              NButton,
              {
                type,
                size,
                secondary: true,
                onClick: () => {
                  updateLotteryStateHandler(lottery, LotteryState.TO_BE_APPROVIAL, "提交审核");
                },
              },
              {
                default: () => "提交审核",
              }
            )
          );
        }
        // 撤销审核
        if (isMy && [LotteryState.TO_BE_APPROVIAL].includes(state)) {
          list.push(
            h(
              NButton,
              {
                type,
                size,
                secondary: true,
                onClick: () => {
                  updateLotteryStateHandler(lottery, LotteryState.DRAFT, "撤销审核");
                },
              },
              {
                default: () => "撤销审核",
              }
            )
          );
        }
        // 下架
        if (isMy && [LotteryState.ON_THE_SHELF].includes(state) && [LotteryTaskState.INIT].includes(taskState)) {
          list.push(
            h(
              NButton,
              {
                type,
                size,
                secondary: true,
                onClick: () => {
                  updateLotteryStateHandler(lottery, LotteryState.TO_BE_SHELVES, "下架");
                },
              },
              {
                default: () => "下架",
              }
            )
          );
        }
        // 上架
        if (isMy && [LotteryState.TO_BE_SHELVES].includes(state)) {
          list.push(
            h(
              NButton,
              {
                type,
                size,
                secondary: true,
                onClick: () => {
                  updateLotteryStateHandler(lottery, LotteryState.ON_THE_SHELF, "上架");
                },
              },
              {
                default: () => "上架",
              }
            )
          );
        }
        // 审核
        if (authStore.isAdmin && [LotteryState.TO_BE_APPROVIAL].includes(state)) {
          list.push(
            h(
              NButton,
              {
                type,
                size,
                secondary: true,
                onClick: () => {
                  approvialInfo.auditNote = "";
                  approvialInfo.state = LotteryState.APPROVIAL_FAILED;
                  approvialInfo.id = lottery.id;
                  approvialInfo.name = "审核" + lottery.name;
                  dialogState.value = true;
                },
              },
              {
                default: () => "审核",
              }
            )
          );
        }

        // 删除名单
        if (isMy && [LotteryState.ON_THE_SHELF].includes(state) && [LotteryTaskState.INIT].includes(taskState)) {
          list.push(
            h(
              NButton,
              {
                type: "warning",
                size,
                secondary: true,
                onClick: async () => {
                  const dialogInfo = dialog.warning({
                    title: "删除白名单",
                    content: `确认删除${lottery.name}的白名单吗？`,
                    positiveText: "确认",
                    onPositiveClick: async () => {
                      dialogInfo.loading = true;
                      const res = await deleteWhiteList({ id: String(id) }, WhiteListType.DRAW_UPLOAD);
                      if (res) {
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
        //上传白名单
        if (isMy && [LotteryState.ON_THE_SHELF].includes(state) && [LotteryTaskState.INIT].includes(taskState)) {
          list.push(
            h(whiteListUploadBtn, {
              id: String(id),
              whiteListType: WhiteListType.DRAW_UPLOAD,
            })
          );
        }
        //查看白名单
        list.push(
          h(
            NButton,
            {
              type,
              size,
              secondary: true,
              onClick: () => {
                router.push({
                  name: "lotteryWhiteListUpload",
                  query: {
                    id,
                    name: lottery.name,
                  },
                });
              },
            },
            {
              default: () => "查看白名单",
            }
          )
        );

        //查看参与名单
        list.push(
          h(
            NButton,
            {
              type,
              size,
              secondary: true,
              onClick: () => {
                router.push({
                  name: "lotteryWhiteListAll",
                  query: {
                    id,
                    name: lottery.name,
                  },
                });
              },
            },
            {
              default: () => "查看参与名单",
            }
          )
        );

        // 用来放按钮的容器
        const btnBox = h(NSpace, {}, { default: () => list });
        return btnBox;
      },
    },
  ];

  if (authStore.isAdmin) {
    list.splice(0, 0, {
      title: "商户名称",
      key: "merchantName",
      align: "center",
      width: 100,
      render: (row) => {
        return Number(row.merchantUid) === 0 ? "平台" : row.merchantName;
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
const { submitSearch, searching, list, listXWidth, listYHeight, searchParam, totalPage, getList } = useListPage(getLotteryList, createColumns, {
  heightLevel: 1,
});

// 平台审核
const approvialInfo = reactive({
  auditNote: "",
  name: "",
  id: 0,
  state: LotteryState.APPROVIAL_FAILED,
});
const dialogState = ref(false);
const approvialLoading = ref(false);
const lotteryApprovialHandler = async () => {
  approvialLoading.value = true;
  const res = await lotteryApprovial({
    id: approvialInfo.id,
    auditNote: approvialInfo.auditNote,
    state: approvialInfo.state,
  });
  if (res) {
    commonNotify("success", `${approvialInfo.name}成功！`);
    dialogState.value = false;
    getList();
  }
  approvialLoading.value = false;
};

// 更改抽签的状态
const updateLotteryStateHandler = async (lottery: LotteryListItem, state: LotteryState, text: string) => {
  const dialogInfo = dialog.success({
    title: text,
    content: `确认${text}${lottery.name}吗？`,
    positiveText: "确认",
    onPositiveClick: async () => {
      dialogInfo.loading = true;
      const res = await updateLotteryState({ id: lottery.id, state });
      if (res) {
        await getList();
        commonNotify("success", `${text}${lottery.name}成功！`);
        getList();
      }
      dialogInfo.loading = false;
    },
  });
};

// 删除
const delLotteryHandler = async (lottery: LotteryListItem) => {
  const dialogInfo = dialog.warning({
    title: "删除抽签",
    content: `确认删除${lottery.name}吗？`,
    positiveText: "确认",
    onPositiveClick: async () => {
      dialogInfo.loading = true;
      const res = await deleteLottery({ id: lottery.id });
      if (res) {
        await getList();
        commonNotify("success", "抽签删除成功！");
        getList();
      }
      dialogInfo.loading = false;
    },
  });
};
</script>

<style scoped lang="less"></style>
