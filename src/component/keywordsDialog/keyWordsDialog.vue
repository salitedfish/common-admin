<template>
  <n-modal :show="showKeywordsModal" @update:show="(state: boolean) => emit('update:showKeywordsModal', state)">
    <n-card style="width: 600px" title="修改密码" :bordered="false" size="huge" role="dialog" aria-modal="true">
      <n-form label-placement="left" label-width="120px" label-align="left">
        <n-card style="margin-bottom: 15px">
          <n-form-item label="原密码:">
            <n-input v-model:value="passwordInfo.oldPassword" type="password" show-password-on="mousedown" placeholder="请输入原密码" :maxlength="16"></n-input>
          </n-form-item>
          <n-form-item label="新密码:">
            <n-input v-model:value="passwordInfo.newPassword" type="password" show-password-on="mousedown" placeholder="请输入新密码" :maxlength="16"></n-input>
          </n-form-item>
          <n-form-item label="确认新密码:">
            <n-input v-model:value="passwordInfo.comfirmNewPassword" type="password" show-password-on="mousedown" placeholder="请再次输入新密码" :maxlength="16"></n-input>
          </n-form-item>
          <n-button type="primary" @click="submitPasswordHandler" block style="margin: 5px 0" :loading="passwordSubmiting" :disabled="passwordSubmiting">确认修改密码</n-button>
        </n-card>
      </n-form>
    </n-card>
  </n-modal>
</template>

<script lang="ts">
// 框架
import { defineComponent, ref, reactive } from "vue";
// 组件库
// 自定义组件
// 工具库
// 自定义工具
import { commonNotify } from "@/util/common";
// 网络请求
import { updatePassword } from "@/request/common";
// store
// 类型
// 组件名
export default defineComponent({
  name: "userCenterDialog",
});
</script>

<script lang="ts" setup>
defineProps<{
  showKeywordsModal: boolean;
}>();
const emit = defineEmits<{
  (event: "update:showKeywordsModal", value: boolean): void;
}>();

// 修改密码
const passwordInfo = reactive({
  oldPassword: "",
  newPassword: "",
  comfirmNewPassword: "",
});
const passwordSubmiting = ref(false);
const submitPasswordHandler = async () => {
  if (passwordInfo.newPassword !== passwordInfo.comfirmNewPassword) {
    commonNotify("warning", "两次新密码输入的不一致");
    return;
  }
  passwordSubmiting.value = true;
  const res = await updatePassword({ oldPassword: passwordInfo.oldPassword, newPassword: passwordInfo.newPassword });
  if (res) {
    commonNotify("success", "密码修改成功");
  }
  passwordSubmiting.value = false;
};
</script>

<style scoped lang="less"></style>
