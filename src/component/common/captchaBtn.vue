<template>
  <n-button class="captcha-btn" type="primary" @click="getCaptchaHandler" :loading="captchaGetState" :disabled="captchaDisabled"
    >{{ text }}<span v-show="captchaDisabled"> {{ captchaCountdown }} s</span></n-button
  >
</template>

<script lang="ts" setup>
// 框架
import { ref } from "vue";
// 组件库
// 自定义组件
// 工具库
import { usePhoneLegal } from "@ultra-man/noa";
// 自定义工具
import { commonNotify, useTencentCaptcha } from "@/util";
// 网络请求
import { getCaptcha as getCaptchaRequest } from "@/request";

type TencentCaptchaCallbackParam = {
  ret: number;
  ticket: string;
  CaptchaAppId: string;
  randstr: string;
  errorCode: number;
  errorMessage: string;
};

const props = withDefaults(
  defineProps<{
    countDown: number;
    phone: number | string;
    text?: string;
  }>(),
  {
    text: "获取验证码",
  }
);

// 使用腾讯验证器
const tencentCaptcha = useTencentCaptcha(async (res: TencentCaptchaCallbackParam) => {
  if (res.ret === 0) {
    captchaGetState.value = true;
    captchaDisabled.value = true;
    const captchaInterval = setInterval(() => {
      captchaCountdown.value--;
      if (captchaCountdown.value <= 0) {
        clearInterval(captchaInterval);
        captchaDisabled.value = false;
        captchaCountdown.value = props.countDown;
      }
    }, 1000);
    const getRes = await getCaptchaRequest({
      phone: String(props.phone),
      randstr: res.randstr,
      ticket: res.ticket,
    });
    if (getRes && getRes.code === 0) {
      commonNotify("success", "验证码发送成功！");
    }
    captchaGetState.value = false;
  }
});

// 验证码发送状态
const captchaGetState = ref(false);
const captchaDisabled = ref(false);
const captchaCountdown = ref(props.countDown);
// 获取验证码
const getCaptchaHandler = async () => {
  if (!usePhoneLegal(props.phone)()) {
    commonNotify("warning", "手机号格式不正确！");
    return;
  }
  tencentCaptcha.show();
};
</script>

<style scoped lang="less">
.captcha-btn {
  width: 160px;
}
</style>
