<template>
  <n-form label-placement="left" label-width="120px" label-align="left">
    <n-card title="基本信息：" style="margin-bottom: 15px">
      <n-form-item label="商品类目:" required>
        <category-select
          placeholder="请选择商品类目"
          v-model="goodsCategoryInfoList"
          :default-value="goodsInfo.spu.classifies[goodsInfo.spu.classifies.length - 1]"
          :disabled="formDisabled || editTypeLimit"
        ></category-select>
      </n-form-item>
      <n-form-item label="商品名称:" required>
        <n-input placeholder="请输入商品名称" v-model:value="goodsInfo.spu.goodsName" :disabled="formDisabled || editTypeLimit"></n-input>
      </n-form-item>
      <n-form-item label="商品描述:">
        <n-input placeholder="请输入商品描述，最多1024个字" v-model:value="goodsInfo.spu.goodsDes" type="textarea" :disabled="formDisabled || editTypeLimit"></n-input>
      </n-form-item>
      <n-form-item label="商品详情:" required>
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
      <n-form-item label="商品封面:" required>
        <common-upload type="img" v-model="goodsCoverList" :max="1" :disabled="formDisabled || editTypeLimit"></common-upload>
      </n-form-item>
      <n-form-item label="商品图片:" required>
        <common-upload type="img" v-model="goodsImagesList" :max="6" :disabled="formDisabled || editTypeLimit"></common-upload>
      </n-form-item>
      <n-form-item label="商品视频:">
        <common-upload type="video" v-model="goodsVideoList" :max="1" :disabled="formDisabled || editTypeLimit" :maxSize="100"></common-upload>
      </n-form-item>
      <n-form-item label="视频封面:">
        <common-upload type="img" v-model="goodsVideoCoverList" :max="1" :disabled="formDisabled || editTypeLimit"></common-upload>
      </n-form-item>
      <n-form-item label="商品价格:" required>
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
      <n-form-item label="代币标准:" required>
        <n-select
          v-model:value="goodsInfo.spu.ercStandard"
          :options="ercStandardList"
          placeholder="请选择代币标准"
          :style="{ width: inputWidth }"
          clearable
          :disabled="formDisabled || editTypeLimit"
        />
      </n-form-item>
      <n-form-item label="商品总量:" required>
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
      <n-form-item label="商品类型:" required>
        <n-select
          v-model:value="goodsInfo.extend.goodsType"
          :options="goodsTypeList"
          placeholder="请选择商品类型"
          :disabled="goodsStateChangeDisabled || formDisabled"
          :style="{ width: inputWidth }"
          clearable
        />
      </n-form-item>
      <n-form-item label="盲盒奖品等级:" v-if="goodsInfo.extend.goodsType === GoodsType.BLIND_BOX_PRIZE" required>
        <n-select
          v-model:value="goodsInfo.extend.goodsLevel"
          :options="goodsLevelList"
          placeholder="请选择商品等级"
          :style="{ width: inputWidth }"
          clearable
          :disabled="formDisabled"
        />
      </n-form-item>
      <n-form-item label="销售开始时间:" required>
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
      <n-form-item label="销售方式:" required>
        <n-select
          placeholder="请选择销售方式"
          v-model:value="goodsInfo.extend.saleType"
          :options="saleTypeList"
          :style="{ width: inputWidth }"
          clearable
          :disabled="formDisabled"
        />
      </n-form-item>
      <n-form-item label="优先购价格:" v-if="goodsInfo.extend.saleType !== SaleType.NOAMAL" required>
        <n-input-number placeholder="请输入优先购价格" v-model:value="goodsInfo.extend.priorityPrice" :min="minPrice" :style="{ width: inputWidth }" :disabled="formDisabled">
          <template #suffix> 元 </template></n-input-number
        >
      </n-form-item>
      <n-form-item label="特殊销售转正常销售时间:" v-if="goodsInfo.extend.saleType !== SaleType.NOAMAL" required>
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
      <n-form-item label="规则计算名单时间:" v-if="goodsInfo.extend.saleType === SaleType.RULES" required>
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
      <n-form-item label="限购数量:" required>
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
      <n-form-item label="提货类型:" required>
        <n-select
          v-model:value="goodsInfo.extend.expressType"
          :options="expresList"
          placeholder="请选择提货类型"
          :style="{ width: inputWidth }"
          clearable
          :disabled="formDisabled"
        />
      </n-form-item>
      <n-form-item label="提货开始时间:" v-if="goodsInfo.extend.expressType === ExpressType.YES">
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
      <n-form-item label="提货结束时间:" v-if="goodsInfo.extend.expressType === ExpressType.YES">
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
      <n-form-item label="交易推广是否统计:" required>
        <n-select
          v-model:value="goodsInfo.extend.tradeAmountType"
          :options="tradeAmountTypes"
          placeholder="请选择交易推广是否统计"
          :style="{ width: inputWidth }"
          clearable
          :disabled="formDisabled"
        />
      </n-form-item>
      <n-form-item label="溯源哈希:">
        <n-input v-model:value="goodsInfo.extend.traceHash" placeholder="请输入溯源哈希" :disabled="formDisabled"></n-input>
      </n-form-item>
      <n-form-item label="标记类型:" required>
        <n-select
          v-model:value="goodsInfo.extend.goodsTabType"
          :options="goodsTabList"
          placeholder="请选择标记类型"
          :style="{ width: inputWidth }"
          clearable
          :disabled="formDisabled"
        />
      </n-form-item>
      <n-form-item label="积分抵扣:" required v-if="[GoodsType.COMMON, GoodsType.BLIND_BOX].includes(goodsInfo.extend.goodsType || GoodsType.COMMON)">
        <n-select
          v-model:value="goodsInfo.extend.pointsDeductionType"
          :options="pointsDeductionTypeList"
          placeholder="请选择是否可抵扣"
          :style="{ width: inputWidth }"
          clearable
          :disabled="formDisabled"
        />
      </n-form-item>
      <n-form-item label="优惠券:" required v-if="[GoodsType.COMMON, GoodsType.BLIND_BOX].includes(goodsInfo.extend.goodsType || GoodsType.COMMON)">
        <n-select
          v-model:value="goodsInfo.extend.pointsCouponType"
          :options="pointsDeductionTypeList"
          placeholder="请选择是否可使用"
          :style="{ width: inputWidth }"
          clearable
          :disabled="formDisabled"
        />
      </n-form-item>
    </n-card>

    <n-card
      title="积分抵扣："
      v-if="goodsInfo.extend.pointsDeductionType === AntinomyTypes.YES && [GoodsType.COMMON, GoodsType.BLIND_BOX].includes(goodsInfo.extend.goodsType || GoodsType.COMMON)"
      style="margin-bottom: 15px"
    >
      <n-form-item label="积分类型:" required>
        <n-select :options="pointsTypeList" v-model:value="goodsInfo.deductionPoints.pointsType" :disabled="formDisabled" placeholder="请选择积分类型"></n-select>
      </n-form-item>
      <n-form-item label="积分编号:" required v-if="goodsInfo.deductionPoints.pointsType === PointsType.POINTS">
        <n-space vertical>
          <pointsSelect
            v-model:points-select-list="deductionPointsSelectList"
            :max="1"
            :disabled="formDisabled"
            :multiple="true"
            :pointsStates="[PointsState.PUBLISH_SUCCESS]"
          ></pointsSelect>
          <n-space v-for="(i, k) in deductionPointsSelectList" :key="k">
            <n-input :value="String(i.pointsId)" placeholder="请选择积分" :disabled="true"></n-input>
            <n-input :value="i.pointsName" placeholder="请选择积分" :disabled="true"></n-input>
          </n-space>
        </n-space>
      </n-form-item>
      <n-form-item label="平行链代币:" required v-if="goodsInfo.deductionPoints.pointsType === PointsType.COIN">
        <n-space vertical>
          <parallelCoinSelect v-model:parallel-coin-select-list="deductionCoinSelectList" :max="1" :disabled="submiting" :multiple="true"></parallelCoinSelect>
          <n-space v-for="(i, k) in deductionCoinSelectList" :key="k">
            <n-input :value="String(i.coinId)" placeholder="请选择代币" :disabled="true"></n-input>
            <n-input :value="i.coinName" placeholder="请选择代币" :disabled="true"></n-input>
          </n-space>
        </n-space>
      </n-form-item>
      <n-form-item label="最多使用数量:" required>
        <n-input-number v-model:value="goodsInfo.deductionPoints.needNum" placeholder="请输入最多使用数量" :min="1" :style="{ width: inputWidth }" :disabled="formDisabled">
          <template #suffix> 份 </template></n-input-number
        >
      </n-form-item>
      <n-form-item label="单价:" required>
        <n-input-number v-model:value="goodsInfo.deductionPoints.pointsPrice" placeholder="请输入积分单价" :min="1" :style="{ width: inputWidth }" :disabled="formDisabled">
          <template #suffix> 元 </template></n-input-number
        >
      </n-form-item>
    </n-card>

    <n-card
      title="优惠券抵扣："
      v-if="goodsInfo.extend.pointsCouponType === AntinomyTypes.YES && [GoodsType.COMMON, GoodsType.BLIND_BOX].includes(goodsInfo.extend.goodsType || GoodsType.COMMON)"
      style="margin-bottom: 15px"
    >
      <n-form-item label="积分类型:" required>
        <n-select :options="pointsTypeList" v-model:value="goodsInfo.couponPoints.pointsType" :disabled="formDisabled" placeholder="请选择积分类型"></n-select>
      </n-form-item>
      <n-form-item label="积分编号:" required v-if="goodsInfo.couponPoints.pointsType === PointsType.POINTS">
        <n-space vertical>
          <pointsSelect
            v-model:points-select-list="couponPointsSelectList"
            :max="1"
            :disabled="formDisabled"
            :multiple="true"
            :pointsStates="[PointsState.PUBLISH_SUCCESS]"
          ></pointsSelect>
          <n-space v-for="(i, k) in couponPointsSelectList" :key="k">
            <n-input :value="String(i.pointsId)" placeholder="请选择积分" :disabled="true"></n-input>
            <n-input :value="i.pointsName" placeholder="请选择积分" :disabled="true"></n-input>
          </n-space>
        </n-space>
      </n-form-item>
      <n-form-item label="平行链代币:" required v-if="goodsInfo.couponPoints.pointsType === PointsType.COIN">
        <n-space vertical>
          <parallelCoinSelect v-model:parallel-coin-select-list="couponCoinSelectList" :max="1" :disabled="submiting" :multiple="true"></parallelCoinSelect>
          <n-space v-for="(i, k) in couponCoinSelectList" :key="k">
            <n-input :value="String(i.coinId)" placeholder="请选择代币" :disabled="true"></n-input>
            <n-input :value="i.coinName" placeholder="请选择代币" :disabled="true"></n-input>
          </n-space>
        </n-space>
      </n-form-item>
      <n-form-item label="最多使用数量:" required>
        <n-input-number v-model:value="goodsInfo.couponPoints.needNum" placeholder="请输入最多使用数量" :min="1" :style="{ width: inputWidth }" :disabled="formDisabled">
          <template #suffix> 份 </template></n-input-number
        >
      </n-form-item>
      <n-form-item label="单价:" required>
        <n-input-number v-model:value="goodsInfo.couponPoints.pointsPrice" placeholder="请输入积分单价" :min="1" :style="{ width: inputWidth }" :disabled="formDisabled">
          <template #suffix> 元 </template></n-input-number
        >
      </n-form-item>
    </n-card>

    <n-card title="积分商品所需积分：" v-if="goodsInfo.extend.goodsType === GoodsType.POINT" style="margin-bottom: 15px">
      <n-form-item label="积分类型:" required>
        <n-select :options="pointsTypeList" v-model:value="goodsInfo.points.pointsType" :disabled="formDisabled" placeholder="请选择积分类型"></n-select>
      </n-form-item>
      <n-form-item label="积分编号:" required v-if="goodsInfo.points.pointsType === PointsType.POINTS">
        <n-space vertical>
          <pointsSelect
            v-model:points-select-list="pointsSelectList"
            :max="1"
            :disabled="formDisabled"
            :multiple="true"
            :pointsStates="[PointsState.PUBLISH_SUCCESS]"
          ></pointsSelect>
          <n-space v-for="(i, k) in pointsSelectList" :key="k">
            <n-input :value="String(i.pointsId)" placeholder="请选择积分" :disabled="true"></n-input>
            <n-input :value="i.pointsName" placeholder="请选择积分" :disabled="true"></n-input>
          </n-space>
        </n-space>
      </n-form-item>
      <n-form-item label="平行链代币:" required v-if="goodsInfo.points.pointsType === PointsType.COIN">
        <n-space vertical>
          <parallelCoinSelect v-model:parallel-coin-select-list="coinSelectList" :max="1" :disabled="submiting" :multiple="true"></parallelCoinSelect>
          <n-space v-for="(i, k) in coinSelectList" :key="k">
            <n-input :value="String(i.coinId)" placeholder="请选择代币" :disabled="true"></n-input>
            <n-input :value="i.coinName" placeholder="请选择代币" :disabled="true"></n-input>
          </n-space>
        </n-space>
      </n-form-item>
      <n-form-item label="所需数量:" required>
        <n-input-number
          v-model:value="goodsInfo.points.needNum"
          placeholder="请输入所需积分数量"
          :min="1"
          :style="{ width: inputWidth }"
          :disabled="formDisabled"
          :pointsStates="[PointsState.PUBLISH_SUCCESS]"
        >
          <template #suffix> 份 </template></n-input-number
        >
      </n-form-item>
    </n-card>

    <n-card title="商品可兑换积分：" v-if="goodsInfo.extend.exchangePointsType === AntinomyTypes.YES" style="margin-bottom: 15px">
      <n-form-item label="积分编号:" required>
        <n-space vertical>
          <pointsSelect v-if="!isCheck" v-model:points-select-list="pointsExchangeSelectList" :max="1" :disabled="formDisabled" :multiple="true"></pointsSelect>
          <n-space v-for="(i, k) in pointsExchangeSelectList" :key="k">
            <n-input :value="String(i.pointsId)" placeholder="请选择积分" :disabled="true"></n-input>
            <n-input :value="i.pointsName" placeholder="请选择积分" :disabled="true"></n-input>
          </n-space>
        </n-space>
      </n-form-item>
      <n-form-item label="可兑换数量:" required>
        <n-input-number v-model:value="goodsInfo.exchangePoints.needNum" placeholder="请输入所需积分数量" :min="1" :style="{ width: inputWidth }" :disabled="formDisabled">
          <template #suffix> 份 </template></n-input-number
        >
      </n-form-item>
    </n-card>

    <n-card title="规则：" v-if="goodsInfo.extend.saleType === SaleType.RULES" style="margin-bottom: 15px">
      <n-card v-for="(item, key) in goodsInfo.rules" :key="key" :title="`规则${key + 1}${ruleFormula(item).value}`" style="margin-bottom: 15px">
        <n-form-item label="规则类型:" required>
          <n-select
            @update:value="ruleItemTypeChange(item)"
            v-model:value="item.itemType"
            :options="ruleTypeList"
            placeholder="请选择规则类型"
            :style="{ width: inputWidth }"
            clearable
            :disabled="formDisabled"
          />
        </n-form-item>
        <n-form-item label="商品类目:" v-if="[RuleType.HOLD_CATEGORY, RuleType.EXTENSION_CATEGORY].includes(Number(item.itemType))" required>
          <category-select
            @update:model-value="(categoryList) => (item.itemId = String(categoryList[categoryList.length - 1].id))"
            placeholder="请选择商品类目"
            v-model="item.categoryList"
            check-type="all"
            :default-value="Number(item.itemId) || undefined"
            :disabled="formDisabled"
          ></category-select>
        </n-form-item>
        <n-form-item label="商品编号:" v-if="[RuleType.HOLD_GOODS, RuleType.EXTENSION_GOODS].includes(Number(item.itemType))" required>
          <n-input placeholder="请输入商品编号" v-model:value="item.itemId" :disabled="formDisabled"></n-input>
        </n-form-item>
        <n-form-item label="持有天数类型:" v-if="[RuleType.HOLD_GOODS, RuleType.HOLD_CATEGORY].includes(Number(item.itemType))" required>
          <n-select
            :options="holdTypes"
            v-model:value="item.holdType"
            @update:value="(value) => ruleHoldTypeChange(value, item)"
            placeholder="请选择持有天数类型"
            :disabled="formDisabled"
            clearable
          ></n-select>
        </n-form-item>
        <n-form-item label="单位数量:" required v-if="item.itemType !== RuleType.NEW_REAL_NAME">
          <n-input-number
            v-model:value="item.holdNum"
            placeholder="请输入奖励所需的单位数量"
            :min="1"
            :style="{ width: inputWidth }"
            :disabled="
              formDisabled ||
              ([HoldType.BUY_TIME, HoldType.GET_TIME].includes(Number(item.holdType)) && [RuleType.HOLD_GOODS, RuleType.HOLD_CATEGORY].includes(Number(item.itemType)))
            "
          >
            <template #suffix> 份 </template></n-input-number
          >
        </n-form-item>
        <n-form-item label="奖励数量:" required>
          <n-input-number v-model:value="item.unitNum" placeholder="请输入每单位数量奖励数量" :min="1" :style="{ width: inputWidth }" :disabled="formDisabled">
            <template #suffix> 份 </template></n-input-number
          >
        </n-form-item>

        <n-form-item
          label="持有天数:"
          v-if="[RuleType.HOLD_GOODS, RuleType.HOLD_CATEGORY].includes(Number(item.itemType)) && [HoldType.BUY_TIME, HoldType.GET_TIME].includes(Number(item.holdType))"
          required
        >
          <n-input-number v-model:value="item.holdDay" placeholder="请输入持有天数" :min="1" style="width: 100%"><template #suffix> 天 </template></n-input-number>
        </n-form-item>

        <n-form-item
          label="持有天数计算类型:"
          v-if="[RuleType.HOLD_GOODS, RuleType.HOLD_CATEGORY].includes(Number(item.itemType)) && [HoldType.BUY_TIME, HoldType.GET_TIME].includes(Number(item.holdType))"
          required
        >
          <n-select :options="holdDayTypes" v-model:value="item.holdDayType" placeholder="请选择持有天数计算类型" :disabled="formDisabled" clearable></n-select>
        </n-form-item>
        <n-form-item
          label="上限数量:"
          required
          v-if="
            !(
              ([RuleType.HOLD_GOODS, RuleType.HOLD_CATEGORY].includes(Number(item.itemType)) && [HoldType.BUY_TIME, HoldType.GET_TIME].includes(Number(item.holdType))) ||
              item.itemType === RuleType.NEW_REAL_NAME
            )
          "
        >
          <n-input-number v-model:value="item.limitNum" placeholder="请输入上限数量，0表示无上限" :min="0" :style="{ width: inputWidth }" :disabled="formDisabled">
            <template #suffix> 份 </template></n-input-number
          >
        </n-form-item>
        <n-form-item
          label="开始时间:"
          v-if="[RuleType.EXTENSION_REAL_NAME, RuleType.NEW_REAL_NAME, RuleType.EXTENSION_CATEGORY, RuleType.EXTENSION_GOODS].includes(item.itemType || 0)"
          required
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
          v-if="[RuleType.EXTENSION_REAL_NAME, RuleType.NEW_REAL_NAME, RuleType.EXTENSION_CATEGORY, RuleType.EXTENSION_GOODS].includes(item.itemType || 0)"
          required
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
import pointsSelect from "@/component/pointsSelect/pointsSelect.vue";
import parallelCoinSelect from "@/component/parallelCoinSelect/parallelCoinSelect.vue";

