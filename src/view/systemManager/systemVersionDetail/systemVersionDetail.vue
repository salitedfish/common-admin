<template>
  <n-form label-placement="left" label-width="120px" label-align="left" :disabled="submiting">
    <n-card>
      <n-form-item label="版本号：" required>
        <n-input-number :min="0" v-model:value="params.versionCode" style="width: 100%" placeholder="请输入版本号"></n-input-number>
      </n-form-item>
      <n-form-item label="版本名称：" required>
        <n-input v-model:value="params.versionName" placeholder="请输入版本名称"></n-input>
      </n-form-item>
      <n-form-item label="选择渠道：" required>
        <app-channel-select
          v-model="params.channel"
          :searching="submiting"
          width="100%"
          :createable="true"
          placeholder="请选择版本渠道，如果使用新渠道可手动输入"
        ></app-channel-select>
      </n-form-item>
      <n-form-item label="更新内容：" required>
        <n-input type="textarea" v-model:value="params.description" placeholder="请输入更新内容"></n-input>
      </n-form-item>
      <n-form-item label="是否强制更新：" required>
        <n-radio-group v-model:value="params.forceUpdate">
          <n-space>
            <n-radio v-for="(item, key) in forceUpdateList" :key="key" :value="item.value" :label="item.label">
              {{ item.label }}
            </n-radio>
          </n-space>
        </n-radio-group>
      </n-form-item>
      <n-form-item label="软件包：">
        <common-upload v-model="fileList" :max="1" type="file" @update:model-value="handleDownloadUrlChange" style="margin-right: 10px" :disabled="submiting"></common-upload>
      </n-form-item>
      <n-form-item label="下载地址：" required>
        <n-input v-model:value="params.downloadUrl" placeholder="请输入下载地址" :disabled="submiting"></n-input>
      </n-form-item>
    </n-card>
  </n-form>

  <n-button type="primary" @click="submitHandler" block style="margin-top: 15px" :loading="submiting" :disabled="submiting">确认提交</n-button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { commonNotify } from "@/util";
export default defineComponent({
  name: "addSystemVersion",
});
</script>
<script lang="ts" setup>
// 框架
import { reactive, ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
// 组件库
// 自定义组件
import commonUpload from "@/component/common/commonUpload.vue";
import appChannelSelect from "@/component/common/appChannelSelect.vue";
// 工具库
// 自定义工具
// 网络请求
import { addSystemVersion, editSystemVersion, getSystemVersionDetail } from "@/request/system";
// store
import { useCommonStore } from "@/store/commonStore";
import { useRouteStore } from "@/store/routeStore";
import { forceUpdateList } from "../systemVersionManager/systemVersionManagerStore";
// 类型
import type { AddSystemVersionParams } from "@/type/System";
import type { FileUpload } from "@/type/Common";

const route = useRoute();
const router = useRouter();
const routeStore = useRouteStore();
const commonStore = useCommonStore();
const isEdit = computed(() => {
  return route.name === "editSystemVersion";
});
const id = computed(() => {
  return route.query.id;
});

const fileList = ref<FileUpload[]>([]);
const handleDownloadUrlChange = (payload: FileUpload[]) => {
  if (payload[0]) params.downloadUrl = payload[0].fileUrl;
};
const params = reactive<AddSystemVersionParams>({
  channel: undefined,
  description: "",
  downloadUrl: "",
  forceUpdate: false,
  versionCode: null,
  versionName: "",
});

const submiting = ref(false);
const submitHandler = async () => {
  submiting.value = true;
  if (isEdit.value) {
    params.id = Number(id.value);
  }
  const res = isEdit.value ? await editSystemVersion(params) : await addSystemVersion(params);
  if (res) {
    commonNotify("success", "版本提交成功");
    router.push({
      name: "systemVersionManager",
    });
    routeStore.deleteCurrentRoute();
  }
  submiting.value = false;
};

const initData = async () => {
  commonStore.pageLoading = true;
  const res = await getSystemVersionDetail({ id: Number(id.value) });
  if (res) {
    const { channel, description, downloadUrl, forceUpdate, versionCode, versionName } = res.data;
    params.channel = channel;
    params.description = description;
    params.downloadUrl = downloadUrl;
    params.forceUpdate = forceUpdate;
    params.versionCode = versionCode;
    params.versionName = versionName;
  }
  commonStore.pageLoading = false;
};

onMounted(() => {
  if (isEdit.value) {
    initData();
  }
});
</script>

<style scoped lang="less"></style>
