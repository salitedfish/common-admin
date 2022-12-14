<template>
  <n-card>
    <n-form label-placement="left" label-width="120px" label-align="left" :disabled="submiting">
      <n-form-item label="空投名称:">
        <n-input v-model:value="formData.title" placeholder="请输入Banner标题"></n-input>
      </n-form-item>

      <n-form-item label="封面:">
        <commonUpload v-model="fileList" type="img" :max="1" :disabled="submiting"></commonUpload>
      </n-form-item>

      <n-form-item label="排序:">
        <n-input-number :options="bannerTargetTypeList" v-model:value="formData.order" style="width: 100%" placeholder="请输入排序值，排序值越大越靠前" :min="0"></n-input-number>
      </n-form-item>

      <n-form-item label="指向类型:">
        <n-select :options="bannerTargetTypeList" v-model:value="formData.type" placeholder="请选择指向类型"></n-select>
      </n-form-item>

      <n-form-item label="目标地址:" v-if="BannerTargetType.URL === formData.type">
        <n-input v-model:value="formData.target" placeholder="请输入Banner对应的地址"></n-input>
      </n-form-item>
      <n-form-item label="商品编号:" v-if="BannerTargetType.GOODS === formData.type">
        <n-input v-model:value="formData.target" placeholder="请输入商品编号"></n-input>
      </n-form-item>
      <n-form-item label="积分编号:" v-if="BannerTargetType.POINTS === formData.type">
        <n-input v-model:value="formData.target" placeholder="请输入积分编号"></n-input>
      </n-form-item>

      <n-form-item label="有效开始时间">
        <n-date-picker
          placeholder="请选择有效开始时间"
          v-model:formatted-value="formData.startTime"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetime"
          style="width: 100%"
          clearable
          :disabled="submiting"
        />
      </n-form-item>

      <n-form-item label="有效结束时间">
        <n-date-picker
          placeholder="请选择有效结束时间"
          v-model:formatted-value="formData.endTime"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetime"
          style="width: 100%"
          clearable
          :disabled="submiting"
        />
      </n-form-item>
    </n-form>
  </n-card>
  <n-button style="margin-top: 15px" block type="primary" @click="handleSubmit" :loading="submiting" :disabled="submiting">确认提交</n-button>
</template>

<script lang="ts">
// 框架
import { defineComponent, reactive, ref, computed, onBeforeMount, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
// 组件库
import { useFileNameFromURL } from "@ultra-man/noa";
// 自定义组件
import commonUpload from "@/component/common/commonUpload.vue";
// 工具库
// 自定义工具
// 网络请求
import { addEditBanner, getBanner } from "@/request/operator";
// store
import { useCommonStore } from "@/store/commonStore";
import { bannerTargetTypeList, BannerTargetType } from "../bannerManager/bannerManagerStore";
import { useRouteStore } from "@/store/routeStore";
// 类型
import type { FileUpload } from "@/type/Common";
import type { AddBannerParams } from "@/type/Operator";
import { commonNotify } from "@/util";
// 组件名
export default defineComponent({
  name: "addBanner",
});
</script>

<script lang="ts" setup>
// 数据
const route = useRoute();
const router = useRouter();
const routeStore = useRouteStore();
const commonStore = useCommonStore();
const isEdit = computed(() => {
  return route.name === "editBanner";
});
const id = computed(() => {
  return Number(route.query.id);
});

const fileList = ref<FileUpload[]>([]);
const formData = reactive<AddBannerParams>({
  cover: undefined,
  endTime: undefined,
  id: undefined,
  order: undefined,
  startTime: undefined,
  target: undefined,
  title: undefined,
  type: undefined,
});

const submiting = ref(false);
const handleSubmit = async () => {
  submiting.value = true;
  if (fileList.value.length < 0) {
    commonNotify("warning", "请上传封面");
    return;
  }
  formData.cover = fileList.value[0].hashName;
  if (isEdit.value) {
    formData.id = id.value;
  }
  const res = await addEditBanner(formData);
  if (res) {
    commonNotify("success", "提交成功");
    routeStore.deleteCurrentRoute();
    router.push({
      name: "bannerManager",
    });
  }
  submiting.value = false;
};

const initData = async () => {
  commonStore.pageLoading = true;
  const res = await getBanner({ id: id.value });
  if (res) {
    const { cover, title, endTime, startTime, type, order, target } = res.data;
    fileList.value = [
      {
        hashName: useFileNameFromURL(cover)(true),
        fileUrl: cover,
      },
    ];
    formData.title = title;
    formData.endTime = endTime;
    formData.startTime = startTime;
    formData.type = type;
    formData.order = order;
    formData.target = target;
  }
  commonStore.pageLoading = false;
};

watch(
  () => formData.type,
  () => {
    formData.target = undefined;
  }
);

onBeforeMount(() => {
  if (isEdit.value) {
    initData();
  }
});
</script>

<style scoped lang="less"></style>
