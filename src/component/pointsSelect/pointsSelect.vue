<template>
  <n-button @click="() => (showModel = !showModel)" secondary type="primary" :disabled="disabled">请选择积分</n-button>

  <n-modal :show="showModel" @update:show="(state: boolean) => showModel = state">
    <n-card style="width: 1000px" title="积分选择" :bordered="false" size="huge" role="dialog" aria-modal="true">
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
        @update:checked-row-keys="handleCheck"
        :checked-row-keys="pointsIdSelectedList"
        :row-key="rowKey"
      ></n-data-table>
      <n-card>
        <div style="display: flex; justify-content: space-between; align-items: center">
          <n-pagination v-model:page="searchParam.page" :page-count="totalPage" @update:page="getList" />
          <n-button type="primary" inline-block @click="comfirmSelect" :disabled="searching">确认</n-button>
        </div>
      </n-card>
    </n-card>
  </n-modal>
</template>

<script lang="ts">
// 框架
import { defineComponent, ref, computed } from "vue";
// 组件库
// 自定义组件
import screenSection from "./screenSection.vue";
// 工具库
// 自定义工具
import { useListPage } from "@/util/common";
// 网络请求
import { getPointsList as getListRequest } from "@/request/points";
// store
import { pointsStateList, PointsState } from "@/view/pointsManager/pointsListManager/pointsListManagerStore";
// 类型
import type { DataTableColumns, DataTableRowKey } from "naive-ui";
import type { PointsItem } from "@/type/Points";

// 组件名
export default defineComponent({
  name: "pointsSelect",
});

type PointsSelectItem = {
  pointsId: string;
  pointsName: string;
};
</script>

<script lang="ts" setup>
const props = defineProps<{
  multiple?: boolean;
  disabled?: boolean;
  pointsSelectList: PointsSelectItem[];
  max?: number;
  pointsStates?: PointsState[];
}>();

const emit = defineEmits<{
  (event: "update:pointsSelectList", pointsSelectList: PointsSelectItem[]): void;
}>();

const showModel = ref(false);

const createColumns = () => {
  const list: DataTableColumns<PointsItem> = [
    {
      type: "selection",
      multiple: props.multiple,
      disabled: (item) => {
        let isSelect = false;
        for (const i of props.pointsSelectList) {
          if (i.pointsId === item.pointsId) {
            isSelect = true;
            break;
          }
        }
        return !!props.max && props.pointsSelectList.length >= props.max && !isSelect;
      },
    },
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
  ];

  return list;
};

const { totalPage, getList, searchParam, list, listXWidth, listYHeight, searching, submitSearch } = useListPage(getListRequest, createColumns, {
  heightLevel: 1,
  params: { pointsStates: props.pointsStates },
});

const pointsIdSelectedList = computed(() => {
  return props.pointsSelectList?.map((item) => item.pointsId);
});

const rowKey = (row: PointsItem) => row.pointsId;
const handleCheck = (rowKeys: DataTableRowKey[], rows: unknown[]) => {
  const list = (rows as PointsItem[]).map((item) => {
    return {
      pointsId: item.pointsId,
      pointsName: item.pointsName,
    };
  });
  emit("update:pointsSelectList", list);
};

const comfirmSelect = () => {
  showModel.value = false;
};
</script>

<style scoped lang="less"></style>
