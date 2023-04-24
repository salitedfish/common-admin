<template>
  <n-form label-placement="left" label-width="120px" label-align="left" :disabled="submiting || isCheck">
    <n-card title="基本信息：" style="margin-bottom: 15px">
      <n-form-item label="空投名称:" required>
        <n-input v-model:value="formData.info.name" placeholder="请输入空投名称"></n-input>
      </n-form-item>

      <n-form-item label="执行时间类型：" required>
        <n-select :options="airDropTimeTypeList" v-model:value="formData.info.timeType" placeholder="请选择执行时间类型"></n-select>
      </n-form-item>
      <n-form-item label="执行日(每月)：" v-show="formData.info.timeType === AirDropTimeType.MONTH" required>
        <n-select :options="commonStore.monthMap" v-model:value="formData.info.timeDay" placeholder="请选择执行日"></n-select>
      </n-form-item>
      <n-form-item label="执行日(每周)：" v-show="formData.info.timeType === AirDropTimeType.WEEK" required>
        <n-select :options="commonStore.weekMap" v-model:value="formData.info.timeDay" placeholder="请选择执行日"></n-select>
      </n-form-item>
      <n-form-item label="执行时间：" required>
        <n-select :options="commonStore.hourMap" v-model:value="formData.info.timeHour" placeholder="请选择执行时间"></n-select>
      </n-form-item>
      <n-form-item label="计算名单距开始空投时间：" required>
        <n-input-number v-model:value="formData.info.expireMinute" placeholder="请输入时间分钟" style="width: 100%"> <template #suffix> 分钟 </template></n-input-number>
      </n-form-item>
      <n-form-item label="总执行次数：" required>
        <n-input-number v-model:value="formData.info.totalNum" placeholder="请输入总执行次数，0表示一直执行" style="width: 100%"></n-input-number>
      </n-form-item>
    </n-card>

    <n-card title="规则：" style="margin-bottom: 15px">
      <n-card v-for="(item, key) in formData.rules" :key="key" :title="`规则${key + 1}`" style="margin-bottom: 15px">
        <n-form-item label="规则类型:" required>
          <n-select v-model:value="item.itemType" :options="ruleTypeList" placeholder="请选择规则类型" style="width: 100%" clearable />
        </n-form-item>
        <n-form-item label="商品类目:" v-if="[RuleType.HOLD_CATEGORY, RuleType.EXTENSION_CATEGORY].includes(Number(item.itemType))" required>
          <category-select
            @update:model-value="(categoryList) => (item.itemId = String(categoryList[categoryList.length - 1].id))"
            placeholder="请选择商品类目"
            v-model="item.categoryList"
            check-type="all"
            :default-value="Number(item.itemId) || undefined"
            :disabled="isCheck || submiting"
          ></category-select>
        </n-form-item>
        <n-form-item label="商品编号:" v-if="[RuleType.HOLD_GOODS, RuleType.EXTENSION_GOODS].includes(Number(item.itemType))" required>
          <n-input placeholder="请输入商品编号" v-model:value="item.itemId"></n-input>
        </n-form-item>

        <n-form-item label="空投物品类型：" required>
          <n-select :options="airDropItemTypeList" v-model:value="item.rewardType" placeholder="请选择空投物品类型" :disabled="isAdmin || submiting || isCheck"></n-select>
        </n-form-item>
        <!-- <n-form-item label="商品编号：" v-show="formData.info.itemType === AirDropItemType.GOODS && !isAdmin" required>
        <n-input v-model:value="formData.info.itemId" placeholder="请输入商品编号,必须为空投商品"></n-input>
      </n-form-item>
      <n-form-item label="积分编号：" v-show="formData.info.itemType === AirDropItemType.POINTS" required>
        <n-input v-model:value="formData.info.itemId" placeholder="请输入积分编号"></n-input>
      </n-form-item> -->

        <n-form-item label="奖励商品:" required v-if="item.rewardType === AirDropItemType.GOODS">
          <n-input placeholder="请选择奖励商品" :value="item.rewardGoods.length >= 1 ? item.rewardGoods[0].goodsName : undefined" disabled></n-input>
          <goodsSelect
            v-model:goods-selected-list="item.rewardGoods"
            :max="1"
            :disabled="submiting || isCheck"
            :goodsStates="[GoodsState.TO_BE_SHELVES, GoodsState.ON_THE_SHELF]"
          ></goodsSelect>
        </n-form-item>

        <n-form-item label="奖励积分:" required v-if="item.rewardType === AirDropItemType.POINTS">
          <n-input placeholder="请选择奖励积分" :value="item.rewardPoints.length >= 1 ? item.rewardPoints[0].pointsName : undefined" disabled></n-input>
          <pointsSelect
            v-model:points-select-list="item.rewardPoints"
            :max="1"
            :disabled="submiting || isCheck"
            :multiple="true"
            :pointsStates="[PointsState.PUBLISH_SUCCESS]"
          ></pointsSelect>
        </n-form-item>

        <n-form-item label="奖励代币:" required v-if="item.rewardType === AirDropItemType.COIN">
          <n-input placeholder="请选择奖励代币" :value="item.rewardCoin.length >= 1 ? item.rewardCoin[0].coinName : undefined" disabled></n-input>
          <parallelCoinSelect v-model:parallel-coin-select-list="item.rewardCoin" :max="1" :disabled="submiting || isCheck" :multiple="true"></parallelCoinSelect>
        </n-form-item>

        <n-form-item label="单位数量:" required>
          <n-input-number v-model:value="item.holdNum" placeholder="请输入奖励所需的单位数量" :min="1" style="width: 100%"><template #suffix> 份 </template></n-input-number>
        </n-form-item>
        <n-form-item label="持有天数:" v-if="[RuleType.HOLD_GOODS, RuleType.HOLD_CATEGORY].includes(Number(item.itemType))" required>
          <n-input-number
            v-model:value="item.holdTime"
            @update:value="(value) => ruleHoldTimeChange(value, item)"
            :min="0"
            placeholder="请输入持有天数，0表示不限制，大于0则单位数量只能为1"
            style="width: 100%"
            ><template #suffix> 天 </template></n-input-number
          >
        </n-form-item>
        <n-form-item label="持有天数类型:" v-if="[RuleType.HOLD_GOODS, RuleType.HOLD_CATEGORY].includes(Number(item.itemType))" required>
          <n-select :options="holdTimeTypeList" v-model:value="item.holdTimeType" placeholder="请选择持有天数类型"></n-select>
        </n-form-item>

        <n-form-item label="奖励数量:" required>
          <n-input-number v-model:value="item.unitNum" placeholder="请输入每单位数量奖励数量" :min="1" style="width: 100%"><template #suffix> 份 </template></n-input-number>
        </n-form-item>
        <n-form-item label="单次奖励上限:" required>
          <n-input-number v-model:value="item.limitNum" placeholder="请输入单次奖励上限，0表示无上限" :min="0" style="width: 100%"
            ><template #suffix> 份 </template></n-input-number
          >
        </n-form-item>
        <n-form-item label="总奖励上限:" required v-if="isCheck">
          <n-input-number v-model:value="item.totalUnitNum" placeholder="请输入总奖励上限，0表示无上限" :min="0" style="width: 100%"
            ><template #suffix> 份 </template></n-input-number
          >
        </n-form-item>
        <template #footer> <n-button block secondary type="warning" v-if="!isCheck" :disabled="submiting" @click="deleteRule(key)">-删除规则</n-button> </template>
      </n-card>
      <n-button block secondary type="primary" v-if="!isCheck" :disabled="submiting" @click="addRule">+添加规则</n-button>
    </n-card>
  </n-form>
  <n-button style="margin-top: 15px" block type="primary" @click="handleSubmit" :loading="submiting" :disabled="submiting" v-if="!isCheck">确认提交</n-button>
