<template>
  <n-form label-placement="left" label-width="170px" label-align="left" :disabled="submiting">
    <n-card :title="goodsName" style="margin-bottom: 15px">
      <n-form-item label="一级市场平台分账比例:">
        <n-input-number
          placeholder="请输入一级市场平台分账比例，-1表示系统默认，0表示不分账，最大30"
          v-model:value="consignmentParams.primaryPlatformRate"
          :style="{ width: '100%' }"
          :min="-1"
          :max="30"
          clearable
        >
          <template #suffix> % </template>
        </n-input-number>
      </n-form-item>

      <n-form-item label="是否可以转赠:">
        <n-select v-model:value="consignmentParams.giftType" :options="giftTypeList" placeholder="请选择是否可以转赠" :style="{ width: '100%' }" clearable />
      </n-form-item>

      <n-form-item label="转赠开始时间:" v-if="consignmentParams.giftType === GiftType.YES">
        <n-date-picker
          placeholder="请选择转赠开始时间"
          v-model:formatted-value="consignmentParams.giftTime"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetime"
          :style="{ width: '100%' }"
          clearable
        />
      </n-form-item>

      <!-- <n-form-item label="是否可以上架二级市场:">
        <n-select v-model:value="consignmentParams.secondaryType" :options="consignmentTypeList" placeholder="请选择是否可以上架二级市场" :style="{ width: '100%' }" clearable />
      </n-form-item> -->

      <n-form-item label="二级市场平台分账比例:" v-if="consignmentParams.secondaryType === ConsignmentType.YES">
        <n-input-number
          placeholder="请输入二级市场平台分账比例，-1表示系统默认，0表示不分账，最大100"
          v-model:value="consignmentParams.secondaryPlatformRate"
          :style="{ width: '100%' }"
          :min="-1"
          :max="100"
          clearable
        >
          <template #suffix> % </template>
        </n-input-number>
      </n-form-item>

      <!-- <n-form-item label="二级市场商户分账比例:" v-if="consignmentParams.secondaryType === ConsignmentType.YES">
        <n-input-number
          placeholder="请输入二级市场商户分账比例，-1表示系统默认，0表示不分账，最大100"
          v-model:value="consignmentParams.secondaryMerchantRate"
          :style="{ width: '100%' }"
          :min="-1"
          :max="100"
          clearable
        >
          <template #suffix> % </template>
        </n-input-number>
      </n-form-item>

      <n-form-item label="二级市场商户分账杉德钱包编号:" v-if="consignmentParams.secondaryType === ConsignmentType.YES">
        <n-input placeholder="请输入二级市场商户分账杉德钱包编号" v-model:value="consignmentParams.secondaryMerchantSandWalletId" :style="{ width: '100%' }" clearable> </n-input>
      </n-form-item> -->

      <n-form-item label="二级市场最低价格:" v-if="consignmentParams.secondaryType === ConsignmentType.YES">
        <n-input-number placeholder="请输入二级市场最低价格" v-model:value="consignmentParams.secondaryPrice" :style="{ width: '100%' }" :min="0.01" clearable> </n-input-number>
      </n-form-item>

      <n-form-item label="二级交易的开始时间:" v-if="consignmentParams.secondaryType === ConsignmentType.YES">
        <n-date-picker
          placeholder="请选择二级交易的开始时间"
          v-model:formatted-value="consignmentParams.secondaryTime"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetime"
          :style="{ width: '100%' }"
          clearable
        />
      </n-form-item>
    </n-card>
  </n-form>

  <n-button type="primary" @click="submitHandler" block style="margin-top: 15px" :loading="submiting" :disabled="submiting">确认提交</n-button>
</template>

<script lang="ts">
// 框架
import { defineComponent, reactive, ref, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
// 组件库
// 自定义组件
// 工具库
// 自定义工具
import { commonNotify } from "@/util/common";
// 网络请求
import { updateGoodsConsignmentParams, getGoodsDetail } from "@/request/goods";
// store
import { useRouteStore } from "@/store/routeStore";
import { useCommonStore } from "@/store/commonStore";
import { giftTypeList, consignmentTypeList, GiftType, ConsignmentType } from "./consignmentParameterStore";
// 类型
import type { ConsignmentParams } from "@/type/GoodsManager";
// 组件名
export default defineComponent({
  name: "consignmentParameter",
});
</script>

<script lang="ts" setup>
const router = useRouter();
const route = useRoute();
const routeStore = useRouteStore();
const commonStore = useCommonStore();

const goodsId = computed(() => {
  return (route.query.id as string) || "";
});
const goodsName = computed(() => {
  return (route.query.name as string) || "";
});

const consignmentParams = reactive<ConsignmentParams>({});

const submiting = ref(false);
const submitHandler = async () => {
  submiting.value = true;
  consignmentParams.goodsId = goodsId.value;
  const res = await updateGoodsConsignmentParams(consignmentParams);
  submiting.value = false;
  if (res) {
    commonNotify("success", "提交成功");
    routeStore.deleteCurrentRoute();
    router.push({
      name: "goodsListManager",
    });
  }
};

const initData = async () => {
  commonStore.pageLoading = true;
  const res = await getGoodsDetail(goodsId.value);
  if (res) {
    const { giftTime, giftType, primaryPlatformRate, secondaryMerchantRate, secondaryMerchantSandWalletId, secondaryPlatformRate, secondaryPrice, secondaryTime, secondaryType } =
      res.data.extend;
    consignmentParams.giftTime = giftTime;
    consignmentParams.giftType = giftType;
    consignmentParams.primaryPlatformRate = primaryPlatformRate;
    consignmentParams.secondaryMerchantRate = secondaryMerchantRate;
    consignmentParams.secondaryMerchantSandWalletId = secondaryMerchantSandWalletId;
    consignmentParams.secondaryPlatformRate = secondaryPlatformRate;
    consignmentParams.secondaryPrice = Number(secondaryPrice);
    consignmentParams.secondaryTime = secondaryTime;
    consignmentParams.secondaryType = secondaryType;
  }
  commonStore.pageLoading = false;
};

onMounted(() => {
  if (goodsId.value) {
    initData();
  } else {
    commonNotify("error", "数据不完整，请从商品列表重新进入");
  }
});
</script>

<style scoped lang="less"></style>
