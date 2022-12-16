<template>
  <n-card :title="`${name}`">
    <screen-section
      @submitSearch="submitSearch"
      :searching="searching"
      :id="id"
      :name="name"
      :downLoadRequest="downLoadWhiteListRequest"
      :whiteListType="whiteListType"
    ></screen-section>
  </n-card>
  <white-list :list="list" :searching="searching" :whiteListType="whiteListType"></white-list>
  <n-card>
    <n-pagination v-model:page="searchParam.page" :page-count="totalPage" @update:page="getList" />
  </n-card>
</template>

<script lang="ts" setup>
// 框架
import { onMounted, ref } from "vue";
// 组件库
// 自定义组件
import screenSection from "@/component/whiteList/screenSection.vue";
import whiteList from "@/component/whiteList/whiteList.vue";
// 工具库
// 自定义工具
// 网络请求
// store
// 类型
import type * as RequestParams from "@/request/type/RequestParam";
import type * as RequestReturn from "@/request/type/RequestReturn";
import type { WhiteListItem, WhiteListSearchParams } from "@/type/Common";

const props = defineProps<{
  id: string;
  name: string;
  downLoadWhiteListRequest: (params: { id: string }, whiteListType: number) => Promise<Blob>;
  getListRequest: (params: RequestParams.GetWhiteList, whiteListType: number) => RequestReturn.GetWhiteList;
  whiteListType: number;
}>();

// 筛选的参数
const searchParam = ref<RequestParams.GetWhiteList>({
  page: 1,
  size: 10,
});
// 整合筛选参数
const submitSearch = (params: WhiteListSearchParams) => {
  searchParam.value = { ...searchParam.value, ...params };
  getList();
};
// 数据总数
const totalPage = ref(0);
// 查询状态
const searching = ref(false);
// 展示的列表
const list = ref<WhiteListItem[]>([]);

const getList = async () => {
  searching.value = true;
  searchParam.value.id = props.id;
  const res = await props.getListRequest(searchParam.value, props.whiteListType);
  if (res) {
    list.value = res.data.data;
    totalPage.value = res.data.totalPage;
  }
  searching.value = false;
};

onMounted(() => {
  getList();
});
</script>

<style scoped lang="less"></style>
