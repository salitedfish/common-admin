<template>
  <n-card>
    <screen-section @submitSearch="submitSearch" :searching="searching"></screen-section>
  </n-card>
  <n-data-table :single-line="false" :columns="createColumns()" :data="list" :scroll-x="listXWidth" :max-height="listYHeight" :loading="searching"></n-data-table>
  <n-card>
    <n-pagination v-model:page="searchParam.page" :page-count="totalPage" @update:page="getList" />
  </n-card>

  <!-- 改变公告类目的modal -->
  <n-modal :show="showUpdateClassifyDialog" @update:show="(state: boolean) => (showUpdateClassifyDialog = state)">
    <n-card style="width: 600px" :title="currentBulletinBoard?.title" :bordered="false" size="huge" role="dialog" aria-modal="true">
      <template #header-extra>
        <custom-icon name="guanbi" :size="16" @click="showUpdateClassifyDialog = false"></custom-icon>
      </template>

      <n-form label-placement="left" label-width="80px" label-align="left">
        <n-form-item label="公告类目:">
          <category-select
            v-model="classify"
            :disabled="updateClassifying"
            :default-value="currentBulletinBoard?.classifies[currentBulletinBoard?.classifies.length - 1]"
            :type="CategoryType.NOTICE"
          ></category-select>
        </n-form-item>
      </n-form>

      <template #footer>
        <div style="display: flex; justify-content: end">
          <n-button type="primary" inline-block @click="comfirmUpdateClassify" :disabled="updateClassifying || classify.length < 2" :loading="updateClassifying">确认</n-button>
        </div>
      </template>
    </n-card>
  </n-modal>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "bulletinBoardManager",
});
</script>
<script lang="ts" setup>
// 框架
import { h, ref } from "vue";
import { useRouter } from "vue-router";
// 组件库
import { NSpace, NButton, useDialog, NImage } from "naive-ui";
// 自定义组件
import screenSection from "./screenSection.vue";
import customIcon from "@/component/common/customIcon.vue";
import categorySelect from "@/component/common/categorySelect.vue";
// 工具库
// 自定义工具
import { useListPage, commonNotify } from "@/util/common";
// 网络请求
import { getBulletinBoardList, deleteBulletinBoard, updateBulletinBoardState, updateBulletinBoardClassify } from "@/request/operator";
// store
import { useAuthStore } from "@/store/authStore";
import { bulletinBoardStateList, bulletinBoardTopStateList, bulletinBoardTypeList, BulletinBoardState } from "./bulletinBoardManagerStore";
import { CategoryType } from "@/type/Common";
// 类型
import type { VNode } from "vue";
import type { DataTableColumns } from "naive-ui";
import type { BulletinBoardListItem } from "@/type/Operator";
import type { CategoryTreeItem } from "@/type/Common";

const isAdmin = useAuthStore().isAdmin();
const authStore = useAuthStore();
const dialog = useDialog();
const router = useRouter();

