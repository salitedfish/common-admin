<template>
  <n-form label-placement="left" label-width="120px" label-align="left" :disabled="submiting">
    <n-card>
      <n-form-item label="关键词：">
        <n-input v-model:value="params.keyword" placeholder="请输入关键词"></n-input>
      </n-form-item>
      <n-form-item label="排序号：">
        <n-input-number :min="0" v-model:value="params.order" style="width: 100%" placeholder="请输入排序号"></n-input-number>
      </n-form-item>
    </n-card>
  </n-form>

  <n-button type="primary" @click="submitHandler" block style="margin-top: 15px" :loading="submiting" :disabled="submiting">确认提交</n-button>
</template>

<script lang="ts">
// 框架
import { defineComponent, reactive, ref } from "vue";
import { useRouter } from "vue-router";
// 组件库
// 自定义组件
// 工具库
// 自定义工具
import { commonNotify } from "@/util/common";
// 网络请求
import { addEditSearchKeywords } from "@/request/operator";
// store
import { useRouteStore } from "@/store/routeStore";
// 类型
// 组件名
export default defineComponent({
  name: "addSearchKeywords",
});
</script>

<script lang="ts" setup>
const router = useRouter();
const routeStore = useRouteStore();
const params = reactive({
  keyword: "",
  order: null,
});

const submiting = ref(false);
const submitHandler = async () => {
  submiting.value = true;
  const res = await addEditSearchKeywords(params);
  if (res) {
    routeStore.deleteCurrentRoute();
    commonNotify("success", "提交成功");
    router.push({
      name: "searchManager",
    });
  }
  submiting.value = false;
};
</script>

<style scoped lang="less"></style>
