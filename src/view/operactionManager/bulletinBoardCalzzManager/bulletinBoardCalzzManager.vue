<template>
  <section class="category-container">
    <layout-scroll-card v-for="(activeCategory, index) in activeCategoryList" :key="index" class="category-list">
      <n-button secondary type="primary" @click="handleUpdate(index)" block style="margin-bottom: 10px">添加{{ index + 1 }}级类目</n-button>

      <div
        v-for="(item, i) in activeCategory"
        :key="i"
        class="category"
        :class="{ activeCategory: i === activeCategoryIndexList[index], hiddenCategory: item.state === 0 }"
        @click="selectCategory(index, i)"
      >
        <n-tooltip placement="top" trigger="hover">
          <template #trigger>
            <custom-icon name="yanjing_yincang" :size="18" @click="handleHidden(index, i, 1)" v-if="item.state === 0"></custom-icon>
            <custom-icon name="yanjing_xianshi" :size="18" @click="handleHidden(index, i, 0)" v-else></custom-icon>
          </template>
          <span v-if="item.state === 0"> 显示 </span>
          <span v-else> 隐藏 </span>
        </n-tooltip>
        <span class="category-name">{{ item.name }}</span>
        <div class="options-icon" @click.stop>
          <n-tooltip placement="top" trigger="hover">
            <template #trigger>
              <custom-icon name="xiugaimingcheng" :size="18" @click="handleUpdate(index, i)"></custom-icon>
            </template>
            <span> 编辑 </span>
          </n-tooltip>

          <n-tooltip placement="top" trigger="hover">
            <template #trigger>
              <custom-icon name="shanchu" :size="18" @click="handleDelete(index, i)"></custom-icon>
            </template>
            <span> 删除 </span>
          </n-tooltip>
        </div>
      </div>
    </layout-scroll-card>
  </section>

  <!-- 改变商品类目的modal -->
  <n-modal :show="showUpdateCategoryModal" @update:show="(state: boolean) => (showUpdateCategoryModal = state)">
    <n-card style="width: 600px" :title="updateCategoryInfo.id ? '编辑类目' : '添加类目'" :bordered="false" size="huge" role="dialog" aria-modal="true">
      <template #header-extra>
        <custom-icon name="guanbi" :size="16" @click="showUpdateCategoryModal = false"></custom-icon>
      </template>

      <n-form label-placement="left" label-width="80px" label-align="left">
        <n-form-item label="类目名称:">
          <n-input v-model:value="updateCategoryInfo.name" :disabled="updateCategoryLoading"></n-input>
        </n-form-item>
      </n-form>

      <template #footer>
        <div style="display: flex; justify-content: end">
          <n-button
            type="primary"
            inline-block
            @click="comfirmUpdateCategory"
            :disabled="updateCategoryLoading || updateCategoryInfo.name.length < 1"
            :loading="updateCategoryLoading"
            >确认</n-button
          >
        </div>
      </template>
    </n-card>
  </n-modal>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "bulletinBoardCalzzManager",
});
</script>
<script lang="ts" setup>
// 框架
import { computed, onBeforeMount, ref, reactive } from "vue";
// 组件库
import { useDialog } from "naive-ui";
// 自定义组件
import layoutScrollCard from "@/component/common/layoutScrollCard.vue";
import customIcon from "@/component/common/customIcon.vue";
// 工具库
// 自定义工具
import { commonNotify } from "@/util/common";
// 网络请求
import {
  getCategoryTree as getCategoryTreeRequest,
  deleteCategory as deleteCategoryRequest,
  editCategory as editCategoryRequest,
  updateCategoryState as updateCategoryStateRequest,
} from "@/request/common";
// store
import { useCommonStore } from "@/store/commonStore";
// 类型
import type { CategoryTreeItem } from "@/type/Common";
import type * as Requestparams from "@/request/type/RequestParam";
import { CategoryType } from "@/type/Common";

const dialog = useDialog();

// 需要固定高度的页面初始化将页面高度固定为页面容器的高度
const commonStore = useCommonStore();
const pageContentHeight = computed(() => {
  return commonStore.pageContentHeight + "px";
});

// 类目树
const categoryTree = ref<CategoryTreeItem[]>([]);
// 当前类目list
const activeCategoryList = reactive<CategoryTreeItem[][]>([]);
// 当前类目indexList
const activeCategoryIndexList = reactive<number[]>([0, 0]);

//初始化需要渲染的数据
const initActiveCategoryList = (categoryList: CategoryTreeItem[]) => {
  if (categoryList && categoryList.length >= 1) {
    // 每次初始化清一下数据
    if (categoryList[0].level === 1) {
      activeCategoryList.length = 0;
    }
    activeCategoryList.push(categoryList);
    // 根据activeCategoryIndexList获取需要展示的list
    const activeIndex = activeCategoryIndexList[categoryList[0].level - 1]; // 第几列的第几行
    const activeCategoryChild = categoryList[activeIndex]?.child || []; // 第几行的child
    initActiveCategoryList(activeCategoryChild);
  } else if (activeCategoryList.length < activeCategoryIndexList.length) {
    activeCategoryList.push(categoryList);
  }
};

