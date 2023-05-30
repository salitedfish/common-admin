<script lang="ts">
// 框架
import { defineComponent, reactive, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
// 组件库
// 自定义组件
import commonUpload from "@/component/common/commonUpload.vue";
// 工具库
// 自定义工具
import { commonNotify } from "@/util/common";
// 网络请求
import { addParallelCoin, updateParallelCoin } from "@/request/points";
// store
import { useRouteStore } from "@/store/routeStore";
import { giftTypeList, coinTypeList } from "./parallelCoinDetailStore";
import { auditTypes } from "../parallelCoinManager/parallelCoinManagerStore";
// 类型
import type { ParallelCoinDetail } from "@/type/Points";
import { DetailCheckType, type FileUpload } from "@/type/Common";
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
const isEdit = DetailCheckType.EDIT === route.query.detailType;

const parallelCoinDetail = reactive<ParallelCoinDetail>({});
const parallelCoinIconList = ref<FileUpload[]>([]);

const submit = async () => {
  submiting.value = true;
  if (parallelCoinIconList.value.length) {
    parallelCoinDetail.icon = parallelCoinIconList.value[0].fileUrl;
  }
  const request = isEdit ? updateParallelCoin : addParallelCoin;
  const res = await request(parallelCoinDetail);
  if (res) {
    commonNotify("success", "成功！");
    router.push({
      name: "parallelCoinManager",
    });
    routeStore.deleteCurrentRoute();
  }
  submiting.value = false;
};

const init = () => {
  const routeQuery = route.query as {
    type: string;
    token: string;
    address: string;
    privateKey: string;
    id: string;
    label: string;
    giftType: string;
    detailType: string;
    icon: string;
    auditType: string;
  };
  parallelCoinDetail.token = routeQuery.token;
  parallelCoinDetail.address = routeQuery.address;
  parallelCoinDetail.privateKey = routeQuery.privateKey;
  parallelCoinDetail.id = Number(routeQuery.id);
  parallelCoinDetail.giftType = Number(routeQuery.giftType);
  parallelCoinDetail.type = Number(routeQuery.type);
  parallelCoinDetail.label = routeQuery.label;
  parallelCoinDetail.icon = routeQuery.icon;
  parallelCoinDetail.auditType = Number(routeQuery.auditType);
  parallelCoinIconList.value = routeQuery.icon
    ? [
        {
          fileUrl: routeQuery.icon,
          hashName: "",
        },
      ]
    : [];
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
        <n-input placeholder="请输入代币名称" v-model:value="parallelCoinDetail.token"></n-input>
      </n-form-item>

      <n-form-item label="类型:" required>
        <n-select v-model:value="parallelCoinDetail.type" :options="coinTypeList" placeholder="请选择类型" :style="{ width: '100%' }" clearable />
      </n-form-item>
      <n-form-item label="发行地址:" required>
        <n-input placeholder="请输入发行地址" v-model:value="parallelCoinDetail.address"></n-input>
      </n-form-item>
      <n-form-item label="发行私钥:" required>
        <n-input placeholder="请输入发行私钥" v-model:value="parallelCoinDetail.privateKey"></n-input>
      </n-form-item>

      <n-form-item label="是否可以转赠:" required>
        <n-select v-model:value="parallelCoinDetail.giftType" :options="giftTypeList" placeholder="请选择是否可以转赠" :style="{ width: '100%' }" clearable />
      </n-form-item>

      <n-form-item label="提币是否需要审核:" required>
        <n-select v-model:value="parallelCoinDetail.auditType" :options="auditTypes" placeholder="请选择" :style="{ width: '100%' }" clearable />
      </n-form-item>

      <n-form-item label="备注:" required>
        <n-input placeholder="请输入备注，最多32个字" v-model:value="parallelCoinDetail.label" :maxlength="32"></n-input>
      </n-form-item>

      <n-form-item label="代币图标:" required>
        <common-upload type="img" v-model="parallelCoinIconList" :max="1"></common-upload>
      </n-form-item>
    </n-card>
  </n-form>
  <n-button style="margin-top: 15px" block type="primary" @click="submit" :loading="submiting" :disabled="submiting">确认提交</n-button>
</template>

<style scoped lang="less"></style>
