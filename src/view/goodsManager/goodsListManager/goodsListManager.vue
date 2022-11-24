<template>
  <n-card>
    <screen-section @submitSearch="submitSearch" :searching="searching"></screen-section>
  </n-card>
  <n-data-table :columns="createColumns()" :data="goodsList" :scroll-x="listXWidth" :max-height="listYHeight" :loading="searching"></n-data-table>
  <n-card>
    <n-pagination v-model:page="searchParam.page" :page-count="totalPage" @update:page="getGoodsList" />
  </n-card>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref, h, computed } from "vue";
import type { VNode } from "vue";
import { NImage, NButton, NSpace } from "naive-ui";
import screenSection from "./component/screenSection.vue";

import { getGoodsList as getGoodsListRequest } from "@/request/goods";
import type * as RequestParam from "@/request/type/RequestParam";

import type { SearchParams, GoodsListItem } from "@/type/GoodsManager";
import type { DataTableColumns } from "naive-ui";
import { goodsStateList, goodsTypeList, saleTypeList, GoodsState, GoodsType, SaleType } from "./goodsListManagerStore";
import { useAuthStore } from "@/store/authStore";

const authStore = useAuthStore();
const isAdmin = authStore.isAdmin();

// 列表宽度和高度
const listXWidth = computed(() => {
  const base = 1860;
  return isAdmin ? base + 240 : base;
});
const listYHeight = ref(540);

// 筛选的参数
const searchParam = ref<RequestParam.GetGoodsList>({
  page: 1,
  size: 10,
});
// 数据总数
const totalPage = ref(0);
// 查询状态
const searching = ref(false);
// 展示的列表
const goodsList = ref<GoodsListItem[]>([]);

// 整合筛选参数
const submitSearch = (params: SearchParams) => {
  searchParam.value = { ...searchParam.value, ...params };
  getGoodsList();
};

// 请求列表
const getGoodsList = async () => {
  searching.value = true;
  const res = await getGoodsListRequest(searchParam.value);
  if (res && res.code === 0) {
    goodsList.value = res.data.data;
    totalPage.value = res.data.totalPage;
  }
  searching.value = false;
};

