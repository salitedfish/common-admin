<template>
  <n-form label-placement="left" label-width="120px" label-align="left">
    <n-card title="合成规则：">
      <n-space :vertical="true">
        <n-card :title="'规则' + (key + 1)" v-for="(item, key) in syntheticRules" :key="key">
          <n-form-item label="规则类型" required>
            <n-select v-model:value="item.ruleType" placeholder="请选择规则类型" clearable :options="ruleTypes" :disabled="!editAble || submiting"></n-select>
          </n-form-item>
          <n-form-item label="所需数量" required>
            <n-input-number v-model:value="item.needNum" style="width: 100%" clearable placeholder="请输入此规则所需的数量" :disabled="!editAble || submiting">
              <template #suffix> 份 </template>
            </n-input-number>
          </n-form-item>

          <n-form-item label="商品类目" v-show="item.ruleType === RuleType.CATEGORY" required>
            <category-select
              v-model:model-value="item.categoryList"
              :default-value="isNaN(Number(item.itemId)) ? undefined : Number(item.itemId)"
              check-type="all"
              :disabled="!editAble || submiting"
            ></category-select>
          </n-form-item>

          <n-form-item label="商品" v-show="item.ruleType === RuleType.GOODS" required>
            <n-input :value="item.goodsList.length >= 1 ? item.goodsList[0].goodsName : undefined" placeholder="请选择商品" :disabled="true"></n-input>
            <goodsSelect
              v-model:goods-selected-list="item.goodsList"
              :max="1"
              :disabled="!editAble || submiting"
              :goodsStates="[GoodsState.TO_BE_SHELVES, GoodsState.ON_THE_SHELF]"
            ></goodsSelect
          ></n-form-item>
          <n-button block @click="delRule(key)" secondary type="warning" v-if="editAble" :disabled="submiting">-删除规则</n-button>
        </n-card>
        <n-button block @click="addRule" secondary type="primary" v-if="editAble" :disabled="submiting">+添加规则</n-button>
        <n-button block @click="submit" type="primary" v-if="editAble" :disabled="submiting" :loading="submiting">确认提交</n-button>
      </n-space>
    </n-card>
  </n-form>
</template>

<script lang="ts">
// 框架
import { defineComponent, ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
// 组件库
// 自定义组件
import categorySelect from "@/component/common/categorySelect.vue";
import goodsSelect from "@/component/common/goodsSelect.vue";

// 工具库
// 自定义工具
import { commonNotify } from "@/util/common";
// 网络请求
import { submitSyntheticList, getSyntheticList } from "@/request/goods";
// store
import { useCommonStore } from "@/store/commonStore";
import { useRouteStore } from "@/store/routeStore";
import { ruleTypes } from "./syntheticDetailStore";
// 类型
import { GoodsState } from "@/view/goodsManager/goodsListManager/goodsListManagerStore";
import { DetailCheckType } from "@/type/Common";
import type { MergeObject, CategoryTreeItem } from "@/type/Common";
import type { SyntheticRule } from "@/type/GoodsManager";
import { RuleType } from "@/type/GoodsManager";
// 组件名
export default defineComponent({
  name: "syntheticDetail",
});
</script>

<script lang="ts" setup>
const router = useRouter();
const route = useRoute();
const checkType = route.query.type as DetailCheckType;
const goodsId = route.query.id as string;
const commonStore = useCommonStore();
const routeStore = useRouteStore();
const editAble = computed(() => {
  return checkType !== DetailCheckType.CHECK;
});
// 扩展两个类型用来保存选择的类目列表或商品列表
type ruleExtend = { categoryList: CategoryTreeItem[]; goodsList: { goodsId: string | number; goodsName: string }[] };
const syntheticRules = ref<MergeObject<Partial<SyntheticRule>, ruleExtend>[]>([]);

// 添加和删除规则
const addRule = () => {
  syntheticRules.value.push({
    itemId: undefined,
    needNum: undefined,
    ruleType: undefined,
    categoryList: [],
    goodsList: [],
  });
};
const delRule = (index: number) => {
  syntheticRules.value.splice(index, 1);
};

// 初始数据
onMounted(() => {
  if ([DetailCheckType.EDIT, DetailCheckType.CHECK].includes(checkType)) {
    initData();
  }
});
const initData = async () => {
  commonStore.pageLoading = true;
  const res = await getSyntheticList({
    goodsId: goodsId,
  });
  if (res) {
    const list = res.data;
    syntheticRules.value = list.map((item) => {
      let itemId = "";
      switch (item.ruleType) {
        case RuleType.CATEGORY:
          itemId = item.itemId;
          break;
        case RuleType.GOODS:
          itemId = item.itemName;
          break;
      }
      return {
        needNum: item.needNum,
        ruleType: item.ruleType,
        itemId: itemId,
        categoryList: [],
        goodsList:
          item.ruleType === RuleType.GOODS
            ? [
                {
                  goodsId: item.itemId,
                  goodsName: item.itemName,
                },
              ]
            : [],
      };
    });
  }
  commonStore.pageLoading = false;
};

// 提交
const submiting = ref(false);
const submit = async () => {
  for (const item of syntheticRules.value) {
    if (!item.needNum || !item.ruleType) {
      commonNotify("warning", "请将表单填写完整");
      return;
    }
  }

  submiting.value = true;
  const params = syntheticRules.value.map((item) => {
    let itemId = "";
    switch (item.ruleType) {
      case RuleType.CATEGORY:
        itemId = item.categoryList.length >= 1 ? String(item.categoryList[item.categoryList.length - 1].id) : item.itemId || "";
        break;
      case RuleType.GOODS:
        itemId = item.goodsList[0] ? String(item.goodsList[0].goodsId) : item.itemId || "";
        break;
    }
    return {
      itemId: itemId,
      needNum: item.needNum || 0,
      ruleType: item.ruleType || 0,
    };
  });

  const res = await submitSyntheticList({
    goodsId: goodsId,
    rules: params,
  });
  if (res) {
    commonNotify("success", "提交成功");
    routeStore.deleteCurrentRoute();
    router.push({
      name: "goodsListManager",
    });
  }
  submiting.value = false;
};
</script>

<style scoped lang="less"></style>
