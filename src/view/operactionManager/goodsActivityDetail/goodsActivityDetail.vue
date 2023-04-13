<script lang="ts">
// 框架
import { defineComponent, ref, onMounted, createVNode } from "vue";
import { useRoute, useRouter } from "vue-router";
// 组件库
import { NButton, NInputNumber } from "naive-ui";
// 自定义组件
import goodsSelect from "@/component/common/goodsSelect.vue";
import pointsSelect from "@/component/pointsSelect/pointsSelect.vue";
// 工具库
// 自定义工具
import { commonNotify } from "@/util/common";
// 网络请求
import { getGoodsActivityDetail, addGoodsActivityDetail, updateGoodsActivityDetail } from "@/request/operator";
// store
import { useCommonStore } from "@/store/commonStore";
import { useRouteStore } from "@/store/routeStore";
import { goodsActivityIdentityList } from "@/view/operactionManager/goodsActivityManager/goodsActivityManagerStore";
import { switchToView, switchToAPI, rewardTypeList, RewardType, goodsActivityTimeTypeList, GoodsActivityTimeType } from "./goodsActivityDetailStore";
// 类型
import type { VNode } from "vue";
import type { DataTableColumns } from "naive-ui";
import { DetailCheckType } from "@/type/Common";
import { GoodsState } from "@/view/goodsManager/goodsListManager/goodsListManagerStore";
import { PointsState } from "@/view/pointsManager/pointsListManager/pointsListManagerStore";
import { GoodsActivityIdentity } from "@/view/operactionManager/goodsActivityManager/goodsActivityManagerStore";
import type { GoodsActivityDetailView, GoodsActivityRule, GoodsActivityDetailViewRule } from "@/type/Operator";
// 组件名
export default defineComponent({
  name: "goodsActivityDetail",
});
</script>

<script lang="ts" setup>
const route = useRoute();
const router = useRouter();
const commonStore = useCommonStore();
const routeStore = useRouteStore();

const checkType = route.query.type as DetailCheckType;
const id = route.query.id as string;
const isCheck = checkType === DetailCheckType.CHECK;

const goodsList = ref<{ goodsId: string | number; goodsName: string }[]>([]);
const rewardGoodsList = ref<{ goodsId: string | number; goodsName: string }[]>([]);
const rewardPointsList = ref<{ pointsId: string; pointsName: string }[]>([]);
const goodsActivityDetail = ref<GoodsActivityDetailView>({
  info: {},
  rules: [],
});

// 规则的角色表格
const createColumns = (viewRule: GoodsActivityDetailViewRule) => {
  const list: DataTableColumns<GoodsActivityRule> = [
    {
      title: "角色",
      key: "type",
      align: "center",
      width: 80,
      render: (rule) => {
        return goodsActivityIdentityList.getItem(rule.type)?.label;
      },
    },
    {
      title: "邀请层级",
      key: "type",
      align: "center",
      width: 120,
      render: (rule) => {
        return rule.type === GoodsActivityIdentity.SHARE
          ? createVNode(NInputNumber, {
              placeholder: "请输入邀请层级",
              min: 0,
              value: rule.inviteLevel,
              onUpdateValue: (newValue: number) => {
                rule.inviteLevel = newValue;
              },
              disabled: submiting.value || isCheck,
            })
          : "-";
      },
    },

    {
      title: "最低vip等级",
      key: "type",
      align: "center",
      width: 120,
      render: (rule) => {
        return rule.type === GoodsActivityIdentity.SHARE
          ? createVNode(NInputNumber, {
              placeholder: "请输入最低vip等级",
              min: 0,
              value: rule.minVipLevel,
              onUpdateValue: (newValue: number) => {
                rule.minVipLevel = newValue;
              },
              disabled: submiting.value || isCheck,
            })
          : "-";
      },
    },

    {
      title: "每个总奖励数量",
      key: "type",
      align: "center",
      width: 120,
      render: (rule) => {
        return createVNode(NInputNumber, {
          placeholder: "请输入每个总奖励数量",
          min: 0,
          value: rule.totalUnitNum,
          onUpdateValue: (newValue: number) => {
            rule.totalUnitNum = newValue;
          },
          disabled: submiting.value || isCheck,
        });
      },
    },

    {
      title: "单次释放数量",
      key: "type",
      align: "center",
      width: 120,
      render: (rule) => {
        return createVNode(NInputNumber, {
          placeholder: "请输入单次释放数量",
          min: 0,
          value: rule.unitNum,
          onUpdateValue: (newValue: number) => {
            rule.unitNum = newValue;
          },
          disabled: submiting.value || isCheck,
        });
      },
    },
  ];
  if (!isCheck) {
    list.push({
      title: "操作",
      key: "operaction",
      align: "center",
      width: 80,
      fixed: "right",
      render(rule, index) {
        const list: VNode[] = [];
        const size = "small";
        const type = "warning";

        //删除角色按钮
        if (rule.type === GoodsActivityIdentity.SHARE) {
          list.push(
            createVNode(
              NButton,
              {
                type,
                size,
                secondary: true,
                onClick: () => {
                  delRuleMan(viewRule, index);
                },
                disabled: submiting.value,
              },
              {
                default: () => "-删除规则角色",
              }
            )
          );
        }

        return list;
      },
    });
  }
  return list;
};

