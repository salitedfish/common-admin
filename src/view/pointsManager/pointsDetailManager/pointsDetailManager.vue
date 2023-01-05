<template>
  <n-card>
    <n-form label-placement="left" label-width="120px" label-align="left">
      <!-- <n-form-item label="积分封面:">
        <common-upload type="img" :max="1" v-model="fileList" :disabled="disabled"></common-upload>
      </n-form-item> -->
      <n-form-item label="积分名称:" required>
        <n-input v-model:value="params.pointsName" placeholder="请输入积分名称" :disabled="disabled"></n-input>
      </n-form-item>
      <n-form-item label="积分总量:" required>
        <n-input-number v-model:value="params.pointsTotal" style="width: 100%" :min="1" placeholder="请输入积分总量" :disabled="disabled" :loading="submiting"></n-input-number>
      </n-form-item>
    </n-form>
  </n-card>
  <n-button type="primary" block style="margin-top: 15px" @click="submitHandler">确认提交</n-button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { commonNotify } from "@/util";
export default defineComponent({
  name: "addPoints",
});
</script>

<script lang="ts" setup>
// 框架
import { reactive, ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
// 组件库
// 自定义组件
// import commonUpload from "@/component/common/commonUpload.vue";
// 工具库
import { useFileNameFromURL } from "@ultra-man/noa";
// 自定义工具
// 网络请求
import { addPoints as addPointsRequest, editPoints as editPointsRequest, getPointsInfo as getPointsInfoRequest } from "@/request/points";
// store
import { useCommonStore } from "@/store/commonStore";
import { useRouteStore } from "@/store/routeStore";
// 类型
import type { FileUpload } from "@/type/Common";
import type { AddPointsParams } from "@/type/Points";

const router = useRouter();
const route = useRoute();
const commonStore = useCommonStore();
const routeStore = useRouteStore();

const isEdit = computed(() => {
  return route.query.id && route.query.id.length > 0;
});

const initPoints = async (id: string) => {
  commonStore.pageLoading = true;
  const res = await getPointsInfoRequest({ pointsId: id });
  if (res && res.data) {
    const { pointsCover, pointsName, pointsTotal } = res.data;
    fileList.value.push({
      fileUrl: pointsCover,
      hashName: useFileNameFromURL(pointsCover)(true),
    });
    params.pointsName = pointsName;
    params.pointsTotal = Number(pointsTotal);
  }
  commonStore.pageLoading = false;
};

onMounted(() => {
  if (isEdit.value) {
    initPoints(route.query.id as string);
  }
});

const fileList = ref<FileUpload[]>([]);

const params = reactive<AddPointsParams>({
  pointsCover: "",
  pointsId: "",
  pointsName: "",
  pointsTotal: null,
});

const disabled = computed(() => {
  return submiting.value;
});
const submiting = ref(false);

const submitHandler = () => {
  // if (fileList.value.length >= 1) {
  // params.pointsCover = fileList.value[0].hashName;
  if (isEdit.value) {
    doEdit();
  } else {
    doSubmit();
  }
  // } else {
  //   commonNotify("warning", "请上传积分封面");
  // }
};

const doEdit = async () => {
  submiting.value = true;
  params.pointsId = route.query.id as string;
  const res = await editPointsRequest(params);
  if (res) {
    commonNotify("success", "积分编辑成功");
    routeStore.deleteCurrentRoute();
    router.push({
      name: "pointsListManager",
    });
  }
  submiting.value = false;
};

const doSubmit = async () => {
  submiting.value = true;
  const res = await addPointsRequest(params);
  if (res) {
    commonNotify("success", "积分新增成功");
    routeStore.deleteCurrentRoute();
    router.push({
      name: "pointsListManager",
    });
  }
  submiting.value = false;
};
</script>

<style scoped lang="less"></style>
