<template>
  <n-form label-placement="left" label-width="120px" label-align="left">
    <n-card title="基本信息：" style="margin-bottom: 15px">
      <n-form-item label="商品类目:">
        <category-select
          placeholder="请选择商品类目"
          v-model="goodsCategoryInfoList"
          :default-value="goodsInfo.spu.classifies[goodsInfo.spu.classifies.length - 1]"
          :disabled="formDisabled || editTypeLimit"
        ></category-select>
      </n-form-item>
      <n-form-item label="商品名称:">
        <n-input placeholder="请输入商品名称" v-model:value="goodsInfo.spu.goodsName" :disabled="formDisabled || editTypeLimit"></n-input>
      </n-form-item>
      <n-form-item label="商品描述:">
        <n-input placeholder="请输入商品描述" v-model:value="goodsInfo.spu.goodsDes" type="textarea" :disabled="formDisabled || editTypeLimit"></n-input>
      </n-form-item>
      <n-form-item label="商品详情:">
        <!-- <n-input placeholder="请输入商品详情" v-model:value="goodsInfo.spu.goodsDetail" type="textarea" :disabled="formDisabled || editTypeLimit"></n-input> -->
        <rich-text-editor v-model="goodsInfo.spu.goodsDetail" :disabled="formDisabled || editTypeLimit"></rich-text-editor>
      </n-form-item>
      <n-form-item label="商品属性:">
        <n-card>
          <n-space>
            <n-space v-for="(item, index) in goodsInfo.spu.goodsPropsList" :key="index">
              <n-input placeholder="请输入商品属性名" v-model:value="item.key" block style="width: 140px" :disabled="formDisabled || editTypeLimit"></n-input>
              <n-input placeholder="请输入商品属性值" v-model:value="item.value" block style="width: 180px" :disabled="formDisabled || editTypeLimit"></n-input>
              <n-button block secondary type="warning" :disabled="formDisabled || editTypeLimit" @click="deleteGoodsProps(index)">-删除属性</n-button>
            </n-space>
            <n-button block @click="addGoodsProps" secondary type="primary" :disabled="formDisabled || editTypeLimit" style="width: 434px">+添加属性</n-button>
          </n-space>
        </n-card>
      </n-form-item>
      <n-form-item label="商品封面:">
        <common-upload type="img" v-model="goodsCoverList" :max="1" :disabled="formDisabled || editTypeLimit"></common-upload>
      </n-form-item>
      <n-form-item label="商品图片:">
        <common-upload type="img" v-model="goodsImagesList" :max="6" :disabled="formDisabled || editTypeLimit"></common-upload>
      </n-form-item>
      <n-form-item label="商品视频:">
        <common-upload type="video" v-model="goodsVideoList" :max="1" :disabled="formDisabled || editTypeLimit"></common-upload>
      </n-form-item>
      <n-form-item label="视频封面:">
        <common-upload type="img" v-model="goodsVideoCoverList" :max="1" :disabled="formDisabled || editTypeLimit"></common-upload>
      </n-form-item>
      <n-form-item label="商品价格:">
        <n-input-number
          placeholder="请输入商品价格"
          v-model:value="goodsInfo.spu.goodsPrice"
          :min="minPrice"
          :style="{ width: inputWidth }"
          :disabled="formDisabled || editTypeLimit"
        >
          <template #suffix> 元 </template></n-input-number
        >
      </n-form-item>
      <n-form-item label="代币标准:">
        <n-select
          v-model:value="goodsInfo.spu.ercStandard"
          :options="ercStandardList"
          placeholder="请选择代币标准"
          :style="{ width: inputWidth }"
          clearable
          :disabled="formDisabled || editTypeLimit"
        />
      </n-form-item>
      <n-form-item label="商品总量:">
        <n-input-number
          placeholder="请输入商品总量"
          v-model:value="goodsInfo.spu.goodsTotal"
          :style="{ width: inputWidth }"
          :min="1"
          :disabled="goodsInfo.spu.ercStandard === 'ERC_721' || formDisabled || editTypeLimit"
        >
          <template #suffix> 份 </template></n-input-number
        >
      </n-form-item>
    </n-card>
    <n-card title="扩展信息：" style="margin-bottom: 15px">
      <n-form-item label="商品类型:">
        <n-select
          v-model:value="goodsInfo.extend.goodsType"
          :options="goodsTypeList"
          placeholder="请选择商品类型"
          :disabled="goodsStateChangeDisabled || formDisabled"
          :style="{ width: inputWidth }"
          clearable
        />
      </n-form-item>
      <n-form-item label="商品等级:" v-if="goodsInfo.extend.goodsType === GoodsType.BLIND_BOX_PRIZE">
        <n-select
          v-model:value="goodsInfo.extend.goodsLevel"
          :options="goodsLevelList"
          placeholder="请选择商品等级"
          :style="{ width: inputWidth }"
          clearable
          :disabled="formDisabled"
        />
      </n-form-item>
      <n-form-item label="销售开始时间:">
        <n-date-picker
          placeholder="请选择销售开始时间"
          v-model:formatted-value="goodsInfo.extend.goodsSaleTime"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetime"
          :style="{ width: inputWidth }"
          clearable
          :disabled="formDisabled"
        />
      </n-form-item>
      <n-form-item label="销售方式:">
        <n-select
          placeholder="请选择销售方式"
          v-model:value="goodsInfo.extend.saleType"
          :options="saleTypeList"
          :style="{ width: inputWidth }"
          clearable
          :disabled="formDisabled"
        />
      </n-form-item>
      <n-form-item label="优先购价格:" v-if="goodsInfo.extend.saleType !== SaleType.NOAMAL">
        <n-input-number placeholder="请输入优先购价格" v-model:value="goodsInfo.extend.priorityPrice" :min="minPrice" :style="{ width: inputWidth }" :disabled="formDisabled">
          <template #suffix> 元 </template></n-input-number
        >
      </n-form-item>
      <n-form-item label="特殊销售转正常销售时间:" v-if="goodsInfo.extend.saleType !== SaleType.NOAMAL">
        <n-date-picker
          placeholder="请选择特殊销售转正常销售时间"
          v-model:formatted-value="goodsInfo.extend.normalSaleTime"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetime"
          :style="{ width: inputWidth }"
          clearable
          :disabled="formDisabled"
        />
      </n-form-item>
      <n-form-item label="规则计算名单时间:" v-if="goodsInfo.extend.saleType === SaleType.RULES">
        <n-date-picker
          placeholder="请选择规则计算名单时间"
          v-model:formatted-value="goodsInfo.extend.ruleCalcTime"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetime"
          :style="{ width: inputWidth }"
          clearable
          :disabled="formDisabled"
        />
      </n-form-item>
      <n-form-item label="限购数量:">
        <n-input-number
          placeholder="请输入限购总量：-1表示不限购；0表示不可购买"
          v-model:value="goodsInfo.extend.orderLimit"
          :style="{ width: inputWidth }"
          :min="-1"
          :disabled="formDisabled"
        >
          <template #suffix> 份 </template></n-input-number
        >
      </n-form-item>
      <n-form-item label="提货类型:">
        <n-select
          v-model:value="goodsInfo.extend.expressType"
          :options="expresList"
          placeholder="请选择提货类型"
          :style="{ width: inputWidth }"
          clearable
          :disabled="formDisabled"
        />
      </n-form-item>
      <n-form-item label="提货开始时间:" v-if="goodsInfo.extend.expressType === ExpresType.YES">
        <n-date-picker
          placeholder="请选择提货开始时间"
          v-model:formatted-value="goodsInfo.extend.expressTime"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetime"
          :style="{ width: inputWidth }"
          clearable
          :disabled="formDisabled"
        />
      </n-form-item>
      <n-form-item label="提货结束时间:" v-if="goodsInfo.extend.expressType === ExpresType.YES">
        <n-date-picker
          placeholder="请选择提货结束时间"
          v-model:formatted-value="goodsInfo.extend.expressEndTime"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetime"
          :style="{ width: inputWidth }"
          clearable
          :disabled="formDisabled"
        />
      </n-form-item>
      <n-form-item label="溯源哈希:">
        <n-input v-model:value="goodsInfo.extend.traceHash" placeholder="请输入溯源哈希" :disabled="formDisabled"></n-input>
      </n-form-item>
      <n-form-item label="标记类型:">
        <n-select
          v-model:value="goodsInfo.extend.goodsTabType"
          :options="goodsTabList"
          placeholder="请选择标记类型"
          :style="{ width: inputWidth }"
          clearable
          :disabled="formDisabled"
        />
      </n-form-item>
    </n-card>
    <n-card title="积分：" v-if="goodsInfo.extend.goodsType === GoodsType.POINT" style="margin-bottom: 15px">
      <n-form-item label="积分编号:">
        <n-input v-model:value="goodsInfo.points.pointsId" placeholder="请输入积分编号" :disabled="formDisabled"></n-input>
      </n-form-item>
      <n-form-item label="所需数量:">
        <n-input-number v-model:value="goodsInfo.points.needNum" placeholder="请输入所需积分数量" :min="1" :style="{ width: inputWidth }" :disabled="formDisabled">
          <template #suffix> 份 </template></n-input-number
        >
      </n-form-item>
    </n-card>
    <n-card title="规则：" v-if="goodsInfo.extend.saleType === SaleType.RULES" style="margin-bottom: 15px">
      <n-card v-for="(item, key) in goodsInfo.rules" :key="key" :title="`规则${key + 1}`" style="margin-bottom: 15px">
        <n-form-item label="规则类型:">
          <n-select v-model:value="item.type" :options="ruleTypeList" placeholder="请选择规则类型" :style="{ width: inputWidth }" clearable :disabled="formDisabled" />
        </n-form-item>
        <n-form-item label="商品类目:" v-if="[RuleType.HOLD_CATEGORY, RuleType.EXTENSION_CATEGORY].includes(Number(item.type))">
          <category-select
            @update:model-value="(categoryList) => (item.itemId = String(categoryList[categoryList.length - 1].id))"
            placeholder="请选择商品类目"
            v-model="item.categoryList"
            check-type="all"
            :default-value="Number(item.itemId) || undefined"
            :disabled="formDisabled"
          ></category-select>
        </n-form-item>
        <n-form-item label="商品编号:" v-if="[RuleType.HOLD_GOODS, RuleType.EXTENSION_GOODS].includes(Number(item.type))">
          <n-input placeholder="请输入商品编号" v-model:value="item.itemId" :disabled="formDisabled"></n-input>
        </n-form-item>
        <n-form-item label="单位数量:">
          <n-input-number v-model:value="item.holdNum" placeholder="请输入奖励所需的单位数量" :min="1" :style="{ width: inputWidth }" :disabled="formDisabled">
            <template #suffix> 份 </template></n-input-number
          >
        </n-form-item>
        <n-form-item label="奖励数量:">
          <n-input-number v-model:value="item.unitNum" placeholder="请输入每单位数量奖励数量" :min="1" :style="{ width: inputWidth }" :disabled="formDisabled">
            <template #suffix> 份 </template></n-input-number
          >
        </n-form-item>
        <n-form-item label="奖励上限:">
          <n-input-number v-model:value="item.limitNum" placeholder="请输入奖励上限，0表示无上限" :min="0" :style="{ width: inputWidth }" :disabled="formDisabled">
            <template #suffix> 份 </template></n-input-number
          >
        </n-form-item>
        <n-form-item
          label="开始时间:"
          v-if="[RuleType.EXTENSION_REAL_NAME, RuleType.NEW_REAL_NAME, RuleType.EXTENSION_CATEGORY, RuleType.EXTENSION_GOODS].includes(item.type || 0)"
        >
          <n-date-picker
            placeholder="请选择开始时间"
            v-model:formatted-value="item.startTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            :style="{ width: inputWidth }"
            clearable
            :disabled="formDisabled"
          />
        </n-form-item>
        <n-form-item
          label="结束时间:"
          v-if="[RuleType.EXTENSION_REAL_NAME, RuleType.NEW_REAL_NAME, RuleType.EXTENSION_CATEGORY, RuleType.EXTENSION_GOODS].includes(item.type || 0)"
        >
          <n-date-picker
            placeholder="请选择结束时间"
            v-model:formatted-value="item.endTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            :style="{ width: inputWidth }"
            clearable
            :disabled="formDisabled"
          />
        </n-form-item>
        <template #footer> <n-button block @click="deleteRuleHandler(key)" secondary type="warning" :disabled="formDisabled" v-if="!isCheck">-删除规则</n-button> </template>
      </n-card>
      <n-button block @click="addRuleHandler" secondary type="primary" :disabled="formDisabled" :loading="submiting" v-if="!isCheck">+添加规则</n-button>
    </n-card>
  </n-form>

  <n-button type="primary" @click="submitHandler" block style="margin-top: 15px" v-if="!isCheck" :loading="submiting" :disabled="formDisabled">确认提交</n-button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "goodsAddManager",
});
</script>