// 新增规则
const addRule = () => {
  goodsActivityDetail.value.rules.push({
    belowOrderNum: undefined,
    rule: [
      {
        type: GoodsActivityIdentity.BUY,
      },
    ],
  });
};
// 删除规则
const delRule = (index: number) => {
  goodsActivityDetail.value.rules.splice(index, 1);
};

// 新增规则角色
const addRuleMan = (rule: GoodsActivityDetailViewRule) => {
  if (rule.rule) {
    rule.rule.push({
      type: GoodsActivityIdentity.SHARE,
    });
  }
};
// 删除规则角色
const delRuleMan = (rule: GoodsActivityDetailViewRule, index: number) => {
  if (rule.rule) {
    rule.rule.splice(index, 1);
  }
};

// 提交数据
const submiting = ref(false);
const submit = async () => {
  const submitRequest = checkType === DetailCheckType.EDIT ? updateGoodsActivityDetail : addGoodsActivityDetail;
  const tip = checkType === DetailCheckType.EDIT ? "编辑" : "新增";
  submiting.value = true;
  const data = switchToAPI(goodsActivityDetail.value);
  data.info.goodsId = String(goodsList.value[0]?.goodsId);
  // 如果奖励是商品
  if (data.info.itemType === RewardType.GOODS) {
    data.info.itemId = String(rewardGoodsList.value[0]?.goodsId);
  }
  // 如果奖励是积分
  if (data.info.itemType === RewardType.POINTS) {
    data.info.itemId = rewardPointsList.value[0]?.pointsId;
  }
  // 如果是编辑还需要赋值id
  if ([DetailCheckType.EDIT].includes(checkType)) {
    data.info.id = Number(id);
  }
  const res = await submitRequest(data);
  if (res) {
    commonNotify("success", `${tip}商品活动成功！`);
    routeStore.deleteCurrentRoute();
    router.push({
      name: "goodsActivityManager",
    });
  }
  submiting.value = false;
};

// 初始化数据
const init = async () => {
  commonStore.pageLoading = true;
  const res = await getGoodsActivityDetail({ id });
  if (res) {
    goodsActivityDetail.value = switchToView(res.data);
    const { goodsId, goodsName, itemType, itemId, itemName } = goodsActivityDetail.value.info;
    goodsList.value = [
      {
        goodsId: goodsId || "",
        goodsName: goodsName || "",
      },
    ];
    // 如果奖励是商品
    if (itemType === RewardType.GOODS) {
      rewardGoodsList.value = [
        {
          goodsId: itemId || "",
          goodsName: itemName || "",
        },
      ];
    }
    // 如果奖励是积分
    if (itemType === RewardType.POINTS) {
      rewardPointsList.value = [
        {
          pointsId: itemId || "",
          pointsName: itemName || "",
        },
      ];
    }
    commonStore.pageLoading = false;
  }
};

onMounted(() => {
  if ([DetailCheckType.CHECK, DetailCheckType.EDIT].includes(checkType)) {
    init();
  }
});
</script>

