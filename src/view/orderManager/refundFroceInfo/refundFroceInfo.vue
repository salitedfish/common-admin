<script lang="ts">
// 框架
import { defineComponent, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useDialog } from "naive-ui";
// 组件
// 工具
import { commonNotify } from "@/util/common";
// 接口
import { getRefundFroceInfo, orderRefundFroceComfirm } from "@/request/order";
// 数据
import { useCommonStore } from "@/store/commonStore";
import { useAuthStore } from "@/store/authStore";
import { payChannelList, PayChannel, PointsTypeList, rewardTypeList } from "./refundFroceInfoStore";
// 类型
import type { RefundFroceInfo } from "@/type/Order";
import { pointsTypeList } from "../orderPayDetail/orderPayDetailStore";
export default defineComponent({
  name: "refundFroceInfo",
});
</script>

<script lang="ts" setup>
const dialog = useDialog();
const route = useRoute();
const id = route.query.id as string;
const applyAbled = route.query.disabled === "false";

const inputWidth = "100%";

const commonStore = useCommonStore();
const authStore = useAuthStore();

const refundFroceInfo = ref<RefundFroceInfo | null>(null);

// 强制退款
const refundFroce = (orderId: string) => {
  if (!id || !refundFroceInfo.value) return;
  const { payChannel, wechat } = refundFroceInfo.value.refundPay;
  if (payChannel === PayChannel.WEI_XIN && Number(wechat?.orderRefundAmount) <= 0) {
    commonNotify("warning", "已经超过微信自动退款期限，需要手动退款");
    return;
  }

  const dialogInfo = dialog.warning({
    title: "退款",
    content: "是否确认退款",
    positiveText: "确认",
    onPositiveClick: async () => {
      dialogInfo.loading = true;
      const res = await orderRefundFroceComfirm({ orderId });
      if (res) {
        commonNotify("success", "退款成功");
      }
      dialogInfo.loading = false;
    },
  });
};

const init = async () => {
  commonStore.pageLoading = true;
  const res = await getRefundFroceInfo({ orderId: id });
  if (res) {
    refundFroceInfo.value = res.data;
    commonStore.pageLoading = false;
  }
};
onMounted(() => {
  init();
});
</script>

