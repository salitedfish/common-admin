<template>
  <div class="apply-state" :class="activeClass">{{ applyStateInfo[applyResult.state].stateText }}</div>
  <div class="apply-result-account" v-if="[ApplyState.NEED_APPOINT_ACCOUNT].includes(applyResult.state)">
    <div class="account-item">
      <div class="label">付款户名:</div>
      <div class="content">{{ applyResult.result.account_name || "-" }}</div>
    </div>
    <div class="account-item">
      <div class="label">付款卡号:</div>
      <div class="content">{{ applyResult.result.account_no || "-" }}</div>
    </div>
    <div class="account-item">
      <div class="label">汇款金额:</div>
      <div class="content">{{ applyResult.result.pay_amount || "-" }}</div>
    </div>
    <div class="account-item">
      <div class="label">收款户名:</div>
      <div class="content">{{ applyResult.result.destination_account_name || "-" }}</div>
    </div>
    <div class="account-item">
      <div class="label">付款卡号:</div>
      <div class="content">{{ applyResult.result.destination_account_number || "-" }}</div>
    </div>
    <div class="account-item">
      <div class="label">开户银行:</div>
      <div class="content">{{ applyResult.result.destination_account_bank || "-" }}</div>
    </div>
    <div class="account-item">
      <div class="label">省市信息:</div>
      <div class="content">{{ applyResult.result.city || "-" }}</div>
    </div>
    <div class="account-item">
      <div class="label">备注信息:</div>
      <div class="content">{{ applyResult.result.remark || "-" }}</div>
    </div>
    <div class="account-item">
      <div class="label">汇款截止时间:</div>
      <div class="content">{{ applyResult.result.deadline || "-" }}</div>
    </div>
  </div>
  <div class="apply-result-img" v-if="[ApplyState.NEED_VERTIFY_LINK, ApplyState.NEED_WC_CAPTCHA].includes(applyResult.state)">
    <img :src="applyResult.result" alt="" />
  </div>
  <!-- <div class="apply-result-link" v-if="[ApplyState.NEED_VERTIFY_LINK].includes(applyResult.state)">
    <a :href="applyResult.result">{{ applyResult.result }}</a>
  </div> -->
  <div class="apply-result-message" v-if="[ApplyState.REJECTED, ApplyState.FROZEN].includes(applyResult.state)">
    <div v-for="(item, key) in applyResult.result" :key="key">
      {{ item.reject_reason }}
    </div>
  </div>
  <n-button @click="preStepHandler" class="re-apply" block type="primary" v-if="[ApplyState.REJECTED, ApplyState.NEED_APPOINT_ACCOUNT].includes(applyResult.state)"
    >重新填写信息</n-button
  >
  <n-button class="success-btn" v-if="applyResult.state === ApplyState.SCUCESS" type="primary" @click="goManagerHandler">跳转管理页面</n-button>
</template>

<script lang="ts" setup>
// 框架
import { onBeforeMount, reactive, computed } from "vue";
// 组件库
import { useLoadingBar } from "naive-ui";
// 自定义组件
// 工具库
// 自定义工具
// 网络请求
import { getMerchantApplyResult as getMerchantApplyResultRequest } from "@/request/auth";
import router from "@/router";

const loadingBar = useLoadingBar();

const emit = defineEmits<{
  (name: "preStep"): void;
}>();

enum ApplyState {
  CHECKING = 0,
  NEED_APPOINT_ACCOUNT,
  NEED_VERTIFY_LINK,
  EXAMING,
  REJECTED,
  NEED_WC_CAPTCHA,
  SCUCESS,
  FROZEN,
  CANCELED,
  INIT,
}

const applyStateInfo = reactive([
  {
    stateText: "校验中...",
  },
  {
    stateText: "需要使用指定账户汇款",
  },
  {
    stateText: "使用微信扫码法人验证链接",
  },
  {
    stateText: "审核中...",
  },
  {
    stateText: "已驳回",
  },
  {
    stateText: "需要使用微信扫码",
  },
  {
    stateText: "申请成功",
  },
  {
    stateText: "已冻结",
  },
  {
    stateText: "已作废",
  },
  {
    stateText: "信息获取中...",
  },
]);
const applyResult = reactive<{
  state: ApplyState;
  result?: any;
}>({
  state: ApplyState.INIT,
});

const activeClass = computed(() => {
  const successState = [ApplyState.NEED_VERTIFY_LINK, ApplyState.NEED_WC_CAPTCHA, ApplyState.SCUCESS];
  const failState = [ApplyState.NEED_APPOINT_ACCOUNT, ApplyState.REJECTED, ApplyState.FROZEN];
  if (successState.includes(applyResult.state)) {
    return "apply-state-success";
  } else if (failState.includes(applyResult.state)) {
    return "apply-state-fail";
  } else {
    return "apply-state-loading";
  }
});

onBeforeMount(async () => {
  loadingBar.start();
  const res = await getMerchantApplyResultRequest();
  if (res && res.code === 0) {
    applyResult.state = res.data.state;
    applyResult.result = res.data.result;
  }
  loadingBar.finish();
});

const preStepHandler = () => {
  emit("preStep");
};

const goManagerHandler = () => {
  router.push({ name: "manager" });
};
</script>

<style scoped lang="less">
.apply-state {
  text-align: center;
  line-height: 60px;
  font-size: 30px;
}
.apply-state-success {
  color: var(--font-color-success);
}
.apply-state-fail {
  color: var(--font-color-fail);
}
.apply-result-account {
  width: 50%;
  margin: 0 auto;
  .account-item {
    display: flex;
    .label {
      width: 120px;
    }
    .content {
      flex: 1;
    }
  }
}
.apply-result-img {
  img {
    display: block;
    width: 40%;
    margin: 0 auto;
  }
}
.apply-result-link {
  text-align: center;
}
.apply-result-message {
  text-align: center;
}
.re-apply {
  width: 180px;
  margin: 20px auto 0;
}
.success-btn {
  display: block;
  margin: 0 auto;
}
</style>
