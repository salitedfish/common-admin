<template>
  <n-space>
    <n-input v-model:value="params.uid" autosize placeholder="请输入用户编号" style="width: 200px" :disabled="searching" clearable></n-input>
    <n-input v-model:value="params.chainAddress" autosize placeholder="请输入用户地址" style="width: 200px" :disabled="searching" clearable></n-input>
    <n-select :options="userTypeList" v-model:value="params.userType" placeholder="请选择用户类型" clearable :disabled="searching" style="width: 200px"></n-select>
    <n-input v-model:value="params.goodsId" autosize placeholder="请输入商品编号" style="width: 200px" :disabled="searching" clearable></n-input>
    <n-input v-model:value="params.token" autosize placeholder="请输入商品token" style="width: 200px" :disabled="searching" clearable></n-input>
    <n-select :options="transferStateList" v-model:value="params.transState" placeholder="请选择交易状态" clearable :disabled="searching" style="width: 200px"></n-select>
    <n-date-picker
      placeholder="请选择开始时间"
      v-model:formatted-value="params.startTime"
      value-format="yyyy-MM-dd HH:mm:ss"
      type="datetime"
      style="width: 200px"
      clearable
      :disabled="searching"
    />
    <n-date-picker
      placeholder="请选择结束时间"
      v-model:formatted-value="params.endTime"
      value-format="yyyy-MM-dd HH:mm:ss"
      type="datetime"
      style="width: 200px"
      clearable
      :disabled="searching"
    />
    <n-button type="primary" @click="searchHandler" :disabled="searching" :loading="searching">搜索 / 刷新</n-button>
    <custom-export-btn :export-params="params" :export-request="exportGoodsChainRecord" file-name="商品区块链记录"></custom-export-btn>
    <n-button type="warning" @click="multipleSync">批量同步</n-button>
  </n-space>
</template>

<script lang="ts" setup>
// 框架
import { reactive, ref } from "vue";
// 组件库
import { useDialog } from "naive-ui";

// 自定义组件
import customExportBtn from "@/component/common/customExportBtn.vue";
// 工具库
// 自定义工具
import { commonNotify } from "@/util/common";

// 网络请求
import { exportGoodsChainRecord, syncGoodsChainRecord } from "@/request/finance";

// store
import { userTypeList, transferStateList } from "./goodsBlockChainRecordManagerStore";
// 类型
import type { ChainRecordParams } from "@/type/Finance";

const dialog = useDialog();

const props = defineProps<{
  searching: boolean;
  checkedRowKeys: (string | number)[];
}>();

const emit = defineEmits<{
  (event: "submitSearch", params: ChainRecordParams): void;
  (event: "clearSelected"): void;
}>();

const params = reactive<ChainRecordParams>({});

const searchHandler = () => {
  emit("submitSearch", params);
};

const multipleSync = async () => {
  const dialogInfo = dialog.warning({
    title: "补发",
    content: "确认同步吗？",
    positiveText: "确认",
    onPositiveClick: async () => {
      dialogInfo.loading = true;
      const res = await syncGoodsChainRecord({ transferIds: props.checkedRowKeys });
      if (res) {
        commonNotify("success", "同步成功");
        emit("clearSelected");
      }
      searchHandler();
      dialogInfo.loading = false;
    },
  });
};
</script>

<style scoped lang="less"></style>