<template>
  <n-form label-placement="left" label-width="80px" label-align="left" v-if="refundFroceInfo">
    <n-card title="支付信息：" style="margin-bottom: 15px">
      <n-form-item label="支付渠道:">
        <n-select v-model:value="refundFroceInfo.refundPay.payChannel" :options="payChannelList" :style="{ width: inputWidth }" clearable disabled />
      </n-form-item>

      <n-card title="渠道信息：" style="margin-bottom: 15px" v-if="refundFroceInfo.refundPay.payChannel === PayChannel.WEI_XIN && refundFroceInfo.refundPay.wechat">
        <n-space>
          <n-form-item label="支付金额:">
            <n-input v-model:value="refundFroceInfo.refundPay.wechat.orderPayAmount" disabled><template #suffix> 元 </template></n-input>
          </n-form-item>
          <n-form-item label="退款金额:">
            <n-input v-model:value="refundFroceInfo.refundPay.wechat.orderRefundAmount" disabled><template #suffix> 元 </template></n-input>
          </n-form-item>
        </n-space>
        <template #footer v-if="Number(refundFroceInfo.refundPay.wechat.orderRefundAmount) <= 0">
          <span class="tip">* 已经超过微信自动退款期限，需要手动退款</span>
        </template>
      </n-card>

      <n-card title="渠道信息：" style="margin-bottom: 15px" v-if="refundFroceInfo.refundPay.payChannel === PayChannel.POINTS && refundFroceInfo.refundPay.points">
        <n-space>
          <n-form-item label="积分编号:">
            <n-input v-model:value="refundFroceInfo.refundPay.points.pointsId" disabled></n-input>
          </n-form-item>
          <n-form-item label="积分名称:">
            <n-input v-model:value="refundFroceInfo.refundPay.points.pointsName" disabled></n-input>
          </n-form-item>
          <n-form-item label="积分数量:">
            <n-input v-model:value="refundFroceInfo.refundPay.points.pointsNum" disabled></n-input>
          </n-form-item>
          <n-form-item label="积分类型:">
            <n-select v-model:value="refundFroceInfo.refundPay.points.pointsType" :options="pointsTypeList" :style="{ width: inputWidth }" clearable disabled />
          </n-form-item>
        </n-space>
      </n-card>

      <n-card title="优惠券：" style="margin-bottom: 15px" v-if="refundFroceInfo.refundPay.coupon">
        <n-space>
          <n-form-item label="积分编号:">
            <n-input v-model:value="refundFroceInfo.refundPay.coupon.pointsId" disabled></n-input>
          </n-form-item>
          <n-form-item label="积分名称:">
            <n-input v-model:value="refundFroceInfo.refundPay.coupon.pointsName" disabled></n-input>
          </n-form-item>
          <n-form-item label="积分数量:">
            <n-input v-model:value="refundFroceInfo.refundPay.coupon.pointsNum" disabled></n-input>
          </n-form-item>
          <n-form-item label="积分类型:">
            <n-select v-model:value="refundFroceInfo.refundPay.coupon.pointsType" :options="pointsTypeList" :style="{ width: inputWidth }" clearable disabled />
          </n-form-item>
        </n-space>
      </n-card>

      <n-card title="积分抵扣：" style="margin-bottom: 15px" v-if="refundFroceInfo.refundPay.deduction">
        <n-space>
          <n-form-item label="积分编号:">
            <n-input v-model:value="refundFroceInfo.refundPay.deduction.pointsId" disabled></n-input>
          </n-form-item>
          <n-form-item label="积分名称:">
            <n-input v-model:value="refundFroceInfo.refundPay.deduction.pointsName" disabled></n-input>
          </n-form-item>
          <n-form-item label="积分数量:">
            <n-input v-model:value="refundFroceInfo.refundPay.deduction.pointsNum" disabled></n-input>
          </n-form-item>
          <n-form-item label="积分类型:">
            <n-select v-model:value="refundFroceInfo.refundPay.deduction.pointsType" :options="pointsTypeList" :style="{ width: inputWidth }" clearable disabled />
          </n-form-item>
        </n-space>
      </n-card>
    </n-card>

    <n-card title="token明细：" style="margin-bottom: 15px">
      <n-card v-for="(item, key) in refundFroceInfo.refundTokens" :key="key" :title="`token: ${item.token}`">
        <n-space>
          <n-form-item label="需要数量:"> <n-input v-model:value="item.needNum" disabled></n-input> </n-form-item>
          <n-form-item label="持有数量:">
            <n-input v-model:value="item.holdNum" disabled>
              <template #suffix v-if="Number(item.holdNum) < Number(item.needNum)">
                <span style="color: red">数量不足</span>
              </template>
            </n-input>
          </n-form-item>
        </n-space>

        <n-card title="活动信息" style="margin-bottom: 15px" v-if="refundFroceInfo.refundPromoTokens[key].length > 0">
          <n-card v-for="(i, k) in refundFroceInfo.refundPromoTokens[key]" :key="k" :title="`活动名称：${i.name}`">
            <n-space>
              <n-form-item label="奖励编号:"> <n-input v-model:value="i.rewardId" disabled></n-input> </n-form-item>
              <n-form-item label="奖励名称:"> <n-input v-model:value="i.rewardName" disabled></n-input> </n-form-item>
              <n-form-item label="奖励类型:">
                <n-select v-model:value="i.rewardType" :options="rewardTypeList" :style="{ width: inputWidth }" clearable disabled />
              </n-form-item>
              <n-form-item label="需要数量:"> <n-input v-model:value="i.needNum" disabled></n-input> </n-form-item>
            </n-space>
          </n-card>
        </n-card>

        <n-card title="空投信息" style="margin-bottom: 15px" v-if="refundFroceInfo.refundAirdropTokens[key].length > 0">
          <n-card v-for="(i, k) in refundFroceInfo.refundAirdropTokens[key]" :key="k" :title="`空投名称：${i.name}`">
            <n-space>
              <n-form-item label="奖励编号:"> <n-input v-model:value="i.rewardId" disabled></n-input> </n-form-item>
              <n-form-item label="奖励名称:"> <n-input v-model:value="i.rewardName" disabled></n-input> </n-form-item>
              <n-form-item label="奖励类型:">
                <n-select v-model:value="i.rewardType" :options="rewardTypeList" :style="{ width: inputWidth }" clearable disabled />
              </n-form-item>
              <n-form-item label="需要数量:"> <n-input v-model:value="i.needNum" disabled></n-input> </n-form-item>
            </n-space>
          </n-card>
        </n-card>
      </n-card>
    </n-card>

    <n-card title="订单活动信息：" style="margin-bottom: 15px" v-if="refundFroceInfo.refundPromoOrders.length > 0">
      <n-card v-for="(i, k) in refundFroceInfo.refundPromoOrders" :key="k" :title="`活动名称：${i.name}`">
        <n-space>
          <n-form-item label="奖励编号:"> <n-input v-model:value="i.rewardId" disabled></n-input> </n-form-item>
          <n-form-item label="奖励名称:"> <n-input v-model:value="i.rewardName" disabled></n-input> </n-form-item>
          <n-form-item label="奖励类型:">
            <n-select v-model:value="i.rewardType" :options="rewardTypeList" :style="{ width: inputWidth }" clearable disabled />
          </n-form-item>
          <n-form-item label="需要数量:"> <n-input v-model:value="i.needNum" disabled></n-input> </n-form-item>
        </n-space>
      </n-card>
    </n-card>

    <n-card title="订单空投信息：" style="margin-bottom: 15px" v-if="refundFroceInfo.refundAirdropOrders.length > 0">
      <n-card v-for="(i, k) in refundFroceInfo.refundAirdropOrders" :key="k" :title="`空投名称：${i.name}`">
        <n-space>
          <n-form-item label="奖励编号:"> <n-input v-model:value="i.rewardId" disabled></n-input> </n-form-item>
          <n-form-item label="奖励名称:"> <n-input v-model:value="i.rewardName" disabled></n-input> </n-form-item>
          <n-form-item label="奖励类型:">
            <n-select v-model:value="i.rewardType" :options="rewardTypeList" :style="{ width: inputWidth }" clearable disabled />
          </n-form-item>
          <n-form-item label="需要数量:"> <n-input v-model:value="i.needNum" disabled></n-input> </n-form-item>
        </n-space>
      </n-card>
    </n-card>

    <n-card title="总计:" v-if="refundFroceInfo.totalTokens.length > 0">
      <n-card v-for="(i, k) in refundFroceInfo.totalTokens" :key="k">
        <n-space>
          <n-form-item label="奖励编号:"> <n-input v-model:value="i.rewardId" disabled></n-input> </n-form-item>
          <n-form-item label="奖励名称:"> <n-input v-model:value="i.rewardName" disabled></n-input> </n-form-item>
          <n-form-item label="奖励类型:">
            <n-select v-model:value="i.rewardType" :options="rewardTypeList" :style="{ width: inputWidth }" clearable disabled />
          </n-form-item>

          <n-form-item label="需要数量:"> <n-input v-model:value="i.needNum" disabled></n-input> </n-form-item>
          <n-form-item label="持有数量:">
            <n-input v-model:value="i.holdNum" disabled>
              <template #suffix v-if="Number(i.holdNum) < Number(i.needNum)">
                <span style="color: red">数量不足</span>
              </template>
            </n-input>
          </n-form-item>
          <n-form-item v-if="!i.enable" label="可否处理:"> <n-input value="无法处理" disabled class="enable"></n-input> </n-form-item>
        </n-space>
      </n-card>
    </n-card>
  </n-form>
  <n-button type="warning" block style="margin-top: 15px" @click="refundFroce(id)" v-if="refundFroceInfo && !authStore.isAdmin && applyAbled">确认退款</n-button>
</template>

<style lang="less">
.tip {
  color: var(--font-color-danger);
}
.enable {
  .n-input__input-el {
    color: var(--font-color-danger) !important;
  }
}
</style>
