<template>
  <n-form label-placement="left" label-width="120px" label-align="left">
    <n-card title="发票信息：" style="margin-bottom: 15px">
      <n-form-item label="发票照片:">
        <common-upload type="img" v-model="fileList" :max="1"></common-upload>
      </n-form-item>
    </n-card>
  </n-form>
  <n-button type="primary" @click="submitHandler" block style="margin-top: 15px" :loading="submiting" :disabled="submiting">确认提交</n-button>
</template>

<script lang="ts">
// 框架
import { defineComponent, ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
// 组件库
// 自定义组件
import commonUpload from "@/component/common/commonUpload.vue";
// 工具库
// 自定义工具
import { commonNotify } from "@/util/common";
// 网络请求
import { addInvoice } from "@/request/order";
// store
import { useRouteStore } from "@/store/routeStore";
// 类型
import type { FileUpload } from "@/type/Common";
// 组件名
export default defineComponent({
  name: "addInvoice",
});
</script>

<script lang="ts" setup>
const router = useRouter();
const route = useRoute();
const routeStore = useRouteStore();
const fileList = ref<FileUpload[]>([]);
const submiting = ref(false);

const orderId = computed(() => {
  return (route.query.id as string) || "";
});

const submitHandler = async () => {
  submiting.value = true;
  if (fileList.value.length < 1) {
    commonNotify("warning", "请上传发票");

    return;
  }
  const electronicImage = fileList.value[0].hashName;
  const res = await addInvoice({ orderId: orderId.value, electronicImage });
  if (res) {
    commonNotify("success", "提交成功");
    routeStore.deleteCurrentRoute();
    router.push({
      name: "invoiceListManager",
    });
  }
  submiting.value = false;
};
</script>

<style scoped lang="less"></style>
