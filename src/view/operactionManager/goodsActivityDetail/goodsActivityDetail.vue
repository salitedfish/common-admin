<script lang="ts">
// 框架
import { defineComponent, ref, onMounted, createVNode } from "vue";
import { useRoute, useRouter } from "vue-router";
// 组件库
import { NButton, NInputNumber, NSelect, NSpace, NInput } from "naive-ui";
// 自定义组件
import goodsSelect from "@/component/common/goodsSelect.vue";
import pointsSelect from "@/component/pointsSelect/pointsSelect.vue";
import parallelCoinSelect from "@/component/parallelCoinSelect/parallelCoinSelect.vue";
// 工具库
// 自定义工具
import { commonNotify } from "@/util/common";
// 网络请求
import { getGoodsActivityDetail, addGoodsActivityDetail, updateGoodsActivityDetail } from "@/request/operator";
// store
import { useCommonStore } from "@/store/commonStore";
import { useRouteStore } from "@/store/routeStore";
import {
  // switchToView,
  // switchToAPI,
  rewardTypeList,
  RewardType,
  goodsActivityTimeTypeList,
  GoodsActivityTimeType,
  provideTypes,
  tradeTypes,
  UserTypes,
  unitTypes,
  vipTypes,
  TradeType,
  UnitType,
} from "./goodsActivityDetailStore";
// 类型
import type { VNode } from "vue";
import type { DataTableColumns } from "naive-ui";
import { DetailCheckType } from "@/type/Common";
import { GoodsState } from "@/view/goodsManager/goodsListManager/goodsListManagerStore";
import { PointsState } from "@/view/pointsManager/pointsListManager/pointsListManagerStore";
import { GoodsActivityIdentity } from "@/view/operactionManager/goodsActivityManager/goodsActivityManagerStore";
import type { GoodsActivityRule, GoodsActivityDetailAPI } from "@/type/Operator";
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

// 商品选择列表
const goodsList = ref<{ goodsId: string | number; goodsName: string }[]>([]);
// 列表数据
const goodsActivityDetail = ref<GoodsActivityDetailAPI>({
  info: {},
  rules: [],
});

