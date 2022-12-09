<template>
  <n-card>
    <screen-section @submitSearch="submitSearch" :searching="searching"></screen-section>
  </n-card>
  <n-data-table :single-line="false" :columns="createColumns()" :data="list" :scroll-x="listXWidth" :max-height="listYHeight" :loading="searching"></n-data-table>
  <n-card>
    <n-pagination v-model:page="searchParam.page" :page-count="totalPage" @update:page="getList" />
  </n-card>

  <!-- 改变商品状态的modal，包括提交审核、审核失败等 -->
  <n-modal :show="showAuditModal" @update:show="(state: boolean) => (showAuditModal = state)">
    <n-card style="width: 600px" :title="auditInfo.auditTitle" :bordered="false" size="huge" role="dialog" aria-modal="true">
      <template #header-extra>
        <custom-icon name="guanbi" :size="16" @click="showAuditModal = false"></custom-icon>
      </template>
      <div v-if="auditInfo.auditTip">{{ auditInfo.auditTip }}</div>

      <n-form
        label-placement="left"
        label-width="80px"
        label-align="left"
        v-if="[AuditAction.AUDIT_FAIL, AuditAction.AUDIT_SUCCESS, AuditAction.RE_AUDIT_FAIL, AuditAction.RE_AUDIT_SUCCESS].includes(auditInfo.goodsState)"
      >
        <n-form-item label="审核备注:">
          <n-input v-model:value="auditInfo.auditNote"></n-input>
        </n-form-item>
        <n-form-item label="审核结果:" v-if="[AuditAction.AUDIT_FAIL, AuditAction.AUDIT_SUCCESS].includes(auditInfo.goodsState)">
          <n-select v-model:value="auditInfo.goodsState" :options="auditResList" placeholder="请选择审核结果" />
        </n-form-item>
        <n-form-item label="审核结果:" v-if="[AuditAction.RE_AUDIT_FAIL, AuditAction.RE_AUDIT_SUCCESS].includes(auditInfo.goodsState)">
          <n-select v-model:value="auditInfo.goodsState" :options="reAuditResList" placeholder="请选择审核结果" />
        </n-form-item>
      </n-form>

      <template #footer>
        <div style="display: flex; justify-content: end">
          <n-button type="primary" inline-block @click="comfirmAudit" :disabled="auditLoading" :loading="auditLoading">确认</n-button>
        </div>
      </template>
    </n-card>
  </n-modal>

  <!-- 改变商品类目的modal -->
  <n-modal :show="showUpdateCategoryModal" @update:show="(state: boolean) => (showUpdateCategoryModal = state)">
    <n-card style="width: 600px" :title="updateCategoryInfo.categoryUpdateTitle" :bordered="false" size="huge" role="dialog" aria-modal="true">
      <template #header-extra>
        <custom-icon name="guanbi" :size="16" @click="showUpdateCategoryModal = false"></custom-icon>
      </template>

      <n-form label-placement="left" label-width="80px" label-align="left">
        <n-form-item label="商品类目:">
          <category-select v-model="updateCategoryInfo.categorys" :disabled="updateCategoryLoading" :default-value="updateCategoryInfo.defaultCategory"></category-select>
        </n-form-item>
      </n-form>

      <template #footer>
        <div style="display: flex; justify-content: end">
          <n-button
            type="primary"
            inline-block
            @click="comfirmUpdateCategory"
            :disabled="updateCategoryLoading || updateCategoryInfo.categorys.length < 4"
            :loading="updateCategoryLoading"
            >确认</n-button
          >
        </div>
      </template>
    </n-card>
  </n-modal>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "goodsListManager",
});
</script>

<script lang="ts" setup>
import { onBeforeMount, ref, h, reactive } from "vue";
import { useRouter } from "vue-router";
import type { VNode } from "vue";
import { NImage, NButton, NSpace, useDialog } from "naive-ui";
import screenSection from "./component/screenSection.vue";
import categorySelect from "@/component/common/categorySelect.vue";
import customIcon from "@/component/common/customIcon.vue";
import whiteListUploadBtn from "@/component/whiteList/whiteListUploadBtn.vue";