</template>

<script lang="ts">
import { defineComponent, watch } from "vue";
export default defineComponent({
  name: "addTimingAirdrop",
});
</script>
<script lang="ts" setup>
// 框架
import { ref, reactive, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
// 组件库
// 自定义组件
import categorySelect from "@/component/common/categorySelect.vue";
import goodsSelect from "@/component/common/goodsSelect.vue";
import pointsSelect from "@/component/pointsSelect/pointsSelect.vue";
import parallelCoinSelect from "@/component/parallelCoinSelect/parallelCoinSelect.vue";
// 工具库
// 自定义工具
import { commonNotify } from "@/util/common";
// 网络请求
import { addTimingAirDrop, editTimingAirDrop, getDetailTimingAirDrop } from "@/request/operator";
// store
import { useRouteStore } from "@/store/routeStore";
import { useAuthStore } from "@/store/authStore";
import { useCommonStore } from "@/store/commonStore";
import { airDropTimeTypeList, AirDropTimeType } from "../timingAirdropManager/timingAirdropManagerStore";
import { airDropItemTypeList, AirDropItemType } from "../manualAirdropManager/manualAirdropManagerStore";
import { ruleTypeList, RuleType, holdTimeTypeList } from "./timingAirdropDetailStore";
import { GoodsState } from "@/view/goodsManager/goodsListManager/goodsListManagerStore";
import { PointsState } from "@/view/pointsManager/pointsListManager/pointsListManagerStore";
// 类型
import type { TimingAirDropAddParams } from "@/type/Operator";
// import type { CategoryTreeItem } from "@/type/Common";

const commonStore = useCommonStore();
const routeStore = useRouteStore();
const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

const isCheck = computed(() => {
  return !!route.query.isCheck;
});
const isEdit = computed(() => {
  return !!route.query.id && !isCheck.value;
});
const timingAirdropId = computed(() => {
  return route.query.id;
});
const isAdmin = authStore.isAdmin;

const formData = reactive<TimingAirDropAddParams>({
  info: {
    expireMinute: null,
    name: "",
    timeDay: null,
    timeHour: null,
    timeType: null,
    totalNum: null,
  },
  rules: [
    {
      holdNum: null,
      holdTime: null,
      holdTimeType: null,
      itemId: "",
      limitNum: null,
      totalUnitNum: null,
      unitNum: null,
      categoryList: [],
      itemType: null,
      itemName: null,
      rewardId: null,
      rewardType: null,
      rewardName: null,
      rewardGoods: [],
      rewardPoints: [],
      rewardCoin: [],
    },
  ],
});

if (isAdmin) {
  for (const item of formData.rules) {
    item.rewardType = AirDropItemType.POINTS;
  }
}

watch(
  () => formData.info.timeType,
  (newValue) => {
    formData.info.timeDay = newValue === AirDropTimeType.DAY ? 0 : 1;
  }
);
const ruleHoldTimeChange = (value: number | null, rule: TimingAirDropAddParams["rules"][number]) => {
  if (value && value > 0) {
    rule.holdNum = 1;
  }
};
const deleteRule = (key: number) => {
  if (formData.rules.length <= 1) {
    commonNotify("warning", "不能少于一条规则！");
  } else {
    formData.rules.splice(key, 1);
  }
};
const addRule = () => {
  formData.rules.push({
    holdNum: null,
    holdTime: null,
    holdTimeType: null,
    itemId: "",
    limitNum: null,
    totalUnitNum: null,
    unitNum: null,
    categoryList: [],
    itemType: null,
    itemName: null,
    rewardId: null,
    rewardType: null,
    rewardName: null,
    rewardGoods: [],
    rewardPoints: [],
    rewardCoin: [],
  });
};

const submiting = ref(false);
const handleSubmit = async () => {
  submiting.value = true;

  for (const item of formData.rules) {
    // 如果是商品
    if (item.rewardType === AirDropItemType.GOODS) {
      item.rewardId = String(item.rewardGoods[0]?.goodsId);
      item.rewardName = String(item.rewardGoods[0]?.goodsId);
    }
    // 如果是积分
    if (item.rewardType === AirDropItemType.POINTS) {
      item.rewardId = String(item.rewardPoints[0]?.pointsId);
      item.rewardName = String(item.rewardPoints[0]?.pointsName);
    }
    // 如果是代币
    if (item.rewardType === AirDropItemType.COIN) {
      item.rewardId = String(item.rewardCoin[0]?.coinId);
      item.rewardName = String(item.rewardCoin[0]?.coinName);
    }
  }

  let tip = "空投任务添加成功";
  if (isEdit.value) {
    formData.info.id = Number(timingAirdropId.value);
    tip = "空投任务编辑成功";
  }
  const res = isEdit.value ? await editTimingAirDrop(formData) : await addTimingAirDrop(formData);
  if (res) {
    commonNotify("success", tip);
    routeStore.deleteCurrentRoute();
    router.push({
      name: "timingAirdropManager",
    });
  }
  submiting.value = false;
};

const initForm = async () => {
  commonStore.pageLoading = true;
  const res = await getDetailTimingAirDrop({ id: Number(timingAirdropId.value) });
  if (res) {
    const { info, rules } = res.data;
    formData.info = info;
    formData.rules = [];

    for (const item of rules) {
      const { rewardType, rewardId, rewardName } = item;
      formData.rules.push({
        ...item,
        categoryList: [],
        rewardGoods: rewardType === AirDropItemType.GOODS ? [{ goodsId: rewardId, goodsName: rewardName }] : [],
        rewardPoints: rewardType === AirDropItemType.POINTS ? [{ pointsId: rewardId, pointsName: rewardName }] : [],
        rewardCoin: rewardType === AirDropItemType.COIN ? [{ coinId: rewardId, coinName: rewardName }] : [],
      });
    }
  }
  commonStore.pageLoading = false;
};

onMounted(() => {
  if (isEdit.value || isCheck.value) {
    initForm();
  }
});
</script>

<style scoped lang="less"></style>