// 规则的角色表格
const createColumns = () => {
  const list: DataTableColumns<GoodsActivityRule> = [
    {
      title: "角色",
      key: "type",
      align: "center",
      width: 120,
      render: (rule) => {
        return createVNode(NSelect, {
          placeholder: "请选择角色类型",
          options: UserTypes,
          value: rule.userType,
          onUpdateValue: (newValue: number) => {
            rule.userType = newValue;
          },
          disabled: submiting.value || isCheck,
        });
      },
    },
    {
      title: "交易类型",
      key: "type",
      align: "center",
      width: 120,
      render: (rule) => {
        return createVNode(NSelect, {
          placeholder: "请选择交易类型",
          options: tradeTypes,
          value: rule.tradeType,
          onUpdateValue: (newValue: number) => {
            rule.tradeType = newValue;
            if (newValue === TradeType.NUM) {
              rule.unitType = UnitType.FIXED;
            }
          },
          disabled: submiting.value || isCheck,
        });
      },
    },
    {
      title: "释放类型",
      key: "type",
      align: "center",
      width: 120,
      render: (rule) => {
        return createVNode(NSelect, {
          placeholder: "请选择释放类型",
          options: provideTypes,
          value: rule.provideType,
          onUpdateValue: (newValue: number) => {
            rule.provideType = newValue;
          },
          disabled: submiting.value || isCheck,
        });
      },
    },
    {
      title: "奖励类型",
      key: "type",
      align: "center",
      width: 120,
      render: (rule) => {
        return createVNode(NSelect, {
          placeholder: "请选择奖励类型",
          options: rewardTypeList,
          value: rule.rewardType,
          onUpdateValue: (newValue: number) => {
            rule.rewardType = newValue;
          },
          disabled: submiting.value || isCheck,
        });
      },
    },
    {
      title: "奖励物品",
      key: "type",
      align: "center",
      width: 180,
      render: (rule) => {
        const { rewardType } = rule;
        if (rewardType === RewardType.GOODS) {
          return createVNode(NSpace, { justify: "center" }, () => [
            createVNode(NInput, { disabled: true, value: rule.rewardGoods.length > 0 ? rule.rewardGoods[0].goodsName : null, placeholder: "请选择商品" }),
            createVNode(goodsSelect, {
              goodsSelectedList: rule.rewardGoods,
              "onUpdate:goodsSelectedList": (newValue: { goodsId: string; goodsName: string }[]) => {
                rule.rewardGoods = newValue;
              },
              max: 1,
              goodsStates: [GoodsState.TO_BE_SHELVES, GoodsState.ON_THE_SHELF],
              disabled: submiting.value || isCheck,
            }),
          ]);
        } else if (rewardType === RewardType.POINTS) {
          return createVNode(NSpace, { justify: "center" }, () => [
            createVNode(NInput, { disabled: true, value: rule.rewardPoints.length > 0 ? rule.rewardPoints[0].pointsName : null, placeholder: "请选择积分" }),
            createVNode(pointsSelect, {
              pointsSelectList: rule.rewardPoints,
              "onUpdate:pointsSelectList": (newValue: { pointsId: string; pointsName: string }[]) => {
                rule.rewardPoints = newValue;
              },
              max: 1,
              pointsStates: [PointsState.PUBLISH_SUCCESS],
              disabled: submiting.value || isCheck,
            }),
          ]);
        } else if (rewardType === RewardType.COINS) {
          return createVNode(NSpace, { justify: "center" }, () => [
            createVNode(NInput, { disabled: true, value: rule.rewardCoin.length > 0 ? rule.rewardCoin[0].coinName : null, placeholder: "请选择代币" }),
            createVNode(parallelCoinSelect, {
              parallelCoinSelectList: rule.rewardCoin,
              "onUpdate:parallelCoinSelectList": (newValue: { coinId: string; coinName: string }[]) => {
                rule.rewardCoin = newValue;
              },
              max: 1,
              disabled: submiting.value || isCheck,
            }),
          ]);
        } else {
          return "-";
        }
      },
    },

    {
      title: "积分/代币的单价",
      key: "type",
      align: "center",
      width: 120,
      render: (rule) => {
        if ([RewardType.COINS, RewardType.POINTS].includes(rule.rewardType)) {
          return createVNode(NInputNumber, {
            placeholder: `请输入${rewardTypeList.getItem(rule.rewardType)?.label}的单价`,
            min: 0,
            value: rule.rewardPrice,
            onUpdateValue: (newValue: number) => {
              rule.rewardPrice = newValue;
            },
            disabled: submiting.value || isCheck,
          });
        } else {
          return "-";
        }
      },
    },

    {
      title: "梯度金额/数量（小于）",
      key: "type",
      align: "center",
      width: 180,
      render: (rule) => {
        return createVNode(NInputNumber, {
          placeholder: "请输入梯度金额/数量",
          min: 0,
          value: rule.belowOrderNum,
          onUpdateValue: (newValue: number) => {
            rule.belowOrderNum = newValue;
          },
          disabled: submiting.value || isCheck,
        });
      },
    },

    {
      title: "奖励数量类型",
      key: "type",
      align: "center",
      width: 120,
      render: (rule) => {
        return createVNode(NSelect, {
          placeholder: "请选择奖励数量类型",
          options: unitTypes,
          value: rule.unitType,
          onUpdateValue: (newValue: number) => {
            rule.unitType = newValue;
          },
          disabled: submiting.value || isCheck || rule.tradeType === TradeType.NUM,
        });
      },
    },

    {
      title: "每买一个的总奖励数量/比例",
      key: "type",
      align: "center",
      width: 140,
      render: (rule) => {
        return createVNode(
          NInputNumber,
          {
            placeholder: `请输入每买一个的${rule.unitType === UnitType.FIXED ? "数量" : "比例"}`,
            min: 0,
            max: rule.unitType === UnitType.FIXED ? null : 100,
            value: rule.totalUnitAmount,
            onUpdateValue: (newValue: number) => {
              rule.totalUnitAmount = newValue;
            },

            disabled: submiting.value || isCheck,
          },
          { default: () => "333" }
        );
      },
    },

    {
      title: "每次释放数量/比例",
      key: "type",
      align: "center",
      width: 120,
      render: (rule) => {
        return createVNode(NInputNumber, {
          placeholder: `请输入每次释放${rule.unitType === UnitType.FIXED ? "数量" : "比例"}`,
          min: 0,
          max: rule.unitType === UnitType.FIXED ? null : 100,
          value: rule.unitAmount,
          onUpdateValue: (newValue: number) => {
            rule.unitAmount = newValue;
          },
          disabled: submiting.value || isCheck,
        });
      },
    },

    {
      title: "推广人邀请层级",
      key: "type",
      align: "center",
      width: 120,
      render: (rule) => {
        return rule.userType === GoodsActivityIdentity.SHARE
          ? createVNode(NInputNumber, {
              placeholder: "请输入推广人邀请层级",
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
      title: "vip类型",
      key: "type",
      align: "center",
      width: 120,
      render: (rule) => {
        return createVNode(NSelect, {
          placeholder: "请选择vip类型",
          options: vipTypes,
          value: rule.vipType,
          onUpdateValue: (newValue: number) => {
            rule.vipType = newValue;
          },
          disabled: submiting.value || isCheck,
        });
      },
    },

    {
      title: "最低vip等级",
      key: "type",
      align: "center",
      width: 120,
      render: (rule) => {
        return createVNode(NInputNumber, {
          placeholder: "请输入最低vip等级",
          min: 0,
          value: rule.minVipLevel,
          onUpdateValue: (newValue: number) => {
            rule.minVipLevel = newValue;
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
        list.push(
          createVNode(
            NButton,
            {
              type,
              size,
              secondary: true,
              onClick: () => {
                delRuleMan(index);
              },
              disabled: submiting.value,
            },
            {
              default: () => "-删除规则角色",
            }
          )
        );

        return list;
      },
    });
  }
  return list;
};

// 新增规则角色
const addRuleMan = () => {
  goodsActivityDetail.value.rules.push({
    rewardGoods: [],
    rewardPoints: [],
    rewardCoin: [],
  });
};
// 删除规则角色
const delRuleMan = (index: number) => {
  goodsActivityDetail.value.rules.splice(index, 1);
};

// 提交数据
const submiting = ref(false);
const submit = async () => {
  const submitRequest = checkType === DetailCheckType.EDIT ? updateGoodsActivityDetail : addGoodsActivityDetail;
  const tip = checkType === DetailCheckType.EDIT ? "编辑" : "新增";
  submiting.value = true;
  goodsActivityDetail.value.info.goodsId = String(goodsList.value[0]?.goodsId);
  for (const item of goodsActivityDetail.value.rules) {
    const { rewardType } = item;
    // 如果奖励是商品
    if (rewardType === RewardType.GOODS) {
      item.rewardId = String(item.rewardGoods ? item.rewardGoods[0]?.goodsId : "");
    }
    // 如果奖励是积分
    if (rewardType === RewardType.POINTS) {
      item.rewardId = String(item.rewardPoints ? item.rewardPoints[0]?.pointsId : "");
    }
    // 如果奖励是代币
    if (rewardType === RewardType.COINS) {
      item.rewardId = String(item.rewardCoin ? item.rewardCoin[0]?.coinId : "");
    }
  }

  // 如果是编辑还需要赋值id
  if ([DetailCheckType.EDIT].includes(checkType)) {
    goodsActivityDetail.value.info.id = Number(id);
  }
  const res = await submitRequest(goodsActivityDetail.value);
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
    goodsActivityDetail.value = res.data;
    const { goodsId, goodsName } = goodsActivityDetail.value.info;
    goodsList.value = [
      {
        goodsId: goodsId || "",
        goodsName: goodsName || "",
      },
    ];
    for (const item of goodsActivityDetail.value.rules) {
      const { rewardType, rewardId, rewardName } = item;
      item.rewardGoods = [];
      item.rewardPoints = [];
      item.rewardCoin = [];
      // 如果奖励是商品
      if (rewardType === RewardType.GOODS) {
        item.rewardGoods = [
          {
            goodsId: rewardId || "",
            goodsName: rewardName || "",
          },
        ];
      }
      // 如果奖励是积分
      if (rewardType === RewardType.POINTS) {
        item.rewardPoints = [
          {
            pointsId: rewardId || "",
            pointsName: rewardName || "",
          },
        ];
      }
      // 如果奖励是代币
      if (rewardType === RewardType.COINS) {
        item.rewardCoin = [
          {
            coinId: rewardId || "",
            coinName: rewardName || "",
          },
        ];
      }
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
      <n-data-table :single-line="false" :columns="createColumns()" :data="goodsActivityDetail.rules" :scroll-x="3600"></n-data-table>

      <n-button style="margin-top: 15px" block tertiary type="primary" v-if="!isCheck" :disabled="submiting" @click="addRuleMan()">+添加规则角色</n-button>
    </n-card>
  </n-form>
  <n-button style="margin-top: 15px" block type="primary" @click="submit" :loading="submiting" :disabled="submiting" v-if="!isCheck && !commonStore.pageLoading">确认提交</n-button>
</template>

<style scoped lang="less"></style>
