<template>
  <n-button @click="() => (showModel = !showModel)" secondary type="primary" :disabled="disabled">请选择代币</n-button>

  <n-modal :show="showModel" @update:show="(state: boolean) => showModel = state">
    <n-card style="width: 1000px" title="代币选择" :bordered="false" size="huge" role="dialog" aria-modal="true">
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
        v-model:checked-row-keys="coinIdSelectedList"
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
import { defineComponent, ref, watch, createVNode } from "vue";
// 组件库
import { NEllipsis } from "naive-ui";
// 自定义组件
import screenSection from "./screenSection.vue";
// 工具库
// 自定义工具
import { useListPage } from "@/util/common";
// 网络请求
import { getParallelCoinList } from "@/request/points";
// store
// 类型
import type { DataTableColumns, DataTableRowKey } from "naive-ui";
import type { ParallelCoinItem } from "@/type/Points";

// 组件名
export default defineComponent({
  name: "pointsSelect",
});

type ParallelCoinSelectItem = {
  coinId: string;
  coinName: string;
};
</script>

<script lang="ts" setup>
const props = defineProps<{
  multiple?: boolean;
  disabled?: boolean;
  parallelCoinSelectList: ParallelCoinSelectItem[];
  max?: number;
}>();

const emit = defineEmits<{
  (event: "update:parallelCoinSelectList", parallelCoinSelectList: ParallelCoinSelectItem[]): void;
}>();

const showModel = ref(false);

const createColumns = () => {
  const list: DataTableColumns<ParallelCoinItem> = [
    {
      type: "selection",
      multiple: props.multiple,
      disabled: (item) => {
        let isSelect = false;
        for (const i of props.parallelCoinSelectList) {
          if (i.coinId === item.coin) {
            isSelect = true;
            break;
          }
        }
        return !!props.max && props.parallelCoinSelectList.length >= props.max && !isSelect;
      },
    },
    {
      title: "代币",
      key: "coin",
      align: "center",
      width: 120,
    },
    {
      title: "发行地址",
      key: "fromChainAddress",
      align: "center",
      width: 120,
      render: (row) => {
        return createVNode(
          NEllipsis,
          {},
          {
            default: () => row.address,
          }
        );
      },
    },
    {
      title: "持有数量",
      key: "holdNum",
      align: "center",
      width: 120,
    },
    {
      title: "冻结数量",
      key: "freezeNum",
      align: "center",
      width: 120,
    },
  ];

  return list;
};

const { totalPage, getList, searchParam, list, listXWidth, listYHeight, searching, submitSearch } = useListPage(getParallelCoinList, createColumns, {
  heightLevel: 1,
});

const coinIdSelectedList = ref<DataTableRowKey[]>([]);

coinIdSelectedList.value = props.parallelCoinSelectList.map((item) => item.coinId + "id-name" + item.coinName);

const rowKey = (row: ParallelCoinItem) => row.coin + "id-name" + row.coin;
watch(
  () => coinIdSelectedList.value.length,
  () => {
    const selectList = coinIdSelectedList.value.map((key) => {
      const keyArr = (key as string).split("id-name");
      return {
        coinId: keyArr[0],
        coinName: keyArr[1],
      };
    });
    emit("update:parallelCoinSelectList", selectList);
  }
);

const comfirmSelect = () => {
  showModel.value = false;
};
</script>

<style scoped lang="less"></style>