// 工具库
import { useFileNameFromURL } from "@ultra-man/noa";
// 自定义工具
import { commonNotify } from "@/util/common";
// 网络请求
import {
  goodsSubmit as goodsSubmitRequest,
  getGoodsDetail as getGoodsDetailRequest,
  goodsEdit as goodsEditRequest,
  updateGoodsExtend as updateGoodsExtendRequest,
} from "@/request/goods";
// store
import {
  ercStandardList,
  goodsLevelList,
  expresList,
  goodsTabList,
  ruleTypeList,
  ExpressType,
  RuleType,
  ExchangePointsTypeList,
  pointsTypeList,
  PointsType,
  pointsDeductionTypeList,
  holdTypes,
  holdDayTypes,
  HoldType,
  tradeAmountTypes,
} from "./goodsDetailManagerStore";
import { PointsState } from "@/view/pointsManager/pointsListManager/pointsListManagerStore";
import { GoodsType, goodsTypeList, SaleType, saleTypeList, EditType } from "../goodsListManager/goodsListManagerStore";
import { useCommonStore } from "@/store/commonStore";
import { useRouteStore } from "@/store/routeStore";
// 类型
import type { GoodsAddParams } from "@/type/GoodsManager";
import type { CategoryTreeItem, FileUpload } from "@/type/Common";
import { AntinomyTypes } from "@/type/Common";
import { GoodsState } from "@/view/goodsManager/goodsListManager/goodsListManagerStore";

