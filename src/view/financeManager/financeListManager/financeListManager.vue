<template>
  <n-card class="">
    <div class="card-space">
      <n-card title="微信实时金额">
        <n-grid x-gap="12" :cols="2">
          <n-gi>
            <n-statistic label="可用余额">
              {{ numberHandler(wechatBalance.availableAmount) }}
              <div class="value-tip">* 提现请关注：微信支付商家助手</div>
            </n-statistic>
          </n-gi>
          <n-gi>
            <n-statistic label="不可用余额">
              {{ numberHandler(wechatBalance.pendingAmount) }}
              <div class="value-tip">* 分账完结后可解冻</div>
            </n-statistic>
          </n-gi>
        </n-grid>
      </n-card>
      <n-card title="待处理">
        <n-grid x-gap="12" :cols="2">
          <n-gi>
            <n-statistic label="待审核商品数"> {{ numberHandler(waitFinance.countGoodsAuditWait) }} </n-statistic>
          </n-gi>
          <n-gi>
            <n-statistic label="待发货订单数"> {{ numberHandler(waitFinance.countExpressWait) }} </n-statistic>
          </n-gi>
        </n-grid>
      </n-card>
    </div>
    <div class="card-space">
      <n-card title="昨日数据">
        <n-grid x-gap="12" :cols="3">
          <n-gi>
            <n-statistic label="新增商品数"> {{ numberHandler(financeYesterday.countGoods) }}</n-statistic>
          </n-gi>
          <n-gi>
            <n-statistic label="新增提货订单数"> {{ numberHandler(financeYesterday.countExpress) }} </n-statistic>
          </n-gi>
        </n-grid>
        <n-grid x-gap="12" :cols="3">
          <n-gi>
            <n-statistic label="一级订单数"> {{ numberHandler(financeYesterday.primaryCountOrder) }}</n-statistic>
          </n-gi>
          <n-gi>
            <n-statistic label="一级销售额"> {{ numberHandler(financeYesterday.primarySumOrderAmount) }} </n-statistic>
          </n-gi>
          <n-gi>
            <n-statistic label="一级销量"> {{ numberHandler(financeYesterday.primarySumOrderNum) }}</n-statistic>
          </n-gi>
        </n-grid>
        <n-grid x-gap="12" :cols="3">
          <n-gi>
            <n-statistic label="二级订单数"> {{ numberHandler(financeYesterday.secondaryCountOrder) }} </n-statistic>
          </n-gi>
          <n-gi>
            <n-statistic label="二级销售额"> {{ numberHandler(financeYesterday.secondarySumOrderAmount) }} </n-statistic>
          </n-gi>
          <n-gi>
            <n-statistic label="二级销量"> {{ numberHandler(financeYesterday.secondarySumOrderNum) }}</n-statistic>
          </n-gi>
        </n-grid>
      </n-card>
      <n-card title="今日数据">
        <n-grid x-gap="12" :cols="3">
          <n-gi>
            <n-statistic label="新增商品数"> {{ numberHandler(financeToday.countGoods) }} </n-statistic>
          </n-gi>
          <n-gi>
            <n-statistic label="新增提货订单数"> {{ numberHandler(financeToday.countExpress) }} </n-statistic>
          </n-gi>
        </n-grid>
        <n-grid x-gap="12" :cols="3">
          <n-gi>
            <n-statistic label="一级订单数"> {{ numberHandler(financeToday.primaryCountOrder) }} </n-statistic>
          </n-gi>
          <n-gi>
            <n-statistic label="一级销售额"> {{ numberHandler(financeToday.primarySumOrderAmount) }} </n-statistic>
          </n-gi>
          <n-gi>
            <n-statistic label="一级销量"> {{ numberHandler(financeToday.primarySumOrderNum) }} </n-statistic>
          </n-gi>
        </n-grid>
        <n-grid x-gap="12" :cols="3">
          <n-gi>
            <n-statistic label="二级订单数">{{ numberHandler(financeToday.secondaryCountOrder) }} </n-statistic>
          </n-gi>
          <n-gi>
            <n-statistic label="二级销售额"> {{ numberHandler(financeToday.secondarySumOrderAmount) }} </n-statistic>
          </n-gi>
          <n-gi>
            <n-statistic label="二级销量"> {{ numberHandler(financeToday.secondarySumOrderNum) }} </n-statistic>
          </n-gi>
        </n-grid>
      </n-card>
    </div>
  </n-card>
</template>

<script lang="ts" setup>
//框架
import { ref, computed } from "vue";
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

// 在页面还未加载完前数字先用“-”代替
const numberHandler = (num: number) => {
  const showNum = computed(() => {
    return commonStore.pageLoading ? "-" : num;
  });
  return showNum.value;
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
