<template>
  <n-form label-placement="left" label-width="120px" label-align="left">
    <n-card title="基本信息：" style="margin-bottom: 15px">
      <n-form-item label="抽签名称:" required>
        <n-input placeholder="请输入抽签名称" clearable v-model:value="lotteryFormData.info.name" :disabled="submiting || isCheck"></n-input>
      </n-form-item>

      <n-form-item label="宣传图:" required>
        <common-upload type="img" v-model="lotteryCoverList" :max="1" :disabled="submiting || isCheck" :maxSize="1"></common-upload>
      </n-form-item>

      <n-form-item label="作用类型:" required>
        <n-radio-group v-model:value="lotteryFormData.info.useType" :disabled="authStore.isAdmin">
          <n-space>
            <n-radio :label="item.label" :value="item.value" v-for="(item, index) in lotteryUseTypes" :key="index" :disabled="submiting || isCheck" />
          </n-space>
        </n-radio-group>
      </n-form-item>

      <n-form-item label="商品" v-if="[LotteryUseType.AIR_DROP].includes(lotteryFormData.info.useType || 0)" required>
        <n-input :value="goodsList.length >= 1 ? goodsList[0].goodsName : undefined" placeholder="请选择商品" :disabled="true"></n-input>
        <goodsSelect
          v-model:goods-selected-list="goodsList"
          :max="1"
          :disabled="submiting || isCheck"
          :goodsStates="[GoodsState.TO_BE_SHELVES, GoodsState.ON_THE_SHELF]"
        ></goodsSelect
      ></n-form-item>

      <n-form-item label="商品" v-if="[LotteryUseType.PRIORIT_PURCHASE].includes(lotteryFormData.info.useType || 0)" required>
        <n-input :value="goodsList.length >= 1 ? goodsList[0].goodsName : undefined" placeholder="请选择商品" :disabled="true"></n-input>
        <goodsSelect
          v-model:goods-selected-list="goodsList"
          :max="1"
          :disabled="submiting || isCheck"
          :goodsStates="[GoodsState.TO_BE_SHELVES, GoodsState.ON_THE_SHELF]"
          :funcType="lotteryFormData.info.useType === LotteryUseType.PRIORIT_PURCHASE ? GoodsFuncType.DRAW_PRIORIT_PURCHASE : undefined"
        ></goodsSelect
      ></n-form-item>

      <n-form-item label="标签码获取方式:" required>
        <n-input type="textarea" placeholder="请输入标签码获取方式描述" clearable v-model:value="lotteryFormData.info.acquireDes" :disabled="submiting || isCheck"></n-input>
      </n-form-item>

      <n-form-item label="中签规则:" required>
        <n-input type="textarea" placeholder="请输入中签规则" clearable v-model:value="lotteryFormData.info.lotteryRule" :disabled="submiting || isCheck"></n-input>
      </n-form-item>

      <n-form-item label="中签量规则" required>
        <n-radio-group v-model:value="lotteryFormData.info.rateType">
          <n-space>
            <n-radio :label="item.label" :value="item.value" v-for="(item, index) in rateTypes" :key="index" :disabled="submiting || isCheck" />
          </n-space>
        </n-radio-group>
      </n-form-item>

      <n-form-item label="中签数" required v-if="lotteryFormData.info.rateType === RateType.NUM">
        <n-input-number
          placeholder="请输入中签数"
          v-model:value="lotteryFormData.info.rate"
          :min="0"
          :precision="0"
          :style="{ width: inputWidth }"
          :disabled="submiting || isCheck"
        ></n-input-number>
      </n-form-item>

      <n-form-item label="中奖率" required v-if="lotteryFormData.info.rateType === RateType.RATE">
        <n-input-number
          placeholder="请输入中奖率(%)"
          v-model:value="lotteryFormData.info.rate"
          :min="0.01"
          :max="100"
          :precision="2"
          :style="{ width: inputWidth }"
          :disabled="submiting || isCheck"
          ><template #suffix> % </template></n-input-number
        >
      </n-form-item>

      <n-form-item label="匹配尾号长度" required>
        <n-input-number
          placeholder="请输入匹配尾号长度"
          v-model:value="lotteryFormData.info.numLen"
          :min="1"
          :max="9"
          :precision="0"
          :style="{ width: inputWidth }"
          :disabled="submiting || isCheck"
        ></n-input-number>
      </n-form-item>

      <n-form-item label="是否取余:" required>
        <n-select
          v-model:value="lotteryFormData.info.overReduce"
          :options="overReduceTypes"
          placeholder="请选择抽签尾号大于总数时，是否取余数"
          :style="{ width: inputWidth }"
          clearable
          :disabled="submiting || isCheck"
        />
      </n-form-item>

      <n-form-item label="是否可重复:" required>
        <n-select
          v-model:value="lotteryFormData.info.siteRepeat"
          :options="repeatAbleList"
          placeholder="请选择同一位置数字是否可以重复"
          :style="{ width: inputWidth }"
          clearable
          :disabled="submiting || isCheck"
        />
      </n-form-item>

      <n-form-item label="是否标记中签号:" required>
        <n-select
          v-model:value="lotteryFormData.info.hitType"
          :options="hitNumTabList"
          placeholder="请选择是否标记中签号"
          :style="{ width: inputWidth }"
          clearable
          :disabled="submiting || isCheck"
        />
      </n-form-item>

      <n-form-item label="开始时间" required>
        <n-date-picker
          placeholder="请选择结束时间"
          v-model:formatted-value="lotteryFormData.info.startTime"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetime"
          :style="{ width: inputWidth }"
          clearable
          :disabled="submiting || isCheck"
        />
      </n-form-item>

      <n-form-item label="结束时间" required>
        <n-date-picker
          placeholder="请选择结束时间"
          v-model:formatted-value="lotteryFormData.info.endTime"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetime"
          :style="{ width: inputWidth }"
          clearable
          :disabled="submiting || isCheck"
        />
      </n-form-item>

      <n-form-item label="标记类型:" required>
        <n-select
          v-model:value="lotteryFormData.info.lotteryTabType"
          :options="lotteryTabTypes"
          placeholder="请选择标记类型"
          :style="{ width: inputWidth }"
          clearable
          :disabled="submiting || isCheck"
        />
      </n-form-item>
    </n-card>

    <n-card title="规则：">
      <n-card v-for="(item, key) in lotteryFormData.rules" :key="key" :title="`规则${key + 1}`" style="margin-bottom: 15px">
        <n-form-item label="规则类型:" required>
          <n-select
            v-model:value="item.itemType"
            :options="lotteryRuleTypes"
            placeholder="请选择规则类型"
            :style="{ width: inputWidth }"
            clearable
            :disabled="submiting || isCheck"
          />
        </n-form-item>

        <n-form-item label="类目编号:" required v-show="[LotteryRuleType.HOLD_CATEGORY, LotteryRuleType.EXTENSION_CATEGORY].includes(Number(item.itemType))">
          <category-select
            v-model:model-value="item.categoryList"
            :default-value="isNaN(Number(item.itemId)) ? undefined : Number(item.itemId)"
            check-type="all"
            :disabled="submiting || isCheck"
          ></category-select>
        </n-form-item>

        <n-form-item label="商品" v-show="[LotteryRuleType.HOLD_GOODS, LotteryRuleType.EXTENSION_GOODS].includes(Number(item.itemType))" required>
          <n-input :value="item.goodsList.length >= 1 ? item.goodsList[0].goodsName : undefined" placeholder="请选择商品" :disabled="true"></n-input>
          <goodsSelect
            v-model:goods-selected-list="item.goodsList"
            :max="1"
            :disabled="submiting || isCheck"
            :goodsStates="[GoodsState.TO_BE_SHELVES, GoodsState.ON_THE_SHELF]"
          ></goodsSelect
        ></n-form-item>

        <n-form-item
          label="开始时间"
          required
          v-if="
            [LotteryRuleType.EXTENSION_REAL_NAME, LotteryRuleType.NEW_REAL_NAME, LotteryRuleType.EXTENSION_CATEGORY, LotteryRuleType.EXTENSION_GOODS].includes(
              Number(item.itemType)
            )
          "
        >
          <n-date-picker
            placeholder="请选择开始时间"
            v-model:formatted-value="item.startTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            :style="{ width: inputWidth }"
            clearable
            :disabled="submiting || isCheck"
          />
        </n-form-item>

        <n-form-item
          label="结束时间"
          required
          v-if="
            [LotteryRuleType.EXTENSION_REAL_NAME, LotteryRuleType.NEW_REAL_NAME, LotteryRuleType.EXTENSION_CATEGORY, LotteryRuleType.EXTENSION_GOODS].includes(
              Number(item.itemType)
            )
          "
        >
          <n-date-picker
            placeholder="请选择结束时间"
            v-model:formatted-value="item.endTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            :style="{ width: inputWidth }"
            clearable
            :disabled="submiting || isCheck"
          />
        </n-form-item>

        <n-form-item label="持有数量" required>
          <n-input-number placeholder="请输入持有数量" v-model:value="item.holdNum" :min="1" :style="{ width: inputWidth }" :disabled="submiting || isCheck"></n-input-number>
        </n-form-item>

        <n-form-item label="奖励数量" required>
          <n-input-number
            placeholder="请输入每持有数量的奖励数量"
            v-model:value="item.unitNum"
            :min="1"
            :style="{ width: inputWidth }"
            :disabled="submiting || isCheck"
          ></n-input-number>
        </n-form-item>

        <n-form-item label="上限数量" required>
          <n-input-number
            placeholder="请输入上限数量，0表示无上限"
            v-model:value="item.limitNum"
            :min="0"
            :style="{ width: inputWidth }"
            :disabled="submiting || isCheck"
          ></n-input-number>
        </n-form-item>

        <template #footer> <n-button block @click="deleteRuleHandler(key)" secondary type="warning" :disabled="submiting" v-if="!isCheck">-删除规则</n-button> </template>
      </n-card>

      <n-button block @click="addRuleHandler" secondary type="primary" :disabled="submiting" :loading="submiting" v-if="!isCheck">+添加规则</n-button>
    </n-card>
  </n-form>

  <n-button type="primary" @click="submitHandler" block style="margin-top: 15px" v-if="!isCheck" :loading="submiting" :disabled="submiting">确认提交</n-button>