<script lang="ts" setup>
// 框架
import { reactive, ref, computed, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
// 组件库

// 自定义组件
import categorySelect from "@/component/common/categorySelect.vue";
import commonUpload from "@/component/common/commonUpload.vue";
import richTextEditor from "@/component/common/richTextEditor.vue";
// 工具库
import { useFileNameFromURL } from "@ultra-man/noa";
// 自定义工具
import { commonNotify } from "@/util/common";
// 网络请求
import {
  goodsSubmit as goodsSubmitRequest,
  goodsEdit as goodsEditRequest,
  getGoodsDetail as getGoodsDetailRequest,
  updateGoodsExtend as updateGoodsExtendRequest,
} from "@/request/goods";
// store
import { ercStandardList, goodsLevelList, expresList, goodsTabList, ruleTypeList, ExpresType, RuleType } from "./goodsDetailManagerStore";
import { GoodsType, goodsTypeList, SaleType, saleTypeList, EditType } from "../goodsListManager/goodsListManagerStore";
import { useCommonStore } from "@/store/commonStore";
import { useRouteStore } from "@/store/routeStore";
// 类型
import type { GoodsDetail } from "@/type/GoodsManager";
import type { CategoryTreeItem, FileUpload } from "@/type/Common";
import { GoodsState } from "@/view/goodsManager/goodsListManager/goodsListManagerStore";

const route = useRoute();
const router = useRouter();
const commonStore = useCommonStore();
const routeStore = useRouteStore();

const inputWidth = ref("100%");
const minPrice = 0.01;
const submiting = ref(false);
const isCheck = ref(route.name === "goodsCheckManager");
const isEdit = ref(route.name === "goodsEditManager");
const goodsId = route.query.goodsId ? String(route.query.goodsId) : null;
const formDisabled = computed(() => {
  if (submiting.value || isCheck.value) {
    return true;
  } else {
    return false;
  }
});
const goodsStateChangeDisabled = computed(() => {
  const disabled = ![GoodsState.DRAFT, GoodsState.APPROVIAL_FAILED].includes(goodsInfo.spu.goodsState || GoodsState.DRAFT);
  return disabled;
});
// 判断是否有可编辑限制
const editType = ref(route.query.editType);
const editTypeLimit = computed(() => {
  return !!editType.value;
});

onMounted(() => {
  if (isCheck.value || isEdit.value) {
    getGoodsDetail();
  }
});

const getGoodsDetail = async () => {
  commonStore.pageLoading = true;
  const res = await getGoodsDetailRequest(goodsId as string);
  if (res && res.code === 0) {
    initForm(res.data);
  }
  commonStore.pageLoading = false;
};

const initForm = (goodsDetail: GoodsDetail) => {
  const { spu, extend, rules, points } = goodsDetail;
  // 处理spu
  spu.goodsPrice = Number(spu.goodsPrice);
  spu.goodsPropsList = [];
  for (const key in spu.goodsProps) {
    spu.goodsPropsList.push({
      key,
      value: spu.goodsProps[key] as string,
    });
  }
  // 处理 rules
  for (const item of rules) {
    item.categoryList = [];
  }
  // 处理商品封面
  if (spu.goodsCover) {
    goodsCoverList.value = [
      {
        fileUrl: spu.goodsCover,
        hashName: useFileNameFromURL(spu.goodsCover)(true),
      },
    ];
  }

  // 处理商品图片
  for (const item of spu.goodsImages) {
    goodsImagesList.value.push({
      fileUrl: item,
      hashName: useFileNameFromURL(item)(true),
    });
  }
  // 处理视频

  if (spu.goodsVideo) {
    goodsVideoList.value = [
      {
        fileUrl: spu.goodsVideo,
        hashName: useFileNameFromURL(spu.goodsVideo)(true),
      },
    ];
  }
  // 处理视频封面
  if (spu.goodsVideoCover) {
    goodsVideoCoverList.value = [
      {
        fileUrl: spu.goodsVideoCover,
        hashName: useFileNameFromURL(spu.goodsVideoCover)(true),
      },
    ];
  }

  goodsInfo.spu = spu;
  goodsInfo.extend = extend;
  goodsInfo.rules = rules;
  goodsInfo.points = points;
  if (goodsInfo.points) goodsInfo.points.needNum = Number(goodsInfo.points?.needNum);
};

const goodsCategoryInfoList = ref<CategoryTreeItem[]>([]);
const goodsCoverList = ref<FileUpload[]>([]);
const goodsImagesList = ref<FileUpload[]>([]);
const goodsVideoList = ref<FileUpload[]>([]);
const goodsVideoCoverList = ref<FileUpload[]>([]);

const goodsInfo = reactive<GoodsDetail>({
  spu: {
    classifies: [],
    ercStandard: null,
    goodsCover: "",
    goodsDes: "",
    goodsDetail: "",
    goodsId,
    goodsImages: [],
    goodsName: "",
    goodsPrice: null,
    goodsProps: {},
    goodsPropsList: [], // 工具属性
    goodsTotal: null,
    goodsVideo: "",
    goodsVideoCover: "",
  },
  extend: {
    expressEndTime: null,
    expressTime: null,
    expressType: null,
    goodsId,
    goodsLevel: null,
    goodsSaleTime: null,
    goodsTabType: null,
    goodsType: null,
    normalSaleTime: null,
    orderLimit: null,
    priorityPrice: null,
    ruleCalcTime: null,
    saleType: null,
    traceHash: "",
  },
  points: {
    goodsId,
    needNum: null,
    pointsId: null,
  },
  rules: [
    {
      endTime: null,
      holdNum: null,
      itemId: null,
      limitNum: null,
      startTime: null,
      type: null,
      unitNum: null,
      categoryList: [], // 工具属性
    },
  ],
});

watch(
  () => goodsInfo.spu.ercStandard,
  (newValue) => {
    if (newValue === "ERC_721") {
      goodsInfo.spu.goodsTotal = 1;
    }
  }
);

// 属性相关
const addGoodsProps = () => {
  goodsInfo.spu.goodsPropsList.push({
    key: "",
    value: "",
  });
};
const deleteGoodsProps = (index: number) => {
  goodsInfo.spu.goodsPropsList.splice(index, 1);
};

// 规则相关
const addRuleHandler = () => {
  goodsInfo.rules.push({
    endTime: null,
    holdNum: null,
    itemId: null,
    limitNum: null,
    startTime: null,
    type: null,
    unitNum: null,
    categoryList: [],
  });
};
const deleteRuleHandler = (index: number) => {
  if (goodsInfo.rules.length <= 1) {
    commonNotify("warning", "不能少于一条规则！");
  } else {
    goodsInfo.rules.splice(index, 1);
  }
};

// 处理提交前的数据（时间关系这里就不做参数校验了，后端都有校验）
const submitHandler = async () => {
  // 处理商品类目
  if (goodsCategoryInfoList.value.length === 4) {
    goodsInfo.spu.classifies = [];
    for (const item of goodsCategoryInfoList.value) {
      goodsInfo.spu.classifies.push(item.id);
    }
  }

  // 处理商品属性
  for (const item of goodsInfo.spu.goodsPropsList) {
    goodsInfo.spu.goodsProps[item.key] = item.value;
  }

  // 处理商品封面
  if (goodsCoverList.value.length >= 1) {
    goodsInfo.spu.goodsCover = goodsCoverList.value[0].hashName;
  }
  // 处理商品图片
  goodsInfo.spu.goodsImages = [];
  for (const item of goodsImagesList.value) {
    goodsInfo.spu.goodsImages.push(item.hashName);
  }
  // 处理商品视频
  if (goodsVideoList.value.length >= 1) {
    goodsInfo.spu.goodsVideo = goodsVideoList.value[0].hashName;
  }
  // 处理商品视频封面
  if (goodsVideoCoverList.value.length >= 1) {
    goodsInfo.spu.goodsVideoCover = goodsVideoCoverList.value[0].hashName;
  }
  // 确认提交
  comfirmSubmit();
};

// 判断提交的接口及处理结果
const comfirmSubmit = async () => {
  submiting.value = true;
  let message = "";
  let res = null;
  // 不同提交情况判断（新增，编辑，只编辑拓展参数）
  if (isEdit.value) {
    if (!editTypeLimit.value) {
      message = "商品编辑成功!";
      res = await goodsEditRequest(goodsInfo);
    } else if (editType.value === EditType.EXTEND) {
      message = "拓展参数编辑成功!";
      res = await updateGoodsExtendRequest(goodsInfo);
    }
  } else {
    message = "商品发布成功!";
    res = await goodsSubmitRequest(goodsInfo);
  }
  // 统一处理提交结果
  submiting.value = false;
  if (res) {
    commonNotify("success", message);
    routeStore.deleteCurrentRoute();
    router.push({
      name: "goodsListManager",
    });
  }
};
</script>

<style scoped lang="less"></style>