type PointsSelectItem = {
  pointsId: string;
  pointsName: string;
};

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

const goodsCategoryInfoList = ref<CategoryTreeItem[]>([]);
const goodsCoverList = ref<FileUpload[]>([]);
const goodsImagesList = ref<FileUpload[]>([]);
const goodsVideoList = ref<FileUpload[]>([]);
const goodsVideoCoverList = ref<FileUpload[]>([]);
const pointsSelectList = ref<PointsSelectItem[]>([]);
const pointsExchangeSelectList = ref<PointsSelectItem[]>([]);
const coinSelectList = ref<{ coinId: string; coinName: string }[]>([]);

const deductionPointsSelectList = ref<PointsSelectItem[]>([]);
const deductionCoinSelectList = ref<{ coinId: string; coinName: string }[]>([]);

const couponPointsSelectList = ref<PointsSelectItem[]>([]);
const couponCoinSelectList = ref<{ coinId: string; coinName: string }[]>([]);

const goodsInfo = reactive<GoodsAddParams>({
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
    exchangePointsType: AntinomyTypes.NOT,
    traceHash: "",
    tradeAmountType: null,
    pointsDeductionType: AntinomyTypes.NOT,
    pointsCouponType: AntinomyTypes.NOT,
  },
  points: {
    goodsId,
    needNum: null,
    pointsId: null,
    pointsType: null,
  },
  exchangePoints: {
    goodsId,
    needNum: null,
    pointsId: null,
  },

  rules: [
    {
      endTime: null,
      itemId: null,
      limitNum: null,
      startTime: null,
      itemType: null,
      unitNum: null,
      categoryList: [], // 工具属性
      holdDay: null,
      holdDayType: null,
      holdNum: 1,
      holdType: null,
    },
  ],
  deductionPoints: {},
  couponPoints: {},
});