// 获取类目树
const getCategoryTree = async () => {
  const res = await getCategoryTreeRequest(CategoryType.NOTICE);
  if (res) {
    categoryTree.value = res.data;
    initActiveCategoryList(categoryTree.value);
  }
};

// 选中类目index第几列，i第几个
const selectCategory = (index: number, i: number) => {
  console.log(activeCategoryList);
  if (activeCategoryIndexList[index] === i) return;
  // 选中一个其他类目时,除了将其设为活跃类目，还要将其子类目的第一个类目设为活跃类目
  activeCategoryIndexList[index] = i;
  for (let j = 0; j < activeCategoryIndexList.length; j++) {
    if (j > index) {
      activeCategoryIndexList.splice(j, 1, 0);
    }
  }
  initActiveCategoryList(categoryTree.value);
};

// 对类目的操作
const showUpdateCategoryModal = ref(false);
const updateCategoryLoading = ref(false);
const updateCategoryInfo = reactive<Requestparams.EditCategory>({
  id: null,
  name: "",
  order: null,
  parentId: null,
  type: null,
});
const handleUpdate = (index?: number, i?: number) => {
  if (index !== undefined && index >= 0 && i !== undefined && i >= 0) {
    const { id, name, order, parentId, type } = activeCategoryList[index][i];
    updateCategoryInfo.id = id;
    updateCategoryInfo.name = name;
    updateCategoryInfo.order = order;
    updateCategoryInfo.parentId = parentId;
    updateCategoryInfo.type = type;
  } else if (index !== undefined && index >= 0) {
    let parentId = 0;
    if (index >= 1) {
      parentId = activeCategoryList[index - 1][activeCategoryIndexList[index - 1]].id;
    }
    updateCategoryInfo.id = null;
    updateCategoryInfo.name = "";
    updateCategoryInfo.order = 1;
    updateCategoryInfo.type = CategoryType.NOTICE;
    updateCategoryInfo.parentId = parentId;
  }
  showUpdateCategoryModal.value = true;
};
const comfirmUpdateCategory = async () => {
  updateCategoryLoading.value = true;
  const res = await editCategoryRequest(updateCategoryInfo);
  if (res) {
    await getCategoryTree();
    commonNotify("success", `${updateCategoryInfo.id ? "编辑类目" : "添加类目"}成功`);
    showUpdateCategoryModal.value = false;
  }
  updateCategoryLoading.value = false;
};
// 类目删除操作
const handleDelete = (index: number, i: number) => {
  const category = activeCategoryList[index][i];
  const dialogInfo = dialog.warning({
    title: "删除类目",
    content: `确认删除${category.name}吗？`,
    positiveText: "确认",
    onPositiveClick: async () => {
      dialogInfo.loading = true;
      const res = await deleteCategoryRequest({ id: category.id });
      if (res) {
        await getCategoryTree();
        commonNotify("success", "类目删除成功");
      }
      dialogInfo.loading = false;
    },
  });
};
// 显示和隐藏
const handleHidden = (index: number, i: number, state: number) => {
  const category = activeCategoryList[index][i];
  const actionText = state === 1 ? "显示" : "隐藏";
  const dialogInfo = dialog.warning({
    title: `${actionText}类目`,
    content: `确认${actionText + category.name}吗？`,
    positiveText: "确认",
    onPositiveClick: async () => {
      dialogInfo.loading = true;
      const res = await updateCategoryStateRequest({ id: category.id, state });
      if (res) {
        await getCategoryTree();
        commonNotify("success", `类目${actionText}成功`);
      }
      dialogInfo.loading = false;
    },
  });
};

onBeforeMount(async () => {
  commonStore.pageLoading = true;
  await getCategoryTree();
  commonStore.pageLoading = false;
});
</script>

<style scoped lang="less">
.category-container {
  height: v-bind("pageContentHeight");
  display: flex;
  .category-list {
    width: 50%;
    .category {
      position: relative;
      height: 35px;
      line-height: 35px;
      cursor: pointer;
      padding: 0 50px 0 10px;
      display: flex;
      align-items: center;
      .category-name {
        margin-left: 2px;
        flex: 1;
        width: 0;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .options-icon {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 10px;
        display: none;
      }
      &:hover {
        color: var(--primary-color);
        background-color: var(--active-hover-color);
        .options-icon {
          display: block;
        }
      }
    }

    .hiddenCategory {
      color: var(--font-color-hidden);
    }
    .activeCategory {
      color: var(--primary-color);
    }
  }
}
</style>
