<template>
  <n-space>
    <n-input v-model:value="params.uid" autosize placeholder="请输入用户编号" style="width: 200px" :disabled="searching" v-if="authStore.isAdmin" clearable></n-input>
    <n-input v-model:value="params.phone" autosize placeholder="请输入手机号" style="width: 200px" :disabled="searching" v-if="authStore.isAdmin" clearable></n-input>
    <n-input v-model:value="params.chainAddress" autosize placeholder="请输入区块链地址" style="width: 200px" :disabled="searching" clearable></n-input>
    <n-select v-model:value="params.role" :options="accountRoleList" placeholder="请选择用户类型" style="width: 200px" :disabled="searching" clearable />
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
    <n-button type="primary" @click="addChildUserHandler">添加子用户</n-button>
  </n-space>

  <n-modal :show="showModal" @update:show="(state: boolean) => (showModal = state)">
    <n-card style="width: 600px" title="添加子用户" :bordered="false" size="huge" role="dialog" aria-modal="true">
      <template #header-extra>
        <custom-icon name="guanbi" :size="16" @click="showModal = false"></custom-icon>
      </template>

      <n-form label-placement="left" label-width="80px" label-align="left">
        <n-form-item label="用户名:">
          <n-input placeholder="请输入用户名" v-model:value="userInfo.nickName" :disabled="addLoading" maxlength="32"></n-input>
        </n-form-item>
        <n-form-item label="账号:">
          <n-input placeholder="请输入账号" v-model:value="userInfo.phone" :disabled="addLoading" maxlength="16" minlength="6"></n-input>
        </n-form-item>
        <n-form-item label="密码:">
          <n-input placeholder="请输入密码" type="password" show-password-on="mousedown" v-model:value="userInfo.password" :disabled="addLoading" maxlength="16"></n-input>
        </n-form-item>
        <n-form-item label="角色:">
          <roleSelect :disabled="addLoading" v-model:module-value="userInfo.childRole"></roleSelect>
        </n-form-item>
      </n-form>

      <template #footer>
        <div style="display: flex; justify-content: end">
          <n-button type="primary" inline-block @click="comfirmAdd" :disabled="addLoading" :loading="addLoading">确认</n-button>
        </div>
      </template>
    </n-card>
  </n-modal>
</template>

<script lang="ts" setup>
// 框架
import { reactive, ref } from "vue";
// 组件库
// 自定义组件
import customIcon from "@/component/common/customIcon.vue";
import roleSelect from "@/component/common/roleSelect.vue";
// 工具库
// 自定义工具
import { commonNotify } from "@/util/common";
// 网络请求
import { addChildUser } from "@/request/user";
// store
import { useAuthStore } from "@/store/authStore";
import { accountRoleList } from "./adminMerchantManagerStore";
// 类型
import type { AdminMerchantListParam } from "@/type/User";

const authStore = useAuthStore();

defineProps<{
  searching: boolean;
}>();

const emit = defineEmits<{
  (event: "submitSearch", params: AdminMerchantListParam): void;
}>();

const params = reactive<AdminMerchantListParam>({});

const searchHandler = () => {
  emit("submitSearch", params);
};

const showModal = ref(false);
const addLoading = ref(false);
const userInfo = ref<{
  childRole: number | null;
  nickName: string;
  password: string;
  phone: string;
}>({
  childRole: null,
  nickName: "",
  password: "",
  phone: "",
});
const addChildUserHandler = () => {
  showModal.value = true;
};
const comfirmAdd = async () => {
  addLoading.value = true;
  const res = await addChildUser(userInfo.value);
  if (res) {
    commonNotify("success", "子用户添加成功");
    searchHandler();
    showModal.value = false;
  }
  addLoading.value = false;
};
</script>

<style scoped lang="less"></style>
