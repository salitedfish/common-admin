<template>
  <login-layout>
    <section class="login-content">
      <section class="login-show"></section>
      <n-card content-style="display: flex; flex-direction: column; justify-content: space-around;">
        <section class="action-head">
          <div>欢迎来到</div>
          <div>{{ title }}!</div>
        </section>

        <section class="action-form">
          <section class="form">
            <n-input class="form-input" placeholder="账号" v-model:value="formData.phone" :disabled="loginDisabled"></n-input>
            <n-input
              class="form-input"
              type="password"
              show-password-on="mousedown"
              placeholder="密码"
              :maxlength="16"
              v-model:value="formData.password"
              v-show="loginType === LoginType.PASSWORD"
              :disabled="loginDisabled"
            ></n-input>
            <div class="captcha-box" v-show="loginType === LoginType.CAPTCHA && phoneLegal">
              <n-input class="form-input" placeholder="验证码" :maxlength="8" v-model:value="formData.captcha" :disabled="loginDisabled"></n-input>
              <captcha-btn :phone="formData.phone" :countDown="60" :getCaptchaRequest="getLoginCaptcha"></captcha-btn>
            </div>
          </section>
          <n-button class="login-btn" @click="switchLoginTypeHandler" block :disabled="loginDisabled">{{ loginTypeMap[loginType].switchText }}</n-button>
          <n-button class="login-btn" type="primary" block @click="loginHandler" :loading="loginState" :disabled="loginDisabled">登录</n-button>
          <div class="settle" @click="settleHandler">申请入驻</div>
        </section>
      </n-card>
    </section>
  </login-layout>
  <section class="recordNo">{{ recordNo }}</section>
</template>

<script lang="ts" setup>
import { reactive, ref, computed } from "vue";
import { useRouter } from "vue-router";
// 组件
import loginLayout from "../common/centerLayout.vue";
import captchaBtn from "@/component/common/captchaBtn.vue";
// 请求
import type * as RequestParam from "@/request/type/RequestParam";
import { getLoginCaptcha } from "@/request/auth";
// 工具
import { usePhoneLegal } from "@ultra-man/noa";
import { passwordLegal, commonNotify, useLogin, getUserInfo } from "@/util";
import { useRouteStore } from "@/store/routeStore";

// 初始化路由
const router = useRouter();

const routeStore = useRouteStore();

// 备案号
const recordNo = import.meta.env.VITE_RecordNo;
const title = import.meta.env.VITE_APP_NAME;

// 登录表单数据
const formData = reactive({
  phone: "",
  password: "",
  captcha: "",
});
const phoneLegal = computed(() => {
  return usePhoneLegal(formData.phone)();
});

// 密码登录还是验证码登录
enum LoginType {
  PASSWORD = 0,
  CAPTCHA,
}
const loginTypeMap = {
  [LoginType.PASSWORD]: {
    text: "密码",
    switchText: "切换验证码登录",
  },
  [LoginType.CAPTCHA]: {
    text: "验证码",
    switchText: "切换密码登录",
  },
};
const loginType = ref(LoginType.PASSWORD);
const switchLoginTypeHandler = () => {
  loginType.value = loginType.value === LoginType.CAPTCHA ? LoginType.PASSWORD : LoginType.CAPTCHA;
};

// 使用登录hook
const { loginState, loginDisabled, login } = useLogin();
// 登录
const loginHandler = async () => {
  const params: RequestParam.Login = {
    phone: formData.phone,
  };

  if (loginType.value === LoginType.PASSWORD) {
    if (!formData.phone) {
      commonNotify("warning", "账号不能为空!");
      return;
    }
    if (!formData.password) {
      commonNotify("warning", "密码不能为空!");
      return;
    }
    if (!passwordLegal(formData.password)) {
      commonNotify("warning", "密码为6~16位数字、字母大小写！");
      return;
    }
    params.password = formData.password;
  }
  if (loginType.value === LoginType.CAPTCHA) {
    if (!phoneLegal.value) {
      commonNotify("warning", "手机号格式不正确！");
      return;
    }
    if (!formData.captcha) {
      commonNotify("warning", "验证码不能为空!");
      return;
    }
    params.captcha = formData.captcha;
  }
  const res = await login(params);
  if (res) {
    // 登录完获取一次用户信息，如果信息没问题才登录成功
    const ret = await getUserInfo();
    if (ret) {
      routeStore.resetHistoryRoutes();
      commonNotify("success", "登录成功！");
      router.push({
        name: "goodsListManager",
      });
    }
  }
};

// 入驻
const settleHandler = () => {
  router.push({
    name: "settle",
  });
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
.recordNo {
  position: fixed;
  bottom: 10px;
  left: 50%;
  transform: translate(-50%);
  color: black;
}
</style>
