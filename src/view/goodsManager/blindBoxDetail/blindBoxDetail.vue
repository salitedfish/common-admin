<template>
  <n-form label-placement="left" label-width="120px" label-align="left">
    <n-card title="基本信息：" style="margin-bottom: 15px">
      <n-form-item label="商品名称:" required>
        <n-input :value="goodsName" disabled></n-input>
      </n-form-item>
    </n-card>
    <n-card title="奖品列表：">
      <n-form-item label="选择盲盒奖品:" required>
        <div>
          <n-space v-for="(item, key) in goodsSelectedList" :key="key" style="margin-bottom: 5px">
            <n-input :value="String(item.goodsId)" disabled style="width: 200px"></n-input>
            <n-input :value="item.goodsName" disabled style="width: 300px"></n-input>
            <n-button type="warning" secondary v-if="!isCheck" :disabled="submiting" @click="deletePrize(key)">删除奖品</n-button>
          </n-space>
          <n-button type="primary" secondary @click="showGoodsSelectModal = true" v-if="!isCheck" :disabled="submiting" style="width: 608px">添加奖品</n-button>
        </div>
      </n-form-item>
    </n-card>
  </n-form>

  <n-button type="primary" @click="submitHandler" block style="margin-top: 15px" v-if="!isCheck" :loading="submiting" :disabled="submiting">确认提交</n-button>

  <goodsSelectModal
    v-model:show-goods-select-modal="showGoodsSelectModal"
    v-model:goodsSelectedList="goodsSelectedList"
    :goodsType="GoodsType.BLIND_BOX_PRIZE"
    :goodsStates="[GoodsState.TO_BE_SHELVES, GoodsState.ON_THE_SHELF]"
  ></goodsSelectModal>
</template>

<script lang="ts">
// 框架
import { defineComponent, ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
// 组件库
// 自定义组件
import goodsSelectModal from "@/component/goodsSelectDialog/goodsSelectDialog.vue";
// 工具库
// 自定义工具
import { commonNotify } from "@/util/common";
// 网络请求
import { getBlindBoxPrizeList, submitBlindBoxPrize } from "@/request/goods";
// store
import { useRouteStore } from "@/store/routeStore";
import { useCommonStore } from "@/store/commonStore";
import { GoodsType } from "@/view/goodsManager/goodsListManager/goodsListManagerStore";
import { GoodsState } from "@/view/goodsManager/goodsListManager/goodsListManagerStore";

// 类型
// 组件名
export default defineComponent({
  name: "editBlindBox",
});
</script>

<script lang="ts" setup>
const route = useRoute();
const router = useRouter();
const routeStore = useRouteStore();
const commonStore = useCommonStore();
const goodsName = computed(() => {
  return String(route.query.name);
});
const goodsId = computed(() => {
  return String(route.query.id);
});
const isCheck = computed(() => {
  return route.name === "checkBlindBox";
});

const showGoodsSelectModal = ref(false);
const goodsSelectedList = ref<{ goodsId: string | number; goodsName: string }[]>([]);

const initData = async () => {
  const res = await getBlindBoxPrizeList({ goodsId: goodsId.value });
  if (res) {
    goodsSelectedList.value = res.data.map((item) => {
      return {
        goodsId: item.boxGoodsId,
        goodsName: item.goodsName,
      };
    });
  }
};

const deletePrize = (index: number) => {
  goodsSelectedList.value.splice(index, 1);
};

const submiting = ref(false);
const submitHandler = async () => {
  submiting.value = true;
  const list = goodsSelectedList.value.map((item) => String(item.goodsId));
  const res = await submitBlindBoxPrize({ boxGoodsIds: list, goodsId: goodsId.value });
  submiting.value = false;
  if (res) {
    commonNotify("success", "提交成功");
    routeStore.deleteCurrentRoute();
    router.push({
      name: "goodsListManager",
    });
  }
};

onMounted(async () => {
  commonStore.pageLoading = true;
  await initData();
  commonStore.pageLoading = false;
});
</script>

<style scoped lang="less"></style>
