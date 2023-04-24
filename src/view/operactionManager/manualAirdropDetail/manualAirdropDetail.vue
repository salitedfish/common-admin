<template>
  <n-card>
    <n-form label-placement="left" label-width="120px" label-align="left" :disabled="submiting">
      <n-form-item label="空投名称:" required>
        <n-input v-model:value="formData.name" placeholder="请输入空投名称"></n-input>
      </n-form-item>
      <n-form-item label="空投物品类型:" required>
        <n-select :options="airDropItemTypeList" v-model:value="formData.rewardType" :disabled="itemTypeChangedisable || submiting"></n-select>
      </n-form-item>
      <!-- <n-form-item label="商品编号:" v-show="formData.itemType === AirDropItemType.GOODS" required>
        <n-input v-model:value="formData.itemId" placeholder="请输入商品编号"></n-input>
      </n-form-item>
      <n-form-item label="积分编号:" v-show="formData.itemType === AirDropItemType.POINTS" required>
        <n-input v-model:value="formData.itemId" placeholder="请输入积分编号"></n-input>
      </n-form-item> -->
      <n-form-item label="奖励商品:" required v-if="formData.rewardType === AirDropItemType.GOODS">
        <n-input placeholder="请选择奖励商品" :value="goodsList.length >= 1 ? goodsList[0].goodsName : undefined" disabled></n-input>
        <goodsSelect v-model:goods-selected-list="goodsList" :max="1" :disabled="submiting" :goodsStates="[GoodsState.TO_BE_SHELVES, GoodsState.ON_THE_SHELF]"></goodsSelect>
      </n-form-item>

      <n-form-item label="奖励积分:" required v-if="formData.rewardType === AirDropItemType.POINTS">
        <n-input placeholder="请选择奖励积分" :value="pointsList.length >= 1 ? pointsList[0].pointsName : undefined" disabled></n-input>
        <pointsSelect v-model:points-select-list="pointsList" :max="1" :disabled="submiting" :multiple="true" :pointsStates="[PointsState.PUBLISH_SUCCESS]"></pointsSelect>
      </n-form-item>

      <n-form-item label="奖励代币:" required v-if="formData.rewardType === AirDropItemType.COIN">
        <n-input placeholder="请选择奖励代币" :value="coinList.length >= 1 ? coinList[0].coinName : undefined" disabled></n-input>
        <parallelCoinSelect v-model:parallel-coin-select-list="coinList" :max="1" :disabled="submiting" :multiple="true"></parallelCoinSelect>
      </n-form-item>
      <n-form-item label="空投时间:" required>
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
import goodsSelect from "@/component/common/goodsSelect.vue";
import pointsSelect from "@/component/pointsSelect/pointsSelect.vue";
import parallelCoinSelect from "@/component/parallelCoinSelect/parallelCoinSelect.vue";
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
import { GoodsState } from "@/view/goodsManager/goodsListManager/goodsListManagerStore";
import { PointsState } from "@/view/pointsManager/pointsListManager/pointsListManagerStore";
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

// 空投物品选择列表
const goodsList = ref<{ goodsId: string | number; goodsName: string }[]>([]);
const pointsList = ref<{ pointsId: string; pointsName: string }[]>([]);
const coinList = ref<{ coinId: string; coinName: string }[]>([]);

const formData = reactive<ManualAirDropAddParams>({
  rewardId: "",
  rewardName: "",
  rewardType: 0,
  name: "",
  startTime: null,
});

const itemTypeChangedisable = ref(false);
if (authStore.isAdmin) {
  formData.rewardType = 1;
  itemTypeChangedisable.value = true;
}

const submiting = ref(false);
const handleSubmit = async () => {
  submiting.value = true;
  // 如果是商品
  if (formData.rewardType === AirDropItemType.GOODS) {
    formData.rewardId = String(goodsList.value[0]?.goodsId);
  }
  // 如果是积分
  if (formData.rewardType === AirDropItemType.POINTS) {
    formData.rewardId = pointsList.value[0]?.pointsId;
  }
  // 如果是代币
  if (formData.rewardType === AirDropItemType.COIN) {
    formData.rewardId = coinList.value[0]?.coinId;
  }
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
    const { id, rewardId, rewardType, rewardName, name, startTime } = res.data;
    formData.id = id;
    formData.rewardId = rewardId;
    formData.rewardType = rewardType;
    formData.name = name;
    formData.startTime = startTime;

    // 如果是商品
    if (rewardType === AirDropItemType.GOODS) {
      goodsList.value = [
        {
          goodsId: rewardId || "",
          goodsName: rewardName || "",
        },
      ];
    }
    // 如果是积分
    if (rewardType === AirDropItemType.POINTS) {
      pointsList.value = [
        {
          pointsId: rewardId || "",
          pointsName: rewardName || "",
        },
      ];
    }
    // 如果是代币
    if (rewardType === AirDropItemType.COIN) {
      coinList.value = [
        {
          coinId: rewardId || "",
          coinName: rewardName || "",
        },
      ];
    }
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
