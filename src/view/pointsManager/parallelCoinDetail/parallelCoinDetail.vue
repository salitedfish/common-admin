<script lang="ts">
// 框架
import { defineComponent, reactive, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
// 组件库
// 自定义组件
// 工具库
// 自定义工具
import { commonNotify } from "@/util/common";
// 网络请求
import { addParallelCoin, updateParallelCoin } from "@/request/points";
// store
import { useRouteStore } from "@/store/routeStore";
// 类型
import type { ParallelCoinDetail } from "@/type/Points";
import { DetailCheckType } from "@/type/Common";
// 组件名
export default defineComponent({
  name: "parallelCoinDetail",
});
</script>

<script lang="ts" setup>
const route = useRoute();
const router = useRouter();
const routeStore = useRouteStore();
const submiting = ref(false);
const isEdit = DetailCheckType.EDIT === route.query.type;

const parallelCoinDetail = reactive<ParallelCoinDetail>({});

const submit = async () => {
  submiting.value = true;
  const request = isEdit ? updateParallelCoin : addParallelCoin;
  const res = await request(parallelCoinDetail);
  if (res) {
    commonNotify("success", "成功！");
    router.push({
      name: "parallelCoinManager",
    });
    routeStore.deleteCurrentRoute();
  }
};

const init = () => {
  const routeQuery = route.query as { type: string; coin: string; address: string; privateKey: string };
  parallelCoinDetail.coin = routeQuery.coin;
  parallelCoinDetail.address = routeQuery.address;
  parallelCoinDetail.privateKey = routeQuery.privateKey;
};

onMounted(() => {
  if (isEdit) {
    init();
  }
});
</script>

<template>
  <n-form label-placement="left" label-width="130px" label-align="left" :disabled="submiting">
    <n-card title="基本信息：" style="margin-bottom: 15px">
      <n-form-item label="代币名称:" required>
        <n-input placeholder="请输入代币名称" v-model:value="parallelCoinDetail.coin"></n-input>
      </n-form-item>
      <n-form-item label="发行地址:" required>
        <n-input placeholder="请输入发行地址" v-model:value="parallelCoinDetail.address"></n-input>
      </n-form-item>
      <n-form-item label="发行私钥:" required>
        <n-input placeholder="请输入发行私钥" v-model:value="parallelCoinDetail.privateKey"></n-input>
      </n-form-item>
    </n-card>
  </n-form>
  <n-button style="margin-top: 15px" block type="primary" @click="submit" :loading="submiting" :disabled="submiting">确认提交</n-button>
</template>

<style scoped lang="less"></style>
