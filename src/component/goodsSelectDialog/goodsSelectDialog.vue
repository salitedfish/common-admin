<template>
  <n-modal :show="showGoodsSelectModal" @update:show="(state: boolean) => emit('update:showGoodsSelectModal', state)">
    <n-card style="width: 1000px" title="商品选择" :bordered="false" size="huge" role="dialog" aria-modal="true">
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
        :row-key="rowKey"
        :checked-row-keys="goodsIdSelectedList"
        @update:checked-row-keys="changeGoodsSelectList"
        :scrollbar-props="{ trigger: 'none' }"
      ></n-data-table>
      <n-card>
        <div style="display: flex; justify-content: space-between; align-items: center">
          <n-pagination v-model:page="searchParam.page" :page-count="totalPage" @update:page="getList" />
          <n-button type="primary" inline-block @click="() => emit('update:showGoodsSelectModal', false)" :disabled="searching">确认</n-button>
        </div>
      </n-card>
    </n-card>
  </n-modal>
</template>

<script lang="ts">
import screenSection from "./screenSection.vue";
import { useDeepInclude } from "@ultra-man/noa";

import { getGoodsList as getListRequest } from "@/request/goods";

import type { GoodsListItem } from "@/type/GoodsManager";
import type { DataTableColumns } from "naive-ui";
import { goodsTabList } from "@/view/goodsManager/goodsDetailManager/goodsDetailManagerStore";
import { goodsTypeList } from "@/view/goodsManager/goodsListManager/goodsListManagerStore";
import { useListPage } from "@/util/common";
import { defineComponent, ref, watch } from "vue";
import type { DataTableRowKey } from "naive-ui";
import type { GetEnumValue } from "@/type/Common";
import type { GoodsFuncType } from "@/type/GoodsManager";
export default defineComponent({
  name: "goodsListManager",
});
</script>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    goodsSelectedList: { goodsId: string | number; goodsName: string }[];
    showGoodsSelectModal: boolean;
    multiple?: boolean;
    goodsType?: number;
    goodsStates?: number[];
    funcType?: GetEnumValue<GoodsFuncType>;
    max?: number;
    selectDisabled?: boolean;
  }>(),
  {
    multiple: true,
  }
);
const emit = defineEmits<{
  (event: "update:showGoodsSelectModal", value: boolean): void;
  (event: "update:goodsSelectedList", value: { goodsId: string | number; goodsName: string }[]): void;
}>();

let inited = false;

// 告诉列表依据哪个数据当作key，这里参照id
const rowKey = (row: GoodsListItem) => row.goodsId;

// 设置列表选择的key，这里的key用id
const goodsIdSelectedList = ref<DataTableRowKey[]>([]);
goodsIdSelectedList.value = props.goodsSelectedList.map((item) => item.goodsId);

const uncheck = (selectIdList: (string | number)[], selectList: { goodsId: string | number; goodsName: string }[], id: string | number) => {
  for (const key in selectList) {
    if (id === selectList[key].goodsId) {
      selectList.splice(Number(key), 1);
    }
  }
  for (const key in selectIdList) {
    if (id === selectIdList[key]) {
      selectIdList.splice(Number(key), 1);
    }
  }
};
const check = (selectIdList: (string | number)[], selectList: { goodsId: string | number; goodsName: string }[], rows: GoodsListItem) => {
  if (
    useDeepInclude(selectList, {
      condition: (item) => item.goodsId === rows.goodsId,
    }) === false
  ) {
    selectList.push({
      goodsId: rows.goodsId,
      goodsName: rows.goodsName,
    });
  }
  if (!selectIdList.includes(rows.goodsId)) {
    selectIdList.push(rows.goodsId);
  }
};
// 当列表选择的改变时，改变外部的列表
const changeGoodsSelectList: any = (keys: Array<string | number>, rows: GoodsListItem[], meta: { row: GoodsListItem; action: "check" | "uncheck" | "checkAll" | "uncheckAll" }) => {
  const selectList = props.goodsSelectedList;
  if (meta.action === "check") {
    check(goodsIdSelectedList.value, selectList, meta.row);
  } else if (meta.action === "uncheck") {
    uncheck(goodsIdSelectedList.value, selectList, meta.row.goodsId);
  } else if (meta.action === "uncheckAll" && !props.max && !props.selectDisabled) {
    for (const item of list.value) {
      uncheck(goodsIdSelectedList.value, selectList, item.goodsId);
    }
  } else if (meta.action === "checkAll" && !props.max && !props.selectDisabled) {
    for (const item of list.value) {
      check(goodsIdSelectedList.value, selectList, item);
    }
  }

  emit("update:goodsSelectedList", selectList);
};
watch(
  () => props.showGoodsSelectModal,
  (newValue) => {
    if (newValue && !inited) {
      getList();
    }
    inited = true;
  }
);

// 列表规则项
const createColumns = () => {
  const list: DataTableColumns<GoodsListItem> = [
    {
      type: "selection",
      multiple: props.multiple,
      disabled: (item) => {
        if (props.selectDisabled) return true;
        let isSelect = false;
        for (const i of props.goodsSelectedList) {
          if (i.goodsId === item.goodsId) {
            isSelect = true;
            break;
          }
        }
        return !!props.max && props.goodsSelectedList.length >= props.max && !isSelect;
      },
    },
    {
      title: "商品编号",
      key: "goodsId",
      align: "center",
      width: 160,
    },
    {
      title: "商品名称",
      key: "goodsName",
      width: 120,
      fixed: "left",
      align: "center",
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
      title: "标记类型",
      key: "goodsType",
      align: "center",
      width: 100,
      render(row) {
        return goodsTabList.getItem(row.goodsTabType)?.label;
      },
    },
    {
      title: "商品价格",
      key: "goodsPrice",
      align: "center",
      width: 100,
    },
    {
      title: "商品库存",
      key: "goodsStock",
      align: "center",
      width: 100,
    },
  ];
  return list;
};
const { totalPage, getList, searchParam, list, listXWidth, listYHeight, searching, submitSearch } = useListPage(getListRequest, createColumns, {
  heightLevel: 1,
  params: { goodsType: props.goodsType, goodsStates: props.goodsStates, funcType: props.funcType },
  lazy: true,
});
</script>

<style scoped lang="less">
.constent-area {
  width: 1200px;
}
</style>
