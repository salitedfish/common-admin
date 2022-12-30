<template>
  <n-card>
    <n-form label-placement="left" label-width="120px" label-align="left" :disabled="submiting">
      <n-form-item label="空投名称:">
        <n-input v-model:value="formData.name" placeholder="请输入空投名称"></n-input>
      </n-form-item>
      <n-form-item label="空投物品类型:">
        <n-select :options="airDropItemTypeList" v-model:value="formData.itemType" :disabled="itemTypeChangedisable || submiting"></n-select>
      </n-form-item>
      <n-form-item label="商品编号:" v-show="formData.itemType === AirDropItemType.GOODS">
        <n-input v-model:value="formData.itemId" placeholder="请输入商品编号"></n-input>
      </n-form-item>
      <n-form-item label="积分编号:" v-show="formData.itemType === AirDropItemType.POINTS">
        <n-input v-model:value="formData.itemId" placeholder="请输入积分编号"></n-input>
      </n-form-item>
      <n-form-item label="空投时间:">
        <n-date-picker
          placeholder="请选择空投时间"
          v-model:formatted-value="formData.startTime"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetime"
          :style="{ width: inputWidth }"
          clearable
        />
      </n-form-item>
    </n-form>
  </n-card>
  <n-button style="margin-top: 15px" block type="primary" @click="handleSubmit" :loading="submiting" :disabled="submiting">确认提交</n-button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "addManualAirdrop",
});
</script>
<script lang="ts" setup>
// 框架
import { reactive, ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
// 组件库
// 自定义组件
// 工具库
// 自定义工具
import { commonNotify } from "@/util/common";
// 网络请求
import { addManualAirDrop, getDetailManualAirDrop, editManualAirDrop } from "@/request/operator";
// store
import { useRouteStore } from "@/store/routeStore";
import { useCommonStore } from "@/store/commonStore";
import { useAuthStore } from "@/store/authStore";
import { airDropItemTypeList, AirDropItemType } from "@/view/operactionManager/manualAirdropManager/manualAirdropManagerStore";
// 类型
import type { ManualAirDropAddParams } from "@/type/Operator";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const commonStore = useCommonStore();
const routeStore = useRouteStore();
const inputWidth = ref("100%");
const isEdit = computed(() => {
  return route.name === "editManualAirdrop";
});

const formData = reactive<ManualAirDropAddParams>({
  itemId: "",
  itemType: 0,
  name: "",
  startTime: null,
});

const itemTypeChangedisable = ref(false);
if (authStore.isAdmin) {
  formData.itemType = 1;
  itemTypeChangedisable.value = true;
}

const submiting = ref(false);
const handleSubmit = async () => {
  submiting.value = true;
  let action = "新增";
  if (isEdit.value) {
    action = "编辑";
    formData.id = Number(route.query.id);
  }
  const res = isEdit.value ? await editManualAirDrop(formData) : await addManualAirDrop(formData);
  if (res) {
    commonNotify("success", `空投${action}成功`);
    routeStore.deleteCurrentRoute();
    router.push({
      name: "manualAirdropManager",
    });
  }
  submiting.value = false;
};

const initFormData = async () => {
  commonStore.pageLoading = true;
  const id = Number(route.query.id);
  const res = await getDetailManualAirDrop({ id });
  if (res) {
    const { id, itemId, itemType, name, startTime } = res.data;
    formData.id = id;
    formData.itemId = itemId;
    formData.itemType = itemType;
    formData.name = name;
    formData.startTime = startTime;
  }
  commonStore.pageLoading = false;
};

onMounted(() => {
  if (isEdit.value) {
    initFormData();
  }
});
</script>

<style scoped lang="less"></style>
