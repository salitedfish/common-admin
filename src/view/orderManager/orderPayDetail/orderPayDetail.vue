<script lang="ts">
// 框架
import { defineComponent, ref, reactive, onMounted } from "vue";
import { useRoute } from "vue-router";
// 组件
// 工具
// 接口
import { getOrderPayDetail } from "@/request/order";
// 数据
import { payChannelList, PayChannel } from "../orderListManager/orderListManagerStore";
import { pointsTypeList } from "./orderPayDetailStore";
// 类型
import type { OrderPayDetail } from "@/type/Order";
export default defineComponent({
  name: "orderPayDetail",
});
</script>

<script lang="ts" setup>
const route = useRoute();
const orderId = route.query.orderId;

const orderPayDetail = ref<OrderPayDetail | null>(null);

const init = async () => {
  const res = await getOrderPayDetail({ orderId: String(orderId) });
  if (res) {
    orderPayDetail.value = res.data;
  }
};

onMounted(() => {
  init();
});
</script>

<template>
  <div class="orderPayDetail">
    <n-form label-placement="left" label-width="120px" label-align="left">
      <n-card title="基本信息">
        <n-form-item label="付款渠道:">
          <n-input placeholder="" :value="payChannelList.getItem(orderPayDetail?.payChannel)?.label" disabled></n-input>
        </n-form-item>
        <n-form-item :label="`实际支付${orderPayDetail?.payChannel === PayChannel.POINT ? '数量' : '金额'}:`">
          <n-input placeholder="" :value="orderPayDetail?.orderPayAmount" disabled></n-input>
        </n-form-item>
      </n-card>

      <n-card title="积分信息" v-if="orderPayDetail?.points">
        <n-form-item label="积分类型:">
          <n-select :value="orderPayDetail.points.pointsType" :options="pointsTypeList" placeholder="" :style="{ width: '100%' }" clearable disabled />
        </n-form-item>
        <n-form-item label="积分编号:">
          <n-input placeholder="" :value="orderPayDetail?.points.pointsId" disabled></n-input>
        </n-form-item>
        <n-form-item label="积分名称:">
          <n-input placeholder="" :value="orderPayDetail?.points.pointsName" disabled></n-input>
        </n-form-item>
        <n-form-item label="积分token:">
          <n-input placeholder="" :value="orderPayDetail?.points.token" disabled></n-input>
        </n-form-item>
        <n-form-item label="积分数量:">
          <n-input placeholder="" :value="String(orderPayDetail?.points.pointsNum)" disabled></n-input>
        </n-form-item>
      </n-card>

      <n-card title="积分抵扣信息" v-if="orderPayDetail?.coupon">
        <n-form-item label="积分类型:">
          <n-select :value="orderPayDetail.coupon.pointsType" :options="pointsTypeList" placeholder="" :style="{ width: '100%' }" clearable disabled />
        </n-form-item>
        <n-form-item label="积分编号:">
          <n-input placeholder="" :value="orderPayDetail?.coupon.pointsId" disabled></n-input>
        </n-form-item>
        <n-form-item label="积分名称:">
          <n-input placeholder="" :value="orderPayDetail?.coupon.pointsName" disabled></n-input>
        </n-form-item>
        <n-form-item label="积分token:">
          <n-input placeholder="" :value="orderPayDetail?.coupon.token" disabled></n-input>
        </n-form-item>
        <n-form-item label="积分数量:">
          <n-input placeholder="" :value="String(orderPayDetail?.coupon.pointsNum)" disabled></n-input>
        </n-form-item>
      </n-card>

      <n-card title="优惠券信息" v-if="orderPayDetail?.deduction">
        <n-form-item label="积分类型:">
          <n-select :value="orderPayDetail.deduction.pointsType" :options="pointsTypeList" placeholder="" :style="{ width: '100%' }" clearable disabled />
        </n-form-item>
        <n-form-item label="积分编号:">
          <n-input placeholder="" :value="orderPayDetail?.deduction.pointsId" disabled></n-input>
        </n-form-item>
        <n-form-item label="积分名称:">
          <n-input placeholder="" :value="orderPayDetail?.deduction.pointsName" disabled></n-input>
        </n-form-item>
        <n-form-item label="积分token:">
          <n-input placeholder="" :value="orderPayDetail?.deduction.token" disabled></n-input>
        </n-form-item>
        <n-form-item label="积分数量:">
          <n-input placeholder="" :value="String(orderPayDetail?.deduction.pointsNum)" disabled></n-input>
        </n-form-item>
      </n-card>
    </n-form>
  </div>
</template>

<style scoped lang="less">
.orderPayDetail {
}
</style>
