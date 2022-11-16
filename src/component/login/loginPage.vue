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
            <n-input class="form-input" placeholder="账号"></n-input>
            <n-input class="form-input" type="password" show-password-on="mousedown" placeholder="密码" :maxlength="8"></n-input>
          </section>
          <n-button class="login-btn" type="primary" block @click="handleLogin">登录</n-button>
          <div class="settle">申请入驻</div>
        </section>
      </n-card>
    </section>
  </login-layout>
</template>

<script lang="ts" setup>
import loginLayout from "./loginLayout.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const handleLogin = () => {
  router.push({
    name: "goodsListManager",
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
      }
      .login-btn {
        height: 45px;
      }
      .settle {
        margin-top: 10px;
      }
    }
  }
}
</style>