// 列表项
const createColumns = () => {
  const list: DataTableColumns<BulletinBoardListItem> = [
    {
      title: "标题",
      key: "title",
      align: "center",
      fixed: "left",
      width: 160,
    },
    // {
    //   title: "概要",
    //   key: "summary",
    //   align: "center",
    //   width: 160,
    // },
    // {
    //   title: "内容",
    //   key: "content",
    //   align: "center",
    //   width: 160,
    // },
    {
      title: "封面",
      key: "cover",
      align: "center",
      width: 100,
      render(row) {
        return h(NImage, {
          width: 30,
          src: row.cover,
        });
      },
    },
    {
      title: "类型",
      key: "type",
      align: "center",
      width: 120,
      render: (row) => {
        return bulletinBoardTypeList.getItem(row.type)?.label;
      },
    },
    {
      title: "置顶状态",
      key: "topState",
      align: "center",
      width: 120,
      render: (row) => {
        return bulletinBoardTopStateList.getItem(row.topState)?.label;
      },
    },
    {
      title: "状态",
      key: "state",
      align: "center",
      width: 120,
      render: (row) => {
        return bulletinBoardStateList.getItem(row.state)?.label;
      },
    },

    {
      title: "创建时间",
      key: "createTime",
      width: 180,
      align: "center",
    },
    // {
    //   title: "上架时间",
    //   key: "activeTime",
    //   width: 180,
    //   align: "center",
    // },

    {
      title: "操作",
      key: "operaction",
      align: "center",
      width: 240,
      fixed: "right",
      render(row) {
        const size = "small";
        const isMy = isAdmin ? Number(row.merchantUid) === 0 : Number(authStore.getUserInfo()?.uid) === Number(row.merchantUid);
        const list: VNode[] = [
          h(
            NButton,
            {
              size,
              secondary: true,
              type: "primary",
              onClick: () => {
                router.push({
                  name: "checkBulletinBoard",
                  query: {
                    id: row.id,
                  },
                });
              },
            },
            {
              default: () => "详情",
            }
          ),
        ];

        // 删除
        if (isMy && row.state === BulletinBoardState.TO_BE_SHELVES) {
          list.push(
            h(
              NButton,
              {
                size,
                secondary: true,
                type: "warning",
                onClick: () => {
                  const dialogInfo = dialog.warning({
                    title: "删除",
                    content: `确认删除${row.title}吗？`,
                    positiveText: "确认",
                    onPositiveClick: async () => {
                      dialogInfo.loading = true;
                      const res = await deleteBulletinBoard({ id: row.id });
                      if (res) {
                        await getList();
                        commonNotify("success", "商品推荐删除成功");
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
          list.push(
            h(
              NButton,
              {
                size,
                secondary: true,
                type: "primary",
                onClick: () => {
                  router.push({
                    name: "editBulletinBoard",
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
        if (isMy) {
          const topStateAction = bulletinBoardTopStateList.getItem(row.topState)?.action;
          list.push(
            h(
              NButton,
              {
                size,
                secondary: true,
                type: "primary",
                onClick: () => {
                  const dialogInfo = dialog.success({
                    title: topStateAction?.label,
                    content: `确认${topStateAction?.label}${row.title}吗？`,
                    positiveText: "确认",
                    onPositiveClick: async () => {
                      dialogInfo.loading = true;
                      const res = await updateBulletinBoardState({ id: row.id, state: row.state, topState: topStateAction?.value as number });
                      if (res) {
                        await getList();
                        commonNotify("success", `${topStateAction?.label}${row.title}成功`);
                      }
                      dialogInfo.loading = false;
                    },
                  });
                },
              },
              {
                default: () => topStateAction?.label,
              }
            )
          );
          const stateAction = bulletinBoardStateList.getItem(row.state)?.action;
          list.push(
            h(
              NButton,
              {
                size,
                secondary: true,
                type: "primary",
                onClick: () => {
                  const dialogInfo = dialog.success({
                    title: stateAction?.label,
                    content: `确认${stateAction?.label}${row.title}吗？`,
                    positiveText: "确认",
                    onPositiveClick: async () => {
                      dialogInfo.loading = true;
                      const res = await updateBulletinBoardState({ id: row.id, state: stateAction?.value as number, topState: row.topState });
                      if (res) {
                        await getList();
                        commonNotify("success", `${stateAction?.label}${row.title}成功`);
                      }
                      dialogInfo.loading = false;
                    },
                  });
                },
              },
              {
                default: () => stateAction?.label,
              }
            )
          );
          list.push(
            h(
              NButton,
              {
                size,
                secondary: true,
                type: "primary",
                onClick: () => {
                  updateBulletinBoardClassifyHandler(row);
                },
              },
              {
                default: () => "修改类目",
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
        return row.merchantUid === 0 ? "平台" : row.merchantName;
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

const { totalPage, getList, searchParam, list, listXWidth, listYHeight, searching, submitSearch } = useListPage(getBulletinBoardList, createColumns);

// 修改类目
const showUpdateClassifyDialog = ref(false);
const updateClassifying = ref(false);
const classify = ref<CategoryTreeItem[]>([]);
const currentBulletinBoard = ref<BulletinBoardListItem | null>(null);
const updateBulletinBoardClassifyHandler = (row: BulletinBoardListItem) => {
  currentBulletinBoard.value = row;
  showUpdateClassifyDialog.value = true;
};
const comfirmUpdateClassify = async () => {
  updateClassifying.value = true;
  const classifies = classify.value.map((item) => {
    return item.id;
  });
  const res = await updateBulletinBoardClassify({ id: currentBulletinBoard.value?.id as number, classifies });
  if (res) {
    await getList();
    commonNotify("success", `${currentBulletinBoard.value?.title}修改类目成功`);
    showUpdateClassifyDialog.value = false;
  }
  updateClassifying.value = false;
};
</script>

<style scoped lang="less"></style>
