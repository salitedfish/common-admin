<template>
  <login-layout>
    <section class="login-content">
      <section class="login-show"></section>
      <n-card content-style="display: flex; flex-direction: column; justify-content: space-around;">
        <section class="action-head">
          <div>欢迎来到</div>
          <div>上链购管理平台!</div>
        </section>

        <section class="action-form">
          <section class="form">
            <n-input class="form-input" placeholder="账号" v-model:value="formData.phone"></n-input>
            <n-input
              class="form-input"
              type="password"
              show-password-on="mousedown"
              placeholder="密码"
              :maxlength="8"
              v-model:value="formData.password"
              v-show="loginType === LoginType.PASSWORD"
            ></n-input>
            <div class="captcha-box" v-show="loginType === LoginType.CAPTCHA">
              <n-input class="form-input" placeholder="验证码" :maxlength="8" v-model:value="formData.captcha"></n-input>
              <n-button type="primary" @click="getCaptchaHandler" :loading="captchaGetState" :disabled="captchaDisabled">获取验证码</n-button>
            </div>
          </section>
          <n-button class="login-btn" @click="switchLoginTypeHandler" block>切换登录方式</n-button>
          <n-button class="login-btn" type="primary" block @click="loginHandler" :loading="loginState" :disabled="loginDisabled">登录</n-button>
          <div class="settle">申请入驻</div>
        </section>
      </n-card>
    </section>
  </login-layout>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
// 组件
import loginLayout from "./loginLayout.vue";
// 请求
import { getCaptcha as getCaptchaRequest, login as loginRequest } from "@/request";
import type * as RequestParam from "@/request/type/RequestParam";
// 工具
import { usePhoneLegal } from "@ultra-man/noa";
import { passwordLegal, commonNotify } from "@/util";

// 初始化路由
const router = useRouter();

// 密码登录还是验证码登录
enum LoginType {
  PASSWORD = 0,
  CAPTCHA,
}
const loginType = ref(LoginType.PASSWORD);
const switchLoginTypeHandler = () => {
  loginType.value = loginType.value === LoginType.CAPTCHA ? LoginType.PASSWORD : LoginType.CAPTCHA;
};

// 登录表单数据
const formData = reactive({
  phone: "",
  password: "",
  captcha: "",
});

// 验证码发送状态
const captchaGetState = ref(false);
const captchaDisabled = ref(false);
// 获取验证码
const getCaptchaHandler = async () => {
  const phoneNum = Number(formData.phone);
  if (!usePhoneLegal(phoneNum)()) {
    commonNotify("warning", "手机号格式不正确！");
    return;
  }
  captchaGetState.value = true;
  captchaDisabled.value = true;
  const res = await getCaptchaRequest(phoneNum);
  if (res && res.code === 0) {
    commonNotify("success", "验证码发送成功！");
  }
  captchaGetState.value = false;
  captchaDisabled.value = false;
};

// 登录状态
const loginState = ref(false);
const loginDisabled = ref(false);
// 登录
const loginHandler = async () => {
  const params: RequestParam.Login = {
    phone: formData.phone,
  };
  const phoneNum = Number(formData.phone);
  if (!usePhoneLegal(phoneNum)()) {
    commonNotify("warning", "手机号格式不正确！");
    return;
  }
  if (loginType.value === LoginType.PASSWORD) {
    if (!formData.password) {
      commonNotify("warning", "密码不能为空!");
      return;
    }
    if (!passwordLegal(formData.password)) {
      commonNotify("warning", "密码格式不正确！");
      return;
    }
    params.password = formData.password;
  }
  if (loginType.value === LoginType.CAPTCHA) {
    if (!formData.captcha) {
      commonNotify("warning", "验证码不能为空!");
      return;
    }
    params.captcha = formData.captcha;
  }
  loginState.value = true;
  loginDisabled.value = true;
  const res = await loginRequest(params);
  if (res && res.code === 0) {
    commonNotify("success", "登录成功！");
    router.push({
      name: "goodsListManager",
    });
  }
  loginState.value = false;
  loginDisabled.value = false;
};
</script>

<style scoped lang="less">
.login-content {
  width: 70%;
  height: 70%;
  display: flex;
  min-width: 1080px;
  .login-show {
    width: 64%;
    background-image: url("@/assets/img/login/login-content-bg.png");
    background-size: 100% 100%;
  }
  .n-card {
    height: 100%;
    flex: 1;
    .action-head {
      font-size: 30px;
      font-weight: 600;
    }
    .action-form {
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
      .form {
        .form-input {
          margin-bottom: 10px;
          text-align: left;
        }
        .captcha-box {
          display: flex;
        }
      }
      .login-btn {
        margin-top: 10px;
        height: 45px;
      }
      .settle {
        margin-top: 10px;
        cursor: pointer;
      }
    }
  }
}
</style>
