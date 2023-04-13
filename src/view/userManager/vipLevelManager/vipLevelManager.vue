<script lang="ts">
// 框架
import { defineComponent, ref, onMounted } from "vue";
// 组件库
// 自定义组件
// 工具库
// 自定义工具
import { commonNotify } from "@/util/common";
// 网络请求
import { getVipLevelList, updateVipLevelList } from "@/request/user";
// store
import { useCommonStore } from "@/store/commonStore";
// 类型
import type { VipLevelItem } from "@/type/User";
// 组件名
export default defineComponent({
  name: "vipLevelManager",
});
</script>

<script lang="ts" setup>
const commonStore = useCommonStore();
const submiting = ref(false);

const vipLevelList = ref<VipLevelItem[]>([]);

// 获取vip等级列表
const initLevelList = async () => {
  commonStore.pageLoading = true;
  const res = await getVipLevelList();
  if (res) {
    vipLevelList.value = res.data.map((item) => {
      return {
        amount: Number(item.amount),
      };
    });
    commonStore.pageLoading = false;
  }
};

// 添加等级
const addLevel = () => {
  vipLevelList.value.push({
    amount: undefined,
  });
};

// 删除等级
const delLevel = (index: number) => {
  vipLevelList.value.splice(index, 1);
};

// 提交列表
const handleSubmit = async () => {
  submiting.value = true;
  const res = await updateVipLevelList(vipLevelList.value);
  if (res) {
    commonNotify("success", "vip等级设置成功！");
  }
  submiting.value = false;
};

onMounted(() => {
  initLevelList();
});
</script>

<template>
  <n-form label-placement="left" label-width="80px" label-align="left" :disabled="submiting">
    <n-card title="" style="margin-bottom: 15px">
      <n-form-item :label="`等级${key + 1}`" required v-for="(item, key) in vipLevelList" :key="key">
        <n-input-number v-model:value="item.amount" placeholder="请输入达到此等级所需的金额" :min="0" style="width: 100%" :disabled="submiting"></n-input-number>
        <n-button type="warning" @click="delLevel(key)">-删除等级</n-button>
      </n-form-item>
      <n-button block secondary type="primary" :disabled="submiting" @click="addLevel">+添加等级</n-button>
    </n-card>
  </n-form>
  <n-button style="margin-top: 15px" block type="primary" @click="handleSubmit" :loading="submiting" :disabled="submiting">确认提交</n-button>
</template>

<style scoped lang="less"></style>