</template>

<script lang="ts">
// 框架
import { defineComponent, reactive, ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
// 组件库
import commonUpload from "@/component/common/commonUpload.vue";
// 自定义组件
import categorySelect from "@/component/common/categorySelect.vue";
import goodsSelect from "@/component/common/goodsSelect.vue";
// 工具库
import { useFileNameFromURL } from "@ultra-man/noa";
// 自定义工具
import { commonNotify } from "@/util/common";
// 网络请求
import { getLotteryDetail, addLottery, editLottery } from "@/request/operator";
// store
import { useCommonStore } from "@/store/commonStore";
import { useAuthStore } from "@/store/authStore";
import { useRouteStore } from "@/store/routeStore";
import { overReduceTypes, repeatAbleList, hitNumTabList, lotteryRuleTypes, LotteryRuleType, rateTypes, RateType } from "./lotteryDetailStore";
import { lotteryTabTypes, lotteryUseTypes } from "../lotteryManager/lotteryManagerStore";
// 类型
import { GoodsState } from "@/view/goodsManager/goodsListManager/goodsListManagerStore";
import { DetailCheckType } from "@/type/Common";
import { GoodsFuncType } from "@/type/GoodsManager";
import type { FileUpload } from "@/type/Common";
import { LotteryUseType } from "@/type/Operator";
import type { LotteryFormDetail } from "@/type/Operator";
// 组件名
export default defineComponent({
  name: "lotteryDetail",
});
</script>

<script lang="ts" setup>
const route = useRoute();
const router = useRouter();
const routeStore = useRouteStore();
const commonStore = useCommonStore();
const authStore = useAuthStore();
const detailCheckType = route.query.type as DetailCheckType;
const isCheck = detailCheckType === DetailCheckType.CHECK;
const isEdit = detailCheckType === DetailCheckType.EDIT;
const inputWidth = "100%";

// 表单数据
const goodsList = ref<{ goodsId: string | number; goodsName: string }[]>([]);
const lotteryCoverList = ref<FileUpload[]>([]);
const lotteryFormData = reactive<LotteryFormDetail>({
  info: {
    rateType: 0,
    useType: 0,
  },
  rules: [
    {
      categoryList: [],
      goodsList: [],
    },
  ],
});

// 操作规则
const deleteRuleHandler = (index: number) => {
  if (lotteryFormData.rules.length <= 1) {
    commonNotify("warning", "不能少于一条规则！");
  } else {
    lotteryFormData.rules.splice(index, 1);
  }
};
const addRuleHandler = () => {
  lotteryFormData.rules.push({
    categoryList: [],
    goodsList: [],
  });
};

//提交
const submiting = ref(false);
const submitHandler = async () => {
  const rules = lotteryFormData.rules.map((item) => {
    let itemId = "";
    if ([LotteryRuleType.HOLD_GOODS, LotteryRuleType.EXTENSION_GOODS].includes(Number(item.itemType))) {
      itemId = item.goodsList[0] ? String(item.goodsList[0].goodsId) : item.itemId || "";
    } else if ([LotteryRuleType.EXTENSION_CATEGORY, LotteryRuleType.HOLD_CATEGORY].includes(Number(item.itemType))) {
      itemId = item.categoryList.length >= 1 ? String(item.categoryList[item.categoryList.length - 1].id) : item.itemId || "";
    }
    return { ...item, itemId };
  });

  const params = {
    info: { ...lotteryFormData.info },
    rules,
  };
  // 处理抽签封面
  if (lotteryCoverList.value.length >= 1) {
    params.info.adImage = lotteryCoverList.value[lotteryCoverList.value.length - 1].hashName;
  }
  if (params.info.rateType === RateType.RATE) {
    params.info.rate = Math.round((params.info.rate || 0) * 100);
  }
  if ([LotteryUseType.AIR_DROP, LotteryUseType.PRIORIT_PURCHASE].includes(lotteryFormData.info.useType || 0) && goodsList.value.length >= 1) {
    params.info.goodsId = String(goodsList.value[0].goodsId);
  }

  submiting.value = true;
  const submitRequest = isEdit ? editLottery : addLottery;
  const res = await submitRequest(params);
  if (res) {
    commonNotify("success", "提交成功");
    routeStore.deleteCurrentRoute();
    router.push({
      name: "lotteryManager",
    });
  }
  submiting.value = false;
};

// init
const initForm = async () => {
  commonStore.pageLoading = true;
  const res = await getLotteryDetail({ id: Number(route.query.id) });
  if (res) {
    lotteryFormData.info = res.data.info;
    if (lotteryFormData.info.rateType === RateType.RATE) {
      lotteryFormData.info.rate = Number(((lotteryFormData.info.rate || 0) / 100).toFixed(2));
    }
    if ([LotteryUseType.AIR_DROP, LotteryUseType.PRIORIT_PURCHASE].includes(lotteryFormData.info.useType || 0)) {
      goodsList.value = [
        {
          goodsId: res.data.info.goodsId || "",
          goodsName: res.data.info.goodsName || "",
        },
      ];
    }
    lotteryFormData.rules = res.data.rules.map((item) => {
      const itemId = item.itemId || "";
      return {
        ...item,
        categoryList: [],
        goodsList: [LotteryRuleType.HOLD_GOODS, LotteryRuleType.EXTENSION_GOODS].includes(Number(item.itemType))
          ? [
              {
                goodsId: itemId,
                goodsName: itemId,
              },
            ]
          : [],
      };
    });

    lotteryCoverList.value = [
      {
        hashName: res.data.info.adImage ? useFileNameFromURL(res.data.info.adImage)(true) : "",
        fileUrl: res.data.info.adImage || "",
      },
    ];
  }
  commonStore.pageLoading = false;
};
onMounted(async () => {
  if ([DetailCheckType.CHECK, DetailCheckType.EDIT].includes(detailCheckType)) {
    await initForm();
  }
  // 这个要在初始化之后watch
  watch(
    () => lotteryFormData.info.rateType,
    () => {
      lotteryFormData.info.rate = undefined;
    }
  );

  watch(
    () => lotteryFormData.info.useType,
    () => {
      lotteryFormData.info.goodsId = "";
      goodsList.value = [];
    }
  );
});
</script>

<style scoped lang="less"></style>
