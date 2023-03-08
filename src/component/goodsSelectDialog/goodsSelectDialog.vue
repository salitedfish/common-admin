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
        v-model:checked-row-keys="goodsIdSelectedList"
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
import {} from "@ultra-man/noa";

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
  }>(),
  {
    multiple: true,
  }
);
const emit = defineEmits<{
  (event: "update:showGoodsSelectModal", value: boolean): void;
  (event: "update:goodsSelectedList", value: { goodsId: string | number; goodsName: string }[]): void;
}>();

// 告诉列表依据哪个数据当作key，这里参照id加name
const rowKey = (row: GoodsListItem) => row.goodsId + "id-name" + row.goodsName;

// 设置列表选择的key，这里的key用id加name, 以便向外部列表提供id和name
const goodsIdSelectedList = ref<DataTableRowKey[]>([]);
goodsIdSelectedList.value = props.goodsSelectedList.map((item) => item.goodsId + "id-name" + item.goodsName);

// 当列表选择的改变时，改变外部的列表
watch(
  () => goodsIdSelectedList.value.length,
  () => {
    const selectList = goodsIdSelectedList.value.map((key) => {
      // 将key拆成id和name
      const keyArr = (key as string).split("id-name");
      return {
        goodsId: keyArr[0],
        goodsName: keyArr[1],
      };
    });
    emit("update:goodsSelectedList", selectList);
  }
);

// 列表规则项
const createColumns = () => {
  const list: DataTableColumns<GoodsListItem> = [
    {
      type: "selection",
      multiple: props.multiple,
      disabled: (item) => {
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
});
</script>

<style scoped lang="less">
.constent-area {
  width: 1200px;
}
</style>
