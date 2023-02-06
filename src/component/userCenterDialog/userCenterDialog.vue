<template>
  <n-modal :show="showUserCenterModal" @update:show="(state: boolean) => emit('update:showUserCenterModal', state)">
    <n-card style="width: 600px" title="用户中心" :bordered="false" size="huge" role="dialog" aria-modal="true">
      <n-form label-placement="left" label-width="120px" label-align="left">
        <n-card style="margin-bottom: 15px">
          <n-form-item label="上传头像:">
            <div class="profile-picture-box">
              <img :src="profileInfo.url || authStore.userInfo?.headUrl" alt="" />
              <div class="select-box" @click="initChange">选择头像</div>
            </div>
          </n-form-item>
          <n-button type="primary" @click="submitImgHandler" block style="margin: 5px 0" :loading="imgSubmiting" :disabled="imgSubmiting">确认修改头像</n-button>
        </n-card>

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

  <input ref="inputDom" type="file" accept="image/png, image/jpeg" hidden @change="handleChange" />
</template>

<script lang="ts">
// 框架
import { defineComponent, ref, reactive } from "vue";
// 组件库
// 自定义组件
// 工具库
import { useBinaryToURL } from "@ultra-man/noa";
// 自定义工具
import { commonNotify } from "@/util/common";
import { getUserInfo } from "@/util/auth";
// 网络请求
import { updatePassword, uploadProfilePicture } from "@/request/common";
// store
import { useAuthStore } from "@/store/authStore";
// 类型
// 组件名
export default defineComponent({
  name: "userCenterDialog",
});
</script>

<script lang="ts" setup>
defineProps<{
  showUserCenterModal: boolean;
}>();
const emit = defineEmits<{
  (event: "update:showUserCenterModal", value: boolean): void;
}>();

const authStore = useAuthStore();

// 修改头像
const inputDom = ref<HTMLInputElement | null>(null);
const imgSubmiting = ref(false);
const profileInfo = reactive({
  url: "",
  img: null as null | File,
});
const initChange = () => {
  if (inputDom.value) {
    inputDom.value?.click();
  }
};
const handleChange = async (event: any) => {
  const file = event.target?.files[0];
  if (file) {
    profileInfo.url = useBinaryToURL(file) as string;
    profileInfo.img = file;
  }
};
const submitImgHandler = async () => {
  if (profileInfo.img) {
    imgSubmiting.value = true;
    const res = await uploadProfilePicture(profileInfo.img);
    if (res) {
      await getUserInfo();
      commonNotify("success", "头像修改成功");
    }
    imgSubmiting.value = false;
  }
};

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

<style scoped lang="less">
.profile-picture-box {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  img {
    display: block;
    max-width: 100%;
    max-height: 100%;
  }
  .select-box {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: none;
  }
  &:hover {
    .select-box {
      cursor: pointer;
      background-color: var(--background-color);
      opacity: 0.6;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