// 编辑和查看初始化数据
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

const initForm = (goodsDetail: GoodsAddParams) => {
  const { spu, extend, rules, points, exchangePoints, deductionPoints, couponPoints } = goodsDetail;
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
  // 如果是积分商品
  if (extend.goodsType === GoodsType.POINT) {
    if (points.pointsType === PointsType.POINTS) {
      pointsSelectList.value = [
        {
          pointsId: points.pointsId || "",
          pointsName: points.pointsName || "",
        },
      ];
    }

    if (points.pointsType === PointsType.COIN) {
      coinSelectList.value = [
        {
          coinId: points.pointsId || "",
          coinName: points.pointsName || "",
        },
      ];
    }
  }

  // 如果可用积分抵扣
  if (extend.pointsDeductionType === AntinomyTypes.YES && [GoodsType.COMMON, GoodsType.BLIND_BOX].includes(extend.goodsType || GoodsType.COMMON)) {
    if (deductionPoints.pointsType === PointsType.POINTS) {
      deductionPointsSelectList.value = [
        {
          pointsId: deductionPoints.pointsId || "",
          pointsName: deductionPoints.pointsName || "",
        },
      ];
    }

    if (deductionPoints.pointsType === PointsType.COIN) {
      deductionCoinSelectList.value = [
        {
          coinId: deductionPoints.pointsId || "",
          coinName: deductionPoints.pointsName || "",
        },
      ];
    }
    goodsInfo.deductionPoints = { ...deductionPoints, needNum: Number(deductionPoints.needNum) };
  }

  // 如果可用优惠券
  if (extend.pointsCouponType === AntinomyTypes.YES && [GoodsType.COMMON, GoodsType.BLIND_BOX].includes(extend.goodsType || GoodsType.COMMON)) {
    if (couponPoints.pointsType === PointsType.POINTS) {
      couponPointsSelectList.value = [
        {
          pointsId: couponPoints.pointsId || "",
          pointsName: couponPoints.pointsName || "",
        },
      ];
    }

    if (couponPoints.pointsType === PointsType.COIN) {
      couponCoinSelectList.value = [
        {
          coinId: couponPoints.pointsId || "",
          coinName: couponPoints.pointsName || "",
        },
      ];
    }
    goodsInfo.couponPoints = { ...couponPoints, needNum: Number(couponPoints.needNum) };
  }

  // 如果商品可兑换成积分
  if (extend.exchangePointsType === AntinomyTypes.YES) {
    pointsExchangeSelectList.value = [
      {
        pointsId: exchangePoints.pointsId || "",
        pointsName: exchangePoints.pointsName || "",
      },
    ];
  }
  goodsInfo.spu = spu;
  goodsInfo.extend = extend;
  goodsInfo.rules = rules;
  goodsInfo.points = points;
  goodsInfo.exchangePoints = exchangePoints || { goodsId, needNum: null, pointsId: null };

  if (goodsInfo.points) goodsInfo.points.needNum = Number(goodsInfo.points?.needNum);
  if (goodsInfo.exchangePoints) goodsInfo.exchangePoints.needNum = Number(goodsInfo.exchangePoints?.needNum);
};

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
    itemId: null,
    limitNum: null,
    startTime: null,
    itemType: null,
    unitNum: null,
    categoryList: [],
    holdDay: null,
    holdDayType: null,
    holdNum: 1,
    holdType: null,
  });
};
const deleteRuleHandler = (index: number) => {
  if (goodsInfo.rules.length <= 1) {
    commonNotify("warning", "不能少于一条规则！");
  } else {
    goodsInfo.rules.splice(index, 1);
  }
};
const ruleFormula = (rule: GoodsAddParams["rules"][number]) => {
  return computed(() => {
    let message = "计算公式：";
    if ([RuleType.HOLD_GOODS, RuleType.HOLD_CATEGORY].includes(Number(rule.itemType))) {
      if (rule.holdType === HoldType.NONE) {
        message = message + `商品实际持有数量 / 单位数量(${rule.holdNum || 0}) * 奖励数量(${rule.unitNum || 0})`;
        if (rule.limitNum && rule.limitNum > 0) {
          message = message + `，最多不超过奖励上限数量(${rule.limitNum})`;
        }
      }
      if ([HoldType.BUY_TIME, HoldType.GET_TIME].includes(Number(rule.holdType))) {
        if (rule.holdDayType === AntinomyTypes.NOT) {
          message = message + `商品token实际持有天数 / 持有天数(${rule.holdDay || 0}) * 奖励数量(${rule.unitNum || 0})`;
        }
        if (rule.holdDayType === AntinomyTypes.YES) {
          message = message + `如果商品token实际持有天数 >= 持有天数(${rule.holdDay || 0})，则奖励数量(${rule.unitNum || 0})，否则不奖励`;
        }
      }
    }
    if ([RuleType.EXTENSION_REAL_NAME].includes(Number(rule.itemType))) {
      message = message + `推广且实名人数 / 单位数量(${rule.holdNum || 0}) * 奖励数量(${rule.unitNum || 0})`;
      if (rule.limitNum && rule.limitNum > 0) {
        message = message + `，最多不超过奖励上限数量(${rule.limitNum})`;
      }
    }
    if ([RuleType.NEW_REAL_NAME].includes(Number(rule.itemType))) {
      message = message + `新用户注册且实名，则奖励数量(${rule.unitNum || 0})`;
    }

    return message;
  });
};
const ruleItemTypeChange = (rule: GoodsAddParams["rules"][number]) => {
  rule.holdNum = 1;
};
const ruleHoldTypeChange = (value: number | null, rule: GoodsAddParams["rules"][number]) => {
  if (value && value > 0) {
    rule.holdNum = 1;
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

  // 如果可用积分抵扣
  if (goodsInfo.extend.pointsDeductionType === AntinomyTypes.YES && [GoodsType.COMMON, GoodsType.BLIND_BOX].includes(goodsInfo.extend.goodsType || GoodsType.COMMON)) {
    if (goodsInfo.deductionPoints.pointsType === PointsType.POINTS) {
      goodsInfo.deductionPoints.pointsId = deductionPointsSelectList.value[0]?.pointsId;
      goodsInfo.deductionPoints.pointsName = deductionPointsSelectList.value[0]?.pointsName;
    }

    if (goodsInfo.deductionPoints.pointsType === PointsType.COIN) {
      goodsInfo.deductionPoints.pointsId = deductionCoinSelectList.value[0]?.coinId;
      goodsInfo.deductionPoints.pointsName = deductionCoinSelectList.value[0]?.coinName;
    }
  }

  // 如果可用优惠券
  if (goodsInfo.extend.pointsCouponType === AntinomyTypes.YES && [GoodsType.COMMON, GoodsType.BLIND_BOX].includes(goodsInfo.extend.goodsType || GoodsType.COMMON)) {
    if (goodsInfo.couponPoints.pointsType === PointsType.POINTS) {
      goodsInfo.couponPoints.pointsId = couponPointsSelectList.value[0]?.pointsId;
      goodsInfo.couponPoints.pointsName = couponPointsSelectList.value[0]?.pointsName;
    }

    if (goodsInfo.couponPoints.pointsType === PointsType.COIN) {
      goodsInfo.couponPoints.pointsId = couponCoinSelectList.value[0]?.coinId;
      goodsInfo.couponPoints.pointsName = couponCoinSelectList.value[0]?.coinName;
    }
  }

  // 如果是积分商品
  if (goodsInfo.extend.goodsType === GoodsType.POINT) {
    if (goodsInfo.points.pointsType === PointsType.POINTS) {
      goodsInfo.points.pointsId = pointsSelectList.value[0]?.pointsId;
      goodsInfo.points.pointsName = pointsSelectList.value[0]?.pointsName;
    }

    if (goodsInfo.points.pointsType === PointsType.COIN) {
      goodsInfo.points.pointsId = coinSelectList.value[0]?.coinId;
      goodsInfo.points.pointsName = coinSelectList.value[0]?.coinName;
    }
  }

  // 如果商品可兑换成积分
  if (goodsInfo.extend.exchangePointsType === AntinomyTypes.YES) {
    goodsInfo.exchangePoints.pointsId = pointsExchangeSelectList.value[0]?.pointsId;
    goodsInfo.exchangePoints.pointsName = pointsExchangeSelectList.value[0]?.pointsName;
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