// 列表规则项
const createColumns = () => {
  const list: DataTableColumns<GoodsListItem> = [
    {
      title: "商品名称",
      key: "goodsName",
      width: 120,
      fixed: "left",
    },
    {
      title: "商品封面",
      key: "goodsCover",
      width: 100,
      render(row) {
        return h(NImage, {
          width: 50,
          src: row.goodsCover,
        });
      },
    },
    {
      title: "商品编号",
      key: "goodsId",
      width: 160,
    },
    {
      title: "商品类型",
      key: "goodsType",
      width: 100,
      render(row) {
        return goodsTypeList[row.goodsType].label;
      },
    },
    {
      title: "商品价格",
      key: "goodsPrice",
      width: 80,
    },
    {
      title: "商品总量",
      key: "goodsTotal",
      width: 80,
    },
    {
      title: "商品库存",
      key: "goodsStock",
      width: 80,
    },
    {
      title: "商品收藏",
      key: "goodsCollections",
      width: 80,
    },
    {
      title: "上架时间",
      key: "activeTime",
      width: 120,
      render(row) {
        return row.activeTime ? row.activeTime : "/";
      },
    },
    {
      title: "销售开始时间",
      key: "goodsSaleTime",
      width: 120,
      render(row) {
        return row.goodsSaleTime ? row.goodsSaleTime : "/";
      },
    },
    {
      title: "审核时间",
      key: "auditorTime",
      width: 120,
      render(row) {
        return row.auditorTime ? row.auditorTime : "/";
      },
    },
    {
      title: "商品状态",
      key: "goodsState",
      width: 100,
      render(row) {
        return goodsStateList[row.goodsState].label;
      },
    },
    {
      title: "销售类型",
      key: "saleType",
      width: 100,
      render(row) {
        return saleTypeList[row.saleType].label;
      },
    },

    {
      title: "操作",
      key: "operaction",
      width: 240,
      fixed: "right",
      render(goods) {
        const { goodsState, saleType, goodsType } = goods;
        const list: VNode[] = [];
        if ([GoodsState.DRAFT, GoodsState.APPROVIAL_FAILED].includes(goodsState)) {
          list.push(
            h(
              NButton,
              {
                type: "warning",
              },
              {
                default: () => "删除",
              }
            )
          );
        }
        if (
          !isAdmin &&
          [GoodsState.DRAFT, GoodsState.APPROVIAL_FAILED, GoodsState.TO_BE_SHELVES, GoodsState.NEED_APPROVIAL, GoodsState.APPROVIAL_FAILED_NEW].includes(goodsState)
        ) {
          list.push(
            h(
              NButton,
              {
                type: "primary",
              },
              {
                default: () => "编辑",
              }
            )
          );
        }
        if (!isAdmin && [GoodsState.DRAFT, GoodsState.NEED_APPROVIAL].includes(goodsState)) {
          list.push(
            h(
              NButton,
              {
                type: "primary",
              },
              {
                default: () => "提交审核",
              }
            )
          );
        }
        if (!isAdmin && [GoodsState.DRAFT, GoodsState.TO_BE_SHELVES, GoodsState.ON_THE_SHELF, GoodsState.NEED_APPROVIAL].includes(goodsState) && saleType === SaleType.WHITE_LIST) {
          list.push(
            h(
              NButton,
              {
                type: "primary",
              },
              {
                default: () => "上传白名单",
              }
            )
          );
        }
        if (!isAdmin && [GoodsState.DRAFT, GoodsState.TO_BE_SHELVES, GoodsState.ON_THE_SHELF, GoodsState.NEED_APPROVIAL].includes(goodsState) && saleType === SaleType.WHITE_LIST) {
          list.push(
            h(
              NButton,
              {
                type: "warning",
              },
              {
                default: () => "删除白名单",
              }
            )
          );
        }
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
              },
              {
                default: () => "查看合成规则",
              }
            )
          );
        }
        if (goodsType === GoodsType.POINT && !isAdmin && [GoodsState.DRAFT, GoodsState.TO_BE_SHELVES, GoodsState.ON_THE_SHELF].includes(goodsState)) {
          list.push(
            h(
              NButton,
              {
                type: "primary",
              },
              {
                default: () => "修改积分",
              }
            )
          );
        }
        if (goodsType === GoodsType.SYNTHETIC && !isAdmin && [GoodsState.DRAFT, GoodsState.TO_BE_SHELVES, GoodsState.ON_THE_SHELF].includes(goodsState)) {
          list.push(
            h(
              NButton,
              {
                type: "primary",
              },
              {
                default: () => "修改拓展参数",
              }
            )
          );
        }
        if (isAdmin && [GoodsState.TO_BE_APPROVIAL, GoodsState.TO_BE_APPROVIAL_NEW].includes(goodsState)) {
          list.push(
            h(
              NButton,
              {
                type: "primary",
              },
              {
                default: () => "审核",
              }
            )
          );
        }
        if (!isAdmin && [GoodsState.TO_BE_APPROVIAL, GoodsState.TO_BE_APPROVIAL_NEW].includes(goodsState)) {
          list.push(
            h(
              NButton,
              {
                type: "primary",
              },
              {
                default: () => "撤销审核",
              }
            )
          );
        }
        if (isAdmin && [GoodsState.TO_BE_APPROVIAL, GoodsState.TO_BE_SHELVES, GoodsState.ON_THE_SHELF, GoodsState.TO_BE_APPROVIAL_NEW].includes(goodsState)) {
          list.push(
            h(
              NButton,
              {
                type: "primary",
              },
              {
                default: () => "修改二级参数与分账比例",
              }
            )
          );
        }
        if (!isAdmin && [GoodsState.TO_BE_SHELVES].includes(goodsState)) {
          list.push(
            h(
              NButton,
              {
                type: "primary",
              },
              {
                default: () => "上架",
              }
            )
          );
        }
        if ([GoodsState.ON_THE_SHELF].includes(goodsState)) {
          list.push(
            h(
              NButton,
              {
                type: "warning",
              },
              {
                default: () => "下架",
              }
            )
          );
        }
        if (isAdmin && [GoodsState.PUBLISH_FAILED].includes(goodsState)) {
          list.push(
            h(
              NButton,
              {
                type: "primary",
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
              },
              {
                default: () => "区块链发行记录",
              }
            )
          );
        }
        if ([GoodsState.TO_BE_SHELVES, GoodsState.ON_THE_SHELF].includes(goodsState)) {
          list.push(
            h(
              NButton,
              {
                type: "primary",
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
              },
              {
                default: () => "查看开盒记录",
              }
            )
          );
        }
        if (!isAdmin && [GoodsState.ON_THE_SHELF].includes(goodsState)) {
          list.push(
            h(
              NButton,
              {
                type: "primary",
              },
              {
                default: () => "修改提货类型",
              }
            )
          );
        }
        if (isAdmin && [GoodsState.ADD_PUBLISH_FAILED].includes(goodsState)) {
          list.push(
            h(
              NButton,
              {
                type: "primary",
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
    list.splice(5, 0, {
      title: "商户编号",
      key: "merchantUid",
      width: 160,
    });
    list.splice(5, 0, {
      title: "商户名称",
      key: "merchantName",
      width: 80,
    });
  }
  return list;
};

// 初始获取一次列表
onBeforeMount(() => {
  getGoodsList();
});
</script>

<style scoped lang="less">
.constent-area {
  width: 1200px;
}
</style>
