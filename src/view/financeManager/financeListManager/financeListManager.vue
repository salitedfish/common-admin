<template>
  <n-card class="">
    <div class="card-space">
      <n-card title="微信实时金额">
        <n-grid x-gap="12" :cols="2">
          <n-gi>
            <n-statistic label="可用余额">
              {{ wechatBalance.availableAmount }}
              <div class="value-tip">* 提现请关注：微信支付商家助手</div>
            </n-statistic>
          </n-gi>
          <n-gi>
            <n-statistic label="不可用余额">
              {{ wechatBalance.pendingAmount }}
              <div class="value-tip">* 分账完结后可解冻</div>
            </n-statistic>
          </n-gi>
        </n-grid>
      </n-card>
      <n-card title="待处理">
        <n-grid x-gap="12" :cols="2">
          <n-gi>
            <n-statistic label="待审核商品数"> {{ waitFinance.countGoodsAuditWait }} </n-statistic>
          </n-gi>
          <n-gi>
            <n-statistic label="待发货订单数"> {{ waitFinance.countExpressWait }} </n-statistic>
          </n-gi>
        </n-grid>
      </n-card>
    </div>
    <div class="card-space">
      <n-card title="昨日数据">
        <n-grid x-gap="12" :cols="3">
          <n-gi>
            <n-statistic label="新增商品数"> {{ financeYesterday.countGoods }}</n-statistic>
          </n-gi>
          <n-gi>
            <n-statistic label="新增提货订单数"> {{ financeYesterday.countExpress }} </n-statistic>
          </n-gi>
        </n-grid>
        <n-grid x-gap="12" :cols="3">
          <n-gi>
            <n-statistic label="一级订单数"> {{ financeYesterday.primaryCountOrder }}</n-statistic>
          </n-gi>
          <n-gi>
            <n-statistic label="一级销售额"> {{ financeYesterday.primarySumOrderAmount }} </n-statistic>
          </n-gi>
          <n-gi>
            <n-statistic label="一级销量"> {{ financeYesterday.primarySumOrderNum }}</n-statistic>
          </n-gi>
        </n-grid>
        <n-grid x-gap="12" :cols="3">
          <n-gi>
            <n-statistic label="二级订单数"> {{ financeYesterday.secondaryCountOrder }} </n-statistic>
          </n-gi>
          <n-gi>
            <n-statistic label="二级销售额"> {{ financeYesterday.secondarySumOrderAmount }} </n-statistic>
          </n-gi>
          <n-gi>
            <n-statistic label="二级销量"> {{ financeYesterday.secondarySumOrderNum }}</n-statistic>
          </n-gi>
        </n-grid>
      </n-card>
      <n-card title="今日数据">
        <n-grid x-gap="12" :cols="3">
          <n-gi>
            <n-statistic label="新增商品数"> {{ financeToday.countGoods }} </n-statistic>
          </n-gi>
          <n-gi>
            <n-statistic label="新增提货订单数"> {{ financeToday.countExpress }} </n-statistic>
          </n-gi>
        </n-grid>
        <n-grid x-gap="12" :cols="3">
          <n-gi>
            <n-statistic label="一级订单数"> {{ financeToday.primaryCountOrder }} </n-statistic>
          </n-gi>
          <n-gi>
            <n-statistic label="一级销售额"> {{ financeToday.primarySumOrderAmount }} </n-statistic>
          </n-gi>
          <n-gi>
            <n-statistic label="一级销量"> {{ financeToday.primarySumOrderNum }} </n-statistic>
          </n-gi>
        </n-grid>
        <n-grid x-gap="12" :cols="3">
          <n-gi>
            <n-statistic label="二级订单数">{{ financeToday.secondaryCountOrder }} </n-statistic>
          </n-gi>
          <n-gi>
            <n-statistic label="二级销售额"> {{ financeToday.secondarySumOrderAmount }} </n-statistic>
          </n-gi>
          <n-gi>
            <n-statistic label="二级销量"> {{ financeToday.secondarySumOrderNum }} </n-statistic>
          </n-gi>
        </n-grid>
      </n-card>
    </div>
  </n-card>
</template>

<script lang="ts" setup>
//框架
import { ref } from "vue";
//store
import { useCommonStore } from "@/store/commonStore";
//api
import { getFinanceToday, getFinanceYesterday, getWechatBalance, getWaitFinance } from "@/request/finance";

// 使用store
const commonStore = useCommonStore();

// 页面数据
const wechatBalance = ref({
  availableAmount: 0,
  pendingAmount: 0,
});
const waitFinance = ref({
  countExpressWait: 0,
  countGoodsAuditWait: 0,
});
const financeYesterday = ref({
  countExpress: 0,
  countGoods: 0,
  primaryCountOrder: 0,
  primarySumOrderAmount: 0,
  primarySumOrderNum: 0,
  secondaryCountOrder: 0,
  secondarySumOrderAmount: 0,
  secondarySumOrderNum: 0,
});
const financeToday = ref({
  countExpress: 0,
  countGoods: 0,
  primaryCountOrder: 0,
  primarySumOrderAmount: 0,
  primarySumOrderNum: 0,
  secondaryCountOrder: 0,
  secondarySumOrderAmount: 0,
  secondarySumOrderNum: 0,
});
const initData = async () => {
  commonStore.pageLoading = true;

  const wechatBalanceRes = await getWechatBalance();
  if (wechatBalanceRes) {
    wechatBalance.value = wechatBalanceRes.data;
  }

  const waitFinanceRes = await getWaitFinance();
  if (waitFinanceRes) {
    waitFinance.value = waitFinanceRes.data;
  }

  const financeYesterdayRes = await getFinanceYesterday();
  if (financeYesterdayRes) {
    financeYesterday.value = financeYesterdayRes.data;
  }

  const financeTodayRes = await getFinanceToday();
  if (financeTodayRes) {
    financeToday.value = financeTodayRes.data;
  }

  commonStore.pageLoading = false;
};

initData();
</script>

<style scoped lang="less">
.card-space {
  display: flex;
  justify-content: space-around;
}
.card-space + .card-space {
  margin-top: 10px;
}
.n-card + .n-card {
  margin-left: 10px;
}
.value-text {
  color: var(--primary-color);
}
.value-tip {
  font-size: 12px;
}
</style>
