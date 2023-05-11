<script lang="ts">
// 框架
import { defineComponent, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
// 组件库
// 自定义组件
// 工具库
// 自定义工具
// 网络请求
import { getOrderPromoDetail } from "@/request/order";
// store
import { useCommonStore } from "@/store/commonStore";
import {
  provideTypes,
  rewardTypeList,
  goodsActivityTimeTypeList,
  GoodsActivityTimeType,
  UserTypes,
  vipTypes,
  ProvideType,
} from "@/view/operactionManager/goodsActivityDetail/goodsActivityDetailStore";
// 类型
import type { DataTableColumns } from "naive-ui";
import type { OrderPromoDetail } from "@/type/Order";
// 组件名
export default defineComponent({
  name: "orderPromoDetail",
});
</script>

<script lang="ts" setup>
const route = useRoute();
const commonStore = useCommonStore();

const orderPromoDetail = ref<OrderPromoDetail[]>([]);

const createColumns = () => {
  const list: DataTableColumns<OrderPromoDetail> = [
    {
      title: "营销名称",
      key: "type",
      align: "center",
      width: 120,
      render: (rule) => {
        return rule.promoName;
      },
    },
    {
      title: "用户编号",
      key: "uid",
      align: "center",
      width: 120,
    },
    {
      title: "用户类型",
      key: "uid",
      align: "center",
      width: 120,
      render: (rule) => {
        return UserTypes.getItem(rule.userType)?.label;
      },
    },
    {
      title: "推广人邀请层级",
      key: "type",
      align: "center",
      width: 120,
      render: (rule) => {
        return rule.inviteLevel;
      },
    },
    {
      title: "vip类型",
      key: "vipLevel",
      align: "center",
      width: 120,
      render: (rule) => {
        return vipTypes.getItem(rule.vipType)?.label;
      },
    },
    {
      title: "vip等级",
      key: "vipLevel",
      align: "center",
      width: 120,
    },

    {
      title: "发放类型",
      key: "type",
      align: "center",
      width: 120,
      render: (rule) => {
        return provideTypes.getItem(rule.provideType)?.label;
      },
    },
    {
      title: "奖励类型",
      key: "type",
      align: "center",
      width: 120,
      render: (rule) => {
        return rewardTypeList.getItem(rule.rewardType)?.label;
      },
    },
    {
      title: "奖励名称",
      key: "rewardName",
      align: "center",
      width: 120,
    },
    {
      title: "总释放数量",
      key: "totalUnitNum",
      align: "center",
      width: 120,
    },
    {
      title: "每次释放数量",
      key: "unitNum",
      align: "center",
      width: 120,
    },
    {
      title: "开始释放时间",
      key: "startTime",
      align: "center",
      width: 120,
    },
    {
      title: "执行时间类型",
      key: "startTime",
      align: "center",
      width: 120,
      render: (rule) => {
        if (rule.provideType === ProvideType.COMMON) {
          return "-";
        }
        return goodsActivityTimeTypeList.getItem(rule.timeType)?.label;
      },
    },
    {
      title: "执行日",
      key: "startTime",
      align: "center",
      width: 120,
      render: (rule) => {
        if (rule.provideType === ProvideType.COMMON) {
          return "-";
        }
        if (rule.timeType === GoodsActivityTimeType.DAY) {
          return "每天";
        } else if (rule.timeType === GoodsActivityTimeType.WEEK) {
          return `周${rule.timeDay}`;
        } else if (rule.timeType === GoodsActivityTimeType.MONTH) {
          return `${rule.timeDay}号`;
        }
      },
    },
    {
      title: "执行时间",
      key: "startTime",
      align: "center",
      width: 120,
      render: (rule) => {
        if (rule.provideType === ProvideType.COMMON) {
          return "-";
        }
        return `${rule.timeHour}时`;
      },
    },
  ];
  return list;
};

const init = async () => {
  commonStore.pageLoading = true;
  const res = await getOrderPromoDetail({ orderId: route.query.orderId as string });
  if (res) {
    orderPromoDetail.value = res.data;
  }
  commonStore.pageLoading = false;
};

onMounted(() => {
  init();
});
</script>

<template>
  <n-form v-if="!commonStore.pageLoading" label-placement="left" label-width="130px" label-align="left" :disabled="true">
    <n-card title="" style="margin-bottom: 15px">
      <n-data-table :single-line="false" :columns="createColumns()" :data="orderPromoDetail" :scroll-x="2400"></n-data-table>
    </n-card>
  </n-form>
</template>

<style scoped lang="less"></style>
