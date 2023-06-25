<script lang="ts">
// 框架
import { defineComponent, ref, reactive, onMounted, computed } from "vue";
import { useDialog } from "naive-ui";
// 组件
import layoutScrollCard from "@/component/common/layoutScrollCard.vue";

// 工具
import { commonNotify } from "@/util/common";
import { mapAuthIds } from "@/util/auth";
// 接口
import { updateRoleAuth } from "@/request/auth";
// 数据
// 类型
import type { TreeOption } from "naive-ui";
import type { Auths } from "@/type/Auth";
import { watch } from "vue";
export default defineComponent({
  name: "authTree",
});
</script>

<script lang="ts" setup generic="T extends string">
// 定义
const props = withDefaults(
  defineProps<{
    authTreeData: Auths;
    activeRole: number | null;
  }>(),
  {}
);
defineEmits<{
  (event: "submitAuthIds", ids: number[]): void;
}>();

const dialog = useDialog();
// 公共业务

// 独立业务
const checkedKeys = ref<number[]>([]);

watch(
  () => props.authTreeData,
  (newValue) => {
    checkedKeys.value = mapAuthIds(newValue);
  }
);

const updateCheckedKeys = (treeCheckedKeys: number[]) => {
  checkedKeys.value = treeCheckedKeys;
};

const submitAuthIds = () => {
  const dialogInfo = dialog.success({
    title: "修改权限",
    content: "确认修改权限吗？",
    positiveText: "确认",
    onPositiveClick: async () => {
      dialogInfo.loading = true;
      const ids = checkedKeys.value.filter((id) => id > 100000);
      const res = await updateRoleAuth({ id: props.activeRole as number, menuIds: ids });
      if (res) {
        commonNotify("success", "权限修改成功");
      }
      dialogInfo.loading = false;
    },
  });
};

// 生命周期
// onMounted(() => {});
</script>

<template>
  <div class="authTree">
    <n-button type="primary" block style="margin-bottom: 10px" @click="submitAuthIds" :disabled="!activeRole">点击修改权限</n-button>
    <div class="tree">
      <layout-scroll-card>
        <n-tree
          block-line
          cascade
          checkable
          :data="authTreeData"
          key-field="id"
          label-field="name"
          children-field="menu"
          :checked-keys="checkedKeys"
          @updateCheckedKeys="updateCheckedKeys"
        ></n-tree>
      </layout-scroll-card>
    </div>
  </div>
</template>

<style scoped lang="less">
.authTree {
  height: 0px;
  flex: 1;
  display: flex;
  flex-direction: column;
  .tree {
    height: 0;
    flex: 1;
  }
}
</style>
