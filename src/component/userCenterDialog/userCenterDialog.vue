<template>
  <n-modal :show="showUserCenterModal" @update:show="(state: boolean) => emit('update:showUserCenterModal', state)">
    <n-card style="width: 600px; max-height: 700px" content-style="height: 1px" title="用户中心" :bordered="false" size="huge" role="dialog" aria-modal="true">
      <n-scrollbar>
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

          <n-card style="margin-bottom: 15px" v-if="!authStore.isAdmin">
            <n-form-item label="店铺描述" path="storeDescription">
              <n-input
                type="textarea"
                class="form-input"
                placeholder="请输入店铺描述，最多2048个字，用于向用户展示"
                v-model:value="formData.merchantDescription"
                :disabled="infoUpdateing"
                :maxlength="21"
              ></n-input>
            </n-form-item>
            <n-form-item label="店铺地址" path="storeAddress">
              <n-input class="form-input" placeholder="请输入店铺地址，用于向用户展示" v-model:value="formData.merchantAddress" :disabled="infoUpdateing"></n-input>
            </n-form-item>
            <n-form-item label="店铺联系方式" path="storeContact">
              <n-input class="form-input" placeholder="请输入店铺联系方式，用于向用户展示" v-model:value="formData.merchantContact" :disabled="infoUpdateing"></n-input>
            </n-form-item>
            <n-form-item label="店铺证照" path="storeLicense" v-if="authStore.userInfo?.merchantType !== OrganizationTypes.MICRO">
              <common-upload type="img" v-model="formData.merchantLicense" :max="1" :disabled="infoUpdateing"></common-upload>
            </n-form-item>
            <n-button type="primary" @click="submitUpdateInfo" block style="margin: 5px 0" :loading="infoUpdateing" :disabled="infoUpdateing">确认更新信息</n-button>
          </n-card>
        </n-form>
      </n-scrollbar>
    </n-card>
  </n-modal>

  <input ref="inputDom" type="file" accept="image/png, image/jpeg" hidden @change="handleChange" />
</template>

<script lang="ts">
// 框架
import { defineComponent, ref, reactive } from "vue";
// 组件库
// 自定义组件
import commonUpload from "../common/commonUpload.vue";
// 工具库
import { useBinaryToURL, useFileNameFromURL } from "@ultra-man/noa";
// 自定义工具
import { commonNotify } from "@/util/common";
import { getUserInfo } from "@/util/auth";
// 网络请求
import { uploadProfilePicture } from "@/request/common";
import { updateUserInfer } from "@/request/auth";
// store
import { useCommonStore } from "@/store/commonStore";
import { useAuthStore } from "@/store/authStore";
// 类型
import { OrganizationTypes } from "@/type/Auth";
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

const commonStore = useCommonStore();
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

// 修改商户信息
const userInfo = authStore.userInfo;
const initLiscense = userInfo?.merchantLicense
  ? [
      {
        fileUrl: userInfo?.merchantLicense,
        hashName: useFileNameFromURL(userInfo?.merchantLicense)(true),
      },
    ]
  : [];
const formData = reactive({
  merchantAddress: userInfo?.merchantAddress,
  merchantContact: userInfo?.merchantContact,
  merchantDescription: userInfo?.merchantDescription,
  merchantLicense: initLiscense,
});
const infoUpdateing = ref(false);
const submitUpdateInfo = async () => {
  infoUpdateing.value = true;
  const res = await updateUserInfer({
    merchantAddress: formData.merchantAddress,
    merchantContact: formData.merchantContact,
    merchantDescription: formData.merchantDescription,
    merchantLicense: formData.merchantLicense.length <= 0 ? "" : formData.merchantLicense[0].hashName,
  });
  if (res) {
    await getUserInfo();
    commonNotify("success", "店铺信息修改成功");
  }
  infoUpdateing.value = false;
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