<template>
  <n-form v-if="!commonStore.pageLoading" label-placement="left" label-width="130px" label-align="left" :disabled="submiting || isCheck">
    <n-card title="基本信息：" style="margin-bottom: 15px">
      <n-form-item label="活动名称:" required>
        <n-input placeholder="请输入活动名称" v-model:value="goodsActivityDetail.info.name"></n-input>
      </n-form-item>

      <n-form-item label="活动商品:" required>
        <n-input placeholder="请选择活动商品" :value="goodsList.length >= 1 ? goodsList[0].goodsName : undefined" disabled></n-input>
        <goodsSelect
          v-model:goods-selected-list="goodsList"
          :max="1"
          :disabled="submiting || isCheck"
          :goodsStates="[GoodsState.TO_BE_SHELVES, GoodsState.ON_THE_SHELF]"
        ></goodsSelect>
      </n-form-item>

      <n-form-item label="奖励类型:" required>
        <n-select v-model:value="goodsActivityDetail.info.itemType" placeholder="请选择奖励类型" :options="rewardTypeList" />
      </n-form-item>

      <n-form-item label="奖励商品:" required v-if="goodsActivityDetail.info.itemType === RewardType.GOODS">
        <n-input placeholder="请选择奖励商品" :value="rewardGoodsList.length >= 1 ? rewardGoodsList[0].goodsName : undefined" disabled></n-input>
        <goodsSelect
          v-model:goods-selected-list="rewardGoodsList"
          :max="1"
          :disabled="submiting || isCheck"
          :goodsStates="[GoodsState.TO_BE_SHELVES, GoodsState.ON_THE_SHELF]"
        ></goodsSelect>
      </n-form-item>

      <n-form-item label="奖励积分:" required v-if="goodsActivityDetail.info.itemType === RewardType.POINTS">
        <n-input placeholder="请选择奖励积分" :value="rewardPointsList.length >= 1 ? rewardPointsList[0].pointsName : undefined" disabled></n-input>
        <pointsSelect
          v-model:points-select-list="rewardPointsList"
          :max="1"
          :disabled="submiting || isCheck"
          :multiple="true"
          :pointsStates="[PointsState.PUBLISH_SUCCESS]"
        ></pointsSelect>
      </n-form-item>

      <n-form-item label="执行时间类型：" required>
        <n-select :options="goodsActivityTimeTypeList" v-model:value="goodsActivityDetail.info.timeType" placeholder="请选择执行时间类型"></n-select>
      </n-form-item>
      <n-form-item label="执行日(每月)：" v-show="goodsActivityDetail.info.timeType === GoodsActivityTimeType.MONTH" required>
        <n-select :options="commonStore.monthMap" v-model:value="goodsActivityDetail.info.timeDay" placeholder="请选择执行日"></n-select>
      </n-form-item>
      <n-form-item label="执行日(每周)：" v-show="goodsActivityDetail.info.timeType === GoodsActivityTimeType.WEEK" required>
        <n-select :options="commonStore.weekMap" v-model:value="goodsActivityDetail.info.timeDay" placeholder="请选择执行日"></n-select>
      </n-form-item>
      <n-form-item label="执行时间：" required>
        <n-select :options="commonStore.hourMap" v-model:value="goodsActivityDetail.info.timeHour" placeholder="请选择执行时间"></n-select>
      </n-form-item>
    </n-card>

    <n-card title="规则：" style="margin-bottom: 15px">
      <n-card :title="`规则${key + 1}:`" style="margin-bottom: 15px" v-for="(item, key) in goodsActivityDetail.rules" :key="key">
        <n-form-item label="梯度（不包含）:" required>
          <n-input-number v-model:value="item.belowOrderNum" placeholder="请输入梯度（不包含）" :min="0" style="width: 100%"></n-input-number>
        </n-form-item>

        <n-data-table :single-line="false" :columns="createColumns(item)" :data="item.rule"></n-data-table>

        <n-button style="margin-top: 15px" block tertiary type="primary" v-if="!isCheck" :disabled="submiting" @click="addRuleMan(item)">+添加规则角色</n-button>

        <n-button style="margin-top: 15px" block secondary type="warning" v-if="!isCheck" :disabled="submiting" @click="delRule(key)">-删除规则</n-button>
      </n-card>
      <n-button block secondary type="primary" v-if="!isCheck" :disabled="submiting" @click="addRule">+添加规则</n-button>
    </n-card>
  </n-form>
  <n-button style="margin-top: 15px" block type="primary" @click="submit" :loading="submiting" :disabled="submiting" v-if="!isCheck && !commonStore.pageLoading">确认提交</n-button>
</template>

<style scoped lang="less"></style>