import {
  getGoodsList as getListRequest,
  goodsDelete as goodsDeleteRequest,
  updateGoodsState as updateGoodsStateRequest,
  updateGoodsAudit as updateGoodsAuditRequest,
  updateGoodsCategory as updateGoodsCategoryRequest,
} from "@/request/goods";
import { deleteWhiteList as deleteWhiteListRequest } from "@/request/common";

import type { GoodsListItem } from "@/type/GoodsManager";
import type { DataTableColumns } from "naive-ui";
import type { CategoryTreeItem } from "@/type/Common";
import { goodsStateList, goodsTypeList, saleTypeList, GoodsState, GoodsType, SaleType, AuditAction, auditResList, reAuditResList, EditType } from "./goodsListManagerStore";
import { useAuthStore } from "@/store/authStore";
import { commonNotify, useListPage } from "@/util/common";
import { WhiteListType } from "@/type/Common";

const authStore = useAuthStore();
const isAdmin = authStore.isAdmin();
const router = useRouter();
const dialog = useDialog();

// 列表规则项
const createColumns = () => {
  const list: DataTableColumns<GoodsListItem> = [
    {
      title: "商品名称",
      key: "goodsName",
      width: 120,
      fixed: "left",
      align: "center",
    },
    {
      title: "商品编号",
      key: "goodsId",
      align: "center",
      width: 160,
    },
    {
      title: "商品封面",
      key: "goodsCover",
      align: "center",
      width: 100,
      render(row) {
        return h(NImage, {
          width: 50,
          src: row.goodsCover,
        });
      },
    },

    {
      title: "商品类型",
      key: "goodsType",
      align: "center",
      width: 100,
      render(row) {
        return goodsTypeList.getItem(row.goodsType)?.label;
      },
    },
    {
      title: "销售类型",
      key: "saleType",
      align: "center",
      width: 100,
      render(row) {
        return saleTypeList.getItem(row.saleType)?.label;
      },
    },
    {
      title: "商品价格",
      key: "goodsPrice",
      align: "center",
      width: 100,
    },
    {
      title: "商品总量",
      key: "goodsTotal",
      align: "center",
      width: 100,
    },
    {
      title: "商品库存",
      key: "goodsStock",
      align: "center",
      width: 100,
    },
    {
      title: "商品收藏",
      key: "goodsCollections",
      align: "center",
      width: 100,
    },
    {
      title: "上架时间",
      key: "activeTime",
      align: "center",
      width: 180,
      render(row) {
        return row.activeTime ? row.activeTime : "/";
      },
    },
    {
      title: "销售开始时间",
      key: "goodsSaleTime",
      align: "center",
      width: 180,
      render(row) {
        return row.goodsSaleTime ? row.goodsSaleTime : "/";
      },
    },
    {
      title: "审核时间",
      key: "auditorTime",
      align: "center",
      width: 180,
      render(row) {
        return row.auditorTime ? row.auditorTime : "/";
      },
    },
    {
      title: "审核备注",
      key: "auditorNote",
      align: "center",
      width: 180,
      render(row) {
        return row.auditorNote ? row.auditorNote : "/";
      },
    },
    {
      title: "商品状态",
      key: "goodsState",
      align: "center",
      width: 100,
      render(row) {
        return goodsStateList.getItem(row.goodsState)?.label;
      },
    },

    {
      title: "操作",
      key: "operaction",
      align: "center",
      width: 320,
      fixed: "right",
      render(goods) {
        const { goodsState, saleType, goodsType } = goods;
        const list: VNode[] = [];
        const size = "small";
        // 详情
        list.push(
          h(
            NButton,
            {
              type: "primary",
              size,
              secondary: true,

              onClick: () =>
                router.push({
                  name: "goodsCheckManager",
                  query: {
                    goodsId: goods.goodsId,
                  },
                }),
            },
            {
              default: () => "详情",
            }
          )
        );
        // 删除
        if ([GoodsState.DRAFT, GoodsState.APPROVIAL_FAILED].includes(goodsState)) {
          list.push(
            h(
              NButton,
              {
                type: "warning",
                size,
                secondary: true,
                onClick: () => {
                  const dialogInfo = dialog.warning({
                    title: "删除商品",
                    content: `确认删除${goods.goodsName}吗？`,
                    positiveText: "确认",
                    onPositiveClick: async () => {
                      dialogInfo.loading = true;
                      const res = await goodsDeleteRequest({ goodsId: goods.goodsId });
                      if (res) {
                        getList();
                        commonNotify("success", "商品删除成功");
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
        }
        // 编辑
        if (
          !isAdmin &&
          [GoodsState.DRAFT, GoodsState.APPROVIAL_FAILED, GoodsState.TO_BE_SHELVES, GoodsState.NEED_APPROVIAL, GoodsState.APPROVIAL_FAILED_NEW].includes(goodsState)
        ) {
          list.push(
            h(
              NButton,
              {
                type: "primary",
                size,
                secondary: true,
                onClick: () =>
                  router.push({
                    name: "goodsEditManager",
                    query: {
                      goodsId: goods.goodsId,
                    },
                  }),
              },
              {
                default: () => "编辑",
              }
            )
          );
        }
        // 提交审核
        if (!isAdmin && [GoodsState.DRAFT, GoodsState.NEED_APPROVIAL].includes(goodsState)) {
          list.push(
            h(
              NButton,
              {
                type: "primary",
                size,
                secondary: true,
                onClick: () => {
                  auditInfo.auditTitle = "提交审核";
                  auditInfo.goodsId = goods.goodsId;
                  auditInfo.auditTip = `确认将${goods.goodsName}提交审核吗？`;
                  auditInfo.goodsState = goods.goodsState === GoodsState.NEED_APPROVIAL ? AuditAction.RE_SUBMIT_AUDIT : AuditAction.SUBMIT_AUDIT;
                  showAuditModal.value = true;
                },
              },
              {
                default: () => "提交审核",
              }
            )
          );
        }
        // 撤销审核
        if (!isAdmin && [GoodsState.TO_BE_APPROVIAL, GoodsState.TO_BE_APPROVIAL_NEW].includes(goodsState)) {
          list.push(
            h(
              NButton,
              {
                type: "primary",
                size,
                secondary: true,

                onClick: () => {
                  auditInfo.auditTitle = "撤销审核";
                  auditInfo.goodsId = goods.goodsId;
                  auditInfo.auditTip = `确认撤销审核${goods.goodsName}吗？`;
                  auditInfo.goodsState = goods.goodsState === GoodsState.TO_BE_APPROVIAL_NEW ? AuditAction.RE_CANCEL_AUDIT : AuditAction.CANCEL_AUDIT;
                  showAuditModal.value = true;
                },
              },
              {
                default: () => "撤销审核",
              }
            )
          );
        }
        // 上传白名单
        if (!isAdmin && [GoodsState.DRAFT, GoodsState.TO_BE_SHELVES, GoodsState.ON_THE_SHELF, GoodsState.NEED_APPROVIAL].includes(goodsState) && saleType === SaleType.WHITE_LIST) {
          list.push(
            h(whiteListUploadBtn, {
              id: goods.goodsId,
              whiteListType: WhiteListType.GOODS,
            })
          );
        }
        // 删除白名单
        if (!isAdmin && [GoodsState.DRAFT, GoodsState.TO_BE_SHELVES, GoodsState.ON_THE_SHELF, GoodsState.NEED_APPROVIAL].includes(goodsState) && saleType === SaleType.WHITE_LIST) {
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
                    content: `确认删除${goods.goodsName}的白名单吗？`,
                    positiveText: "确认",
                    onPositiveClick: async () => {
                      dialogInfo.loading = true;
                      const res = await deleteWhiteListRequest({ id: goods.goodsId }, WhiteListType.GOODS);
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
        // 查看白名单
        if (
          saleType === SaleType.WHITE_LIST &&
          ((isAdmin && [GoodsState.TO_BE_APPROVIAL, GoodsState.TO_BE_SHELVES, GoodsState.ON_THE_SHELF, GoodsState.TO_BE_APPROVIAL_NEW].includes(goodsState)) ||
            (!isAdmin && [GoodsState.DRAFT, GoodsState.TO_BE_SHELVES, GoodsState.ON_THE_SHELF, GoodsState.NEED_APPROVIAL].includes(goodsState)))
        ) {
          list.push(
            h(
              NButton,
              {
                type: "primary",
                size,
                secondary: true,
                onClick: () => {
                  router.push({
                    name: "goodsWhiteListManager",
                    query: { goodsId: goods.goodsId, goodsName: goods.goodsName },
                  });
                },
              },
              {
                default: () => "查看白名单",
              }
            )
          );
        }
        if (goodsType === GoodsType.SYNTHETIC && !isAdmin && [GoodsState.DRAFT, GoodsState.TO_BE_SHELVES, GoodsState, GoodsState.ON_THE_SHELF].includes(goodsState)) {
          list.push(
            h(
              NButton,
              {
                type: "primary",
                size,
                secondary: true,
              },
              {
                default: () => "修改合成规则",
              }
            )
          );
        }
        if (
          goodsType === GoodsType.SYNTHETIC &&
          ((isAdmin && [GoodsState.TO_BE_APPROVIAL, GoodsState.TO_BE_SHELVES, GoodsState.ON_THE_SHELF].includes(goodsState)) ||
            (!isAdmin && [GoodsState.DRAFT, GoodsState.TO_BE_SHELVES, GoodsState.ON_THE_SHELF].includes(goodsState)))
        ) {
          list.push(
            h(
              NButton,
              {
                type: "primary",
                size,
                secondary: true,
              },
              {
                default: () => "查看合成规则",
              }
            )
          );
        }
        // 修改积分
        // if (goodsType === GoodsType.POINT && !isAdmin && [GoodsState.TO_BE_SHELVES].includes(goodsState)) {
        //   list.push(
        //     h(
        //       NButton,
        //       {
        //         type: "primary",
        //         size,
        //         secondary: true,
        //         onClick: () =>
        //           router.push({
        //             name: "goodsEditManager",
        //             query: {
        //               goodsId: goods.goodsId,
        //               editType: EditType.POINTS,
        //             },
        //           }),
        //       },
        //       {
        //         default: () => "修改积分",
        //       }
        //     )
        //   );
        // }
        // 修改拓展参数
        if (!isAdmin && [GoodsState.TO_BE_SHELVES].includes(goodsState)) {
          list.push(
            h(
              NButton,
              {
                type: "primary",
                size,
                secondary: true,
                onClick: () =>
                  router.push({
                    name: "goodsEditManager",
                    query: {
                      goodsId: goods.goodsId,
                      editType: EditType.EXTEND,
                    },
                  }),
              },
              {
                default: () => "修改拓展参数",
              }
            )
          );
        }
        // 审核
        if (isAdmin && [GoodsState.TO_BE_APPROVIAL, GoodsState.TO_BE_APPROVIAL_NEW].includes(goodsState)) {
          list.push(
            h(
              NButton,
              {
                type: "primary",
                size,
                secondary: true,

                onClick: () => {
                  auditInfo.auditTitle = "审核";
                  auditInfo.goodsId = goods.goodsId;
                  auditInfo.goodsState = goods.goodsState === GoodsState.TO_BE_APPROVIAL_NEW ? AuditAction.RE_AUDIT_FAIL : AuditAction.AUDIT_FAIL;
                  showAuditModal.value = true;
                },
              },
              {
                default: () => "审核",
              }
            )
          );
        }
        // if (isAdmin && [GoodsState.TO_BE_APPROVIAL, GoodsState.TO_BE_SHELVES, GoodsState.ON_THE_SHELF, GoodsState.TO_BE_APPROVIAL_NEW].includes(goodsState)) {
        //   list.push(
        //     h(
        //       NButton,
        //       {
        //         type: "primary",
        //         size,
        //         secondary: true,
        //       },
        //       {
        //         default: () => "修改二级参数与分账比例",
        //       }
        //     )
        //   );
        // }
        if (isAdmin && [GoodsState.TO_BE_APPROVIAL, GoodsState.TO_BE_SHELVES, GoodsState.ON_THE_SHELF, GoodsState.TO_BE_APPROVIAL_NEW].includes(goodsState)) {
          list.push(
            h(
              NButton,
              {
                type: "primary",
                size,
                secondary: true,
              },
              {
                default: () => "修改转赠类型与分账比例",
              }
            )
          );
        }
        // 上架
        if (!isAdmin && [GoodsState.TO_BE_SHELVES].includes(goodsState)) {
          list.push(
            h(
              NButton,
              {
                type: "primary",
                size,
                secondary: true,

                onClick: () => {
                  auditInfo.auditTitle = "上架";
                  auditInfo.goodsId = goods.goodsId;
                  auditInfo.auditTip = `确认上架${goods.goodsName}吗？`;
                  auditInfo.goodsState = AuditAction.UPPER_SHELF;
                  showAuditModal.value = true;
                },
              },
              {
                default: () => "上架",
              }
            )
          );
        }
        // 下架
        if ([GoodsState.ON_THE_SHELF].includes(goodsState)) {
          list.push(
            h(
              NButton,
              {
                type: "warning",
                size,
                secondary: true,

                onClick: () => {
                  auditInfo.auditTitle = "下架";
                  auditInfo.goodsId = goods.goodsId;
                  auditInfo.auditTip = `确认下架${goods.goodsName}吗？`;
                  auditInfo.goodsState = AuditAction.LOWER_SHELF;
                  showAuditModal.value = true;
                },
              },
              {
                default: () => "下架",
              }
            )
          );
        }
        // 重新发行
        if (isAdmin && [GoodsState.PUBLISH_FAILED].includes(goodsState)) {
          list.push(
            h(
              NButton,
              {
                type: "primary",
                size,
                secondary: true,

                onClick: () => {
                  auditInfo.auditTitle = "重新发行";
                  auditInfo.goodsId = goods.goodsId;
                  auditInfo.auditTip = `确认重新发行${goods.goodsName}吗？`;
                  auditInfo.goodsState = AuditAction.PUBLISH_FAILED_RE_PUBLISH;
                  showAuditModal.value = true;
                },
              },
              {
                default: () => "重新发行",
              }
            )
          );
        }
        if ([GoodsState.PUBLISH_FAILED, GoodsState.TO_BE_SHELVES, GoodsState.ON_THE_SHELF, GoodsState.ADD_PUBLISH_FAILED].includes(goodsState)) {
          list.push(
            h(
              NButton,
              {
                type: "primary",
                size,
                secondary: true,
              },
              {
                default: () => "发行记录",
              }
            )
          );
        }
        // 修改类目
        if ([GoodsState.TO_BE_SHELVES, GoodsState.ON_THE_SHELF].includes(goodsState)) {
          list.push(
            h(
              NButton,
              {
                type: "primary",
                size,
                secondary: true,

                onClick: () => {
                  updateCategoryInfo.categoryUpdateTitle = `修改${goods.goodsName}类目`;
                  updateCategoryInfo.goodsId = goods.goodsId;
                  updateCategoryInfo.defaultCategory = goods.classifies[goods.classifies.length - 1];
                  showUpdateCategoryModal.value = true;
                },
              },
              {
                default: () => "修改类目",
              }
            )
          );
        }
        if (goodsType === GoodsType.BLIND_BOX && [GoodsState.TO_BE_SHELVES, GoodsState.ON_THE_SHELF].includes(goodsState)) {
          list.push(
            h(
              NButton,
              {
                type: "primary",
                size,
                secondary: true,
              },
              {
                default: () => "查看盲盒",
              }
            )
          );
        }
        if (goodsType === GoodsType.BLIND_BOX && !isAdmin && [GoodsState.TO_BE_SHELVES].includes(goodsState)) {
          list.push(
            h(
              NButton,
              {
                type: "primary",
                secondary: true,
                size,
              },
              {
                default: () => "编辑盲盒",
              }
            )
          );
        }
        if (goodsType === GoodsType.BLIND_BOX && !isAdmin && [GoodsState.TO_BE_SHELVES].includes(goodsState)) {
          list.push(
            h(
              NButton,
              {
                type: "warning",
                size,
                secondary: true,
              },
              {
                default: () => "清空盲盒",
              }
            )
          );
        }
        if (isAdmin && goodsType === GoodsType.BLIND_BOX && [GoodsState.TO_BE_SHELVES, GoodsState.ON_THE_SHELF].includes(goodsState)) {
          list.push(
            h(
              NButton,
              {
                type: "primary",
                size,
                secondary: true,
              },
              {
                default: () => "查看开盒记录",
              }
            )
          );
        }
        // if (!isAdmin && [GoodsState.ON_THE_SHELF].includes(goodsState)) {
        //   list.push(
        //     h(
        //       NButton,
        //       {
        //         type: "primary",
        //         size,
        //         secondary: true,
        //       },
        //       {
        //         default: () => "修改提货类型",
        //       }
        //     )
        //   );
        // }
        // 重新增发
        if (isAdmin && [GoodsState.ADD_PUBLISH_FAILED].includes(goodsState)) {
          list.push(
            h(
              NButton,
              {
                type: "primary",
                size,
                secondary: true,

                onClick: () => {
                  auditInfo.auditTitle = "重新增发";
                  auditInfo.goodsId = goods.goodsId;
                  auditInfo.auditTip = `确认重新增发${goods.goodsName}吗？`;
                  auditInfo.goodsState = AuditAction.ADD_FAIL_RE_ADD;
                  showAuditModal.value = true;
                },
              },
              {
                default: () => "重新增发",
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
const { totalPage, getList, searchParam, list, listXWidth, listYHeight, searching, submitSearch } = useListPage(getListRequest, createColumns, 1);

// 更改商品状态modal框的状态和数据
const showAuditModal = ref(false);
const auditLoading = ref(false);
const auditInfo = reactive({
  auditTitle: "",
  auditTip: "",
  goodsId: "",
  auditNote: "",
  goodsState: 0,
});

// 提交商品状态信息
const comfirmAudit = async () => {
  auditLoading.value = true;
  const { auditNote, goodsId, goodsState } = auditInfo;
  const params = { auditNote, goodsId, goodsState };
  // 管理员和商户用的审核接口不一样
  const res = isAdmin ? await updateGoodsAuditRequest(params) : await updateGoodsStateRequest(params);
  if (res && res.code === 0) {
    commonNotify("success", `${auditInfo.auditTitle}成功`);
    getList();
  }
  auditInfo.auditNote = "";
  auditInfo.auditTip = "";
  auditLoading.value = false;
  showAuditModal.value = false;
};

// 修改类目modal框的状态和信息
const showUpdateCategoryModal = ref(false);
const updateCategoryLoading = ref(false);
const updateCategoryInfo = reactive({
  defaultCategory: undefined as undefined | number,
  categorys: [] as CategoryTreeItem[],
  categoryUpdateTitle: "",
  goodsId: "",
});
// 提交商品类目更新
const comfirmUpdateCategory = async () => {
  updateCategoryLoading.value = true;
  const classifies: string[] = [];
  for (const item of updateCategoryInfo.categorys) {
    classifies.push(String(item.id));
  }
  const res = await updateGoodsCategoryRequest({ classifies, goodsId: updateCategoryInfo.goodsId });
  if (res && res.code === 0) {
    commonNotify("success", "类目更改成功");
    getList();
  }
  updateCategoryLoading.value = false;
  showUpdateCategoryModal.value = false;
};

// 初始获取一次列表
onBeforeMount(() => {
  getList();
});
</script>

<style scoped lang="less">
.constent-area {
  width: 1200px;
}
</style>
