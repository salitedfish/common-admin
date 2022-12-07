<template>
  <n-form label-placement="left" label-width="120px" label-align="left" :disabled="submiting">
    <n-card>
      <n-card title="基本信息：" style="margin-bottom: 15px">
        <n-form-item label="空投名称:">
          <n-input v-model:value="formData.info.name" placeholder="请输入空投名称"></n-input>
        </n-form-item>
        <n-form-item label="空投物品类型：">
          <n-select :options="airDropItemTypeList" v-model:value="formData.info.itemType" placeholder="请选择空投物品类型"></n-select>
        </n-form-item>
        <n-form-item label="商品编号：" v-show="formData.info.itemType === AirDropItemType.GOODS">
          <n-input v-model:value="formData.info.itemId" placeholder="请输入商品编号"></n-input>
        </n-form-item>
        <n-form-item label="积分编号：" v-show="formData.info.itemType === AirDropItemType.POINTS">
          <n-input v-model:value="formData.info.itemId" placeholder="请输入积分编号"></n-input>
        </n-form-item>
        <n-form-item label="执行时间类型：">
          <n-select :options="airDropTimeTypeList" v-model:value="formData.info.timeType" placeholder="请选择执行时间类型"></n-select>
        </n-form-item>
        <n-form-item label="投放日(每月)：" v-show="formData.info.timeType === AirDropTimeType.MONTH">
          <n-select :options="commonStore.monthMap" v-model:value="formData.info.timeDay" placeholder="请选择投放日"></n-select>
        </n-form-item>
        <n-form-item label="投放日(每周)：" v-show="formData.info.timeType === AirDropTimeType.WEEK">
          <n-select :options="commonStore.weekMap" v-model:value="formData.info.timeDay" placeholder="请选择投放日"></n-select>
        </n-form-item>
        <n-form-item label="投放时：">
          <n-time-picker v-model:value="formData.info.timeHour" format="h" style="width: 100%"></n-time-picker>
        </n-form-item>
        <n-form-item label="计算名单距开始空投时间：">
          <n-input-number v-model:value="formData.info.expireMinute" placeholder="请输入时间分钟" style="width: 100%"> <template #suffix> 分钟 </template></n-input-number>
        </n-form-item>
        <n-form-item label="总执行次数：">
          <n-input-number v-model:value="formData.info.totalNum" placeholder="请输入总执行次数，0表示一直执行" style="width: 100%"></n-input-number>
        </n-form-item>
      </n-card>

      <n-card title="规则：" style="margin-bottom: 15px">
        <n-card v-for="(item, key) in formData.rules" :key="key">
          <n-form-item label="规则类型:">
            <n-select v-model:value="item.type" :options="ruleTypeList" placeholder="请选择规则类型" style="width: 100%" clearable />
          </n-form-item>
          <n-form-item label="商品类目:" v-if="[RuleType.HOLD_CATEGORY, RuleType.EXTENSION_CATEGORY].includes(Number(item.type))">
            <category-select
              @update:model-value="(categoryList) => (item.itemId = String(categoryList[categoryList.length - 1].id))"
              placeholder="请选择商品类目"
              v-model="item.categoryList"
              check-type="all"
              :default-value="Number(item.itemId) || undefined"
            ></category-select>
          </n-form-item>
          <n-form-item label="商品编号:" v-if="[RuleType.HOLD_GOODS, RuleType.EXTENSION_GOODS].includes(Number(item.type))">
            <n-input placeholder="请输入商品编号" v-model:value="item.itemId"></n-input>
          </n-form-item>
          <n-form-item label="单位数量:">
            <n-input-number v-model:value="item.holdNum" placeholder="请输入奖励所需的单位数量" :min="1" style="width: 100%"><template #suffix> 份 </template></n-input-number>
          </n-form-item>
          <n-form-item label="持有天数:" v-if="[RuleType.HOLD_GOODS, RuleType.HOLD_CATEGORY].includes(Number(item.type))">
            <n-input-number
              v-model:value="item.holdTime"
              @update:value="(value) => ruleHoldTimeChange(value, item)"
              :min="0"
              placeholder="请输入持有天数，0表示不限制，大于0则单位数量只能为1"
              style="width: 100%"
              ><template #suffix> 天 </template></n-input-number
            >
          </n-form-item>
          <n-form-item label="奖励数量:">
            <n-input-number v-model:value="item.limitNum" placeholder="请输入每单位数量奖励数量" :min="1" style="width: 100%"><template #suffix> 份 </template></n-input-number>
          </n-form-item>
          <n-form-item label="奖励上限:">
            <n-input-number v-model:value="item.limitNum" placeholder="请输入奖励上限，0表示无上限" :min="0" style="width: 100%"><template #suffix> 份 </template></n-input-number>
          </n-form-item>
          <template #footer> <n-button block secondary type="warning">-删除规则</n-button> </template>
        </n-card>
        <n-button block secondary type="primary" :loading="submiting">+添加规则</n-button>
      </n-card>
    </n-card>
  </n-form>
  <n-button style="margin-top: 15px" block type="primary" @click="handleSubmit" :loading="submiting" :disabled="submiting">确认提交</n-button>
</template>

<script lang="ts">
import { defineComponent, watch } from "vue";
export default defineComponent({
  name: "addTimingAirdrop",
});
</script>
<script lang="ts" setup>
// 框架
import { ref, reactive } from "vue";
// 组件库
// 自定义组件
import categorySelect from "@/component/common/categorySelect.vue";
// 工具库
// 自定义工具
// 网络请求
// store
import { useCommonStore } from "@/store/commonStore";
import { airDropTimeTypeList, AirDropTimeType } from "../timingAirdropManager/timingAirdropManagerStore";
import { airDropItemTypeList, AirDropItemType } from "../manualAirdropManager/manualAirdropManagerStore";
import { ruleTypeList, RuleType } from "./timingAirdropDetailStore";
// 类型
import type { TimingAirDropAddParams } from "@/type/Operator";
// import type { CategoryTreeItem } from "@/type/Common";

const commonStore = useCommonStore();

const formData = reactive<TimingAirDropAddParams>({
  info: {
    expireMinute: null,
    itemId: "",
    itemType: null,
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
      type: null,
      unitNum: null,
      categoryList: [],
    },
  ],
});

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

const submiting = ref(false);
const handleSubmit = () => {
  null;
};
</script>

<style scoped lang="less"></style>
