<template>
  <section class="form">
    <div>
      <n-form ref="formDom" :model="formData" :rules="formDataRules">
        <n-form-item label="手机号" path="phone">
          <n-input class="form-input" placeholder="请输入手机号" v-model:value="formData.phone" :disabled="registerState"></n-input>
        </n-form-item>
        <n-form-item label="密码" path="password">
          <n-input
            class="form-input"
            type="password"
            show-password-on="mousedown"
            placeholder="请输入密码"
            :maxlength="8"
            v-model:value="formData.password"
            :disabled="registerState"
          ></n-input>
        </n-form-item>
        <n-form-item label="验证码" path="captcha">
          <div class="captcha-box">
            <n-input class="form-input" placeholder="请输入验证码" :maxlength="8" v-model:value="formData.captcha" :disabled="registerState"></n-input>
            <captcha-btn :phone="formData.phone" :countDown="60" :getCaptchaRequest="getRegisterCaptcha"></captcha-btn>
          </div>
        </n-form-item>
      </n-form>
      <section class="btn-box">
        <n-button @click="cancelRegisterHandler" :disabled="registerState">取消注册</n-button>
        <n-button type="primary" @click="submitRegisterHandler" :loading="registerState" :disabled="registerState">提交注册</n-button>
      </section>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { usePhoneLegal, useSetLStorage } from "@ultra-man/noa";
import { useLoadingBar } from "naive-ui";
import type { FormRules, FormItemRule, FormInst } from "naive-ui";
import captchaBtn from "@/component/common/captchaBtn.vue";
// 自定义工具
import { passwordLegal, commonNotify, getUserInfo } from "@/util";
// 网络请求
import { getRegisterCaptcha } from "@/request/auth";
import { register as registerRequest } from "@/request";

const emit = defineEmits<{
  (event: "updateStep"): void;
}>();

const router = useRouter();
const loadingBar = useLoadingBar();

// 表单数据
const formDom = ref<FormInst | null>(null);
const formData = reactive({
  phone: "",
  password: "",
  captcha: "",
});
// 表单规则
const formDataRules: FormRules = {
  phone: [
    {
      required: true,
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error("请填写手机号！");
        } else if (!usePhoneLegal(value)()) {
          return new Error("手机号格式不正确！");
        }
        return true;
      },
      trigger: ["blur"],
    },
  ],
  password: [
    {
      required: true,
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error("请填写密码！");
        } else if (!passwordLegal(value)) {
          return new Error("密码为6~16位数字、字母大小写！");
        }
        return true;
      },
      trigger: ["blur"],
    },
  ],
  captcha: [
    {
      required: true,
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error("请填写验证码！");
        }
        return true;
      },
      trigger: ["blur"],
    },
  ],
};

// 注册状态
const registerState = ref(false);

// 取消注册
const cancelRegisterHandler = () => {
  router.go(-1);
};
// 提交注册
const submitRegisterHandler = (e: MouseEvent) => {
  e.preventDefault();
  formDom.value?.validate((errors) => {
    if (!errors) {
      registerHandler();
    } else {
      commonNotify("warning", "请将表单填写正确！");
    }
  });
};
// 注册
const registerHandler = async () => {
  registerState.value = true;
  loadingBar.start();
  const res = await registerRequest(formData);
  if (res && res.code === 0) {
    await getUserInfo();
    commonNotify("success", "注册成功！");
    useSetLStorage("token")(res.data.authentication);
    emit("updateStep");
  }
  registerState.value = false;
  loadingBar.finish();
};
</script>

<style scoped lang="less">
.form {
  // height: 100%;
  margin-top: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  .form-input {
    margin-bottom: 10px;
    text-align: left;
  }
  .captcha-box {
    display: flex;
  }
  .btn-box {
    display: flex;
    justify-content: space-between;
  }
}
</style>
