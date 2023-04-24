<script lang="ts">
// 框架
import { defineComponent, ref, onMounted, createVNode, h } from "vue";
import { NInputNumber, NInput, NSelect, NButton, NSpace } from "naive-ui";
// 组件库
// 自定义组件
import goodsSelect from "@/component/common/goodsSelect.vue";
// 工具库
// 自定义工具
import { commonNotify } from "@/util/common";
// 网络请求
import { getVipLevelList, updateVipLevelList } from "@/request/user";
// store
import { useCommonStore } from "@/store/commonStore";
import { vipTypes, useApiToView, useViewToApi, vipGetTypes, VipGetType } from "./vipLevelManagerStore";
import { GoodsState } from "@/view/goodsManager/goodsListManager/goodsListManagerStore";

// 类型
import type { DataTableColumns } from "naive-ui";
import type { VipLevelItem } from "@/type/User";
// 组件名
export default defineComponent({
  name: "vipLevelManager",
});
</script>

<script lang="ts" setup>
const commonStore = useCommonStore();
const submiting = ref(false);

const vipLevelList = ref<VipLevelItem[][]>([[], []]);

const vipTitle = (key: number) => {
  return vipTypes.getItem(Number(key))?.label + "等级";
};

// 表格
const createColumns = (levelList: VipLevelItem[]) => {
  const list: DataTableColumns<VipLevelItem> = [
    {
      title: "等级",
      key: "level",
      width: 100,
      align: "center",
      render: (row) => {
        return createVNode(NInputNumber, {
          placeholder: "请输入等级",
          min: 1,
          value: row.level,
          onUpdateValue: (newValue: number) => {
            row.level = newValue;
          },
          disabled: submiting.value,
        });
      },
    },
    {
      title: "等级名称",
      key: "name",
      width: 100,
      align: "center",
      render: (row) => {
        return createVNode(NInput, {
          placeholder: "请输入等级名称",
          value: row.name,
          onUpdateValue: (newValue: string) => {
            row.name = newValue;
          },
          disabled: submiting.value,
        });
      },
    },
    {
      title: "获取方式",
      key: "type",
      width: 100,
      align: "center",
      render: (row) => {
        return createVNode(NSelect, {
          placeholder: "请选择获取方式",
          options: vipGetTypes,
          value: row.type,
          onUpdateValue: (newValue: number) => {
            row.type = newValue;
            changeAmount(row);
          },
          disabled: submiting.value,
        });
      },
    },
    {
      title: "选择商品",
      key: "type",
      width: 240,
      align: "center",
      render: (row) => {
        return createVNode(NSpace, { justify: "center" }, () => [
          createVNode(NInput, { disabled: true, value: row.goodsSelectList.length > 0 ? row.goodsSelectList[0].goodsName : null, placeholder: "请选择商品" }),
          createVNode(goodsSelect, {
            goodsSelectedList: row.goodsSelectList,
            "onUpdate:goodsSelectedList": (newValue: { goodsId: string; goodsName: string }[]) => {
              row.goodsSelectList = newValue;
            },
            max: 1,
            goodsStates: [GoodsState.TO_BE_SHELVES, GoodsState.ON_THE_SHELF],
            disabled: submiting.value || row.type !== VipGetType.GOODS,
          }),
        ]);
      },
    },
    {
      title: "所需额度或单次下单数量",
      key: "amount",
      width: 160,
      align: "center",
      render: (row) => {
        return createVNode(NInputNumber, {
          placeholder: "请输入所需额度或单次下单数量",
          min: 1,
          value: row.amount,
          onUpdateValue: (newValue: number) => {
            row.amount = newValue;
          },
          disabled: submiting.value,
        });
      },
    },
    {
      title: "操作",
      key: "operaction",
      align: "center",
      width: 100,
      fixed: "right",
      render(row, rowIndex) {
        return createVNode(NButton, { type: "warning", size: "small", secondary: true, onClick: () => delLevel(levelList, rowIndex) }, { default: () => "删除" });
      },
    },
  ];
  return list;
};

// 获取vip等级列表
const initLevelList = async () => {
  commonStore.pageLoading = true;
  const res = await getVipLevelList();
  if (res) {
    vipLevelList.value = useApiToView(res.data);
    commonStore.pageLoading = false;
  }
};

// 添加等级
const addLevel = (list: VipLevelItem[]) => {
  list.push({
    goodsSelectList: [],
  });
};

// 删除等级
const delLevel = (list: VipLevelItem[], index: number) => {
  list.splice(index, 1);
};

// 每当类型改变时，重制amount
const changeAmount = (item: VipLevelItem) => {
  item.amount = null;
};

// 提交列表
const handleSubmit = async () => {
  submiting.value = true;
  const vipList = useViewToApi(vipLevelList.value);
  const res = await updateVipLevelList(vipList);
  if (res) {
    commonNotify("success", "vip等级设置成功！");
  }
  submiting.value = false;
};

onMounted(() => {
  initLevelList();
});
</script>

<template>
  <n-form label-placement="left" label-width="120px" label-align="left" :disabled="submiting" v-if="!commonStore.pageLoading">
    <n-card :title="vipTitle(key)" style="margin-bottom: 15px" v-for="(item, key) in vipLevelList" :key="key">
      <n-data-table :single-line="false" :columns="createColumns(item)" :data="item" :loading="commonStore.pageLoading" :scroll-x="800"></n-data-table>

      <n-button block secondary type="primary" :disabled="submiting" @click="() => addLevel(item)">+添加等级</n-button>
    </n-card>
  </n-form>
  <n-button style="margin-top: 15px" block type="primary" @click="handleSubmit" :loading="submiting" :disabled="submiting">确认提交</n-button>
</template>

<style scoped lang="less"></style>
