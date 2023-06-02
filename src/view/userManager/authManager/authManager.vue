<script lang="ts">
// 框架
import { defineComponent, ref, onMounted, computed } from "vue";
import { useDialog } from "naive-ui";
// 组件
import layoutScrollCard from "@/component/common/layoutScrollCard.vue";
import roleCard from "./components/roleCard.vue";
import authTree from "./components/authTree.vue";
import customIcon from "@/component/common/customIcon.vue";
// 工具
import { commonNotify } from "@/util/common";
// 接口
import { getAuthRoles, getRoleAuth, delRole as delRoleRequest, addRole as addRoleRequest, editRole as editRoleRequest } from "@/request/auth";
// 数据
import { useCommonStore } from "@/store/commonStore";
// 类型
import type { Auths } from "@/type/Auth";
export default defineComponent({
  name: "authManager",
});
</script>

<script lang="ts" setup generic="T extends string">
// 公共业务
const dialog = useDialog();
const commonStore = useCommonStore();
const pageContentHeight = computed(() => {
  return commonStore.pageContentHeight + "px";
});

const roles = ref<{ id: number; name: string }[]>([]);
const authTreeData = ref<Auths>([]);
const activeRole = ref<number | null>(null);

const initAuthRoles = async () => {
  const res = await getAuthRoles();
  if (res) {
    roles.value = res.data;
  }
};
const changeAuthTreeData = async (id: number) => {
  activeRole.value = id;
  const res = await getRoleAuth({ id });
  if (res) {
    authTreeData.value = res.data;
  }
};

// 独立业务
const changeActiveRoleId = (id: number) => {
  activeRole.value = id;
  changeAuthTreeData(id);
};

// 编辑角色
const showRoleModal = ref(false);
const roleLoading = ref(false);
const roleInfo = ref<
  Partial<{
    title: string;
    name: string;
    id: number;
  }>
>({});
const editRole = (role?: { id: number; name: string }) => {
  roleInfo.value = {};
  showRoleModal.value = true;
  roleInfo.value.title = role ? "编辑角色" : "添加角色";
  if (role) {
    roleInfo.value.id = role.id;
    roleInfo.value.name = role.name;
  }
};
const comfirmAudit = async () => {
  const { id, name } = roleInfo.value;
  if (!name) return;
  roleLoading.value = true;
  const res = id ? await editRoleRequest({ id, name }) : await addRoleRequest({ name });
  if (res) {
    commonNotify("success", id ? "编辑角色成功" : "添加角色成功");
    await initAuthRoles();
    // 下面为边界处理
    if (roles.value.length === 1 && !id) {
      await changeAuthTreeData(roles.value[0].id);
    }
    showRoleModal.value = false;
  }
  roleLoading.value = false;
};

const delRole = async (role: { id: number; name: string }) => {
  const dialogInfo = dialog.warning({
    title: "删除角色",
    content: `确认删除${role.name}吗？`,
    positiveText: "确认",
    onPositiveClick: async () => {
      dialogInfo.loading = true;
      const res = await delRoleRequest({ id: role.id });
      if (res) {
        await initAuthRoles();
        // 下面为边界处理
        if (roles.value.length === 0) {
          // 如果全部删完的情况
          activeRole.value = null;
          authTreeData.value = [];
        }
        if (role.id === activeRole.value && roles.value.length >= 1) {
          // 如果删除的是当前选中的角色并且角色列表还是有其它角色的情况
          await changeAuthTreeData(roles.value[0].id);
        }

        commonNotify("success", "角色删除成功");
      }
      dialogInfo.loading = false;
    },
  });
};

// 生命周期
onMounted(async () => {
  await initAuthRoles();
  if (roles.value.length >= 1) {
    await changeAuthTreeData(roles.value[0].id);
  }
});
</script>

<template>
  <div class="authManager">
    <layout-scroll-card class="auth-role">
      <n-button type="primary" block style="margin-bottom: 10px" @click="editRole()">添加角色</n-button>
      <role-card v-for="(item, key) in roles" :key="key" :role="item" :activeRole="activeRole" @changeActiveRoleId="changeActiveRoleId" @editRole="editRole" @delRole="delRole">
      </role-card>
    </layout-scroll-card>
    <n-card class="auth-list" content-style="display: flex; flex-direction: column; height: 100%">
      <auth-tree :authTreeData="authTreeData" :activeRole="activeRole"></auth-tree>
    </n-card>
  </div>

  <n-modal :show="showRoleModal" @update:show="(state: boolean) => (showRoleModal = state)">
    <n-card style="width: 600px" :title="roleInfo.title" :bordered="false" size="huge" role="dialog" aria-modal="true">
      <template #header-extra>
        <custom-icon name="guanbi" :size="16" @click="showRoleModal = false"></custom-icon>
      </template>

      <n-form label-placement="left" label-width="80px" label-align="left">
        <n-form-item label="角色名:">
          <n-input v-model:value="roleInfo.name"></n-input>
        </n-form-item>
      </n-form>

      <template #footer>
        <div style="display: flex; justify-content: end">
          <n-button type="primary" inline-block @click="comfirmAudit" :disabled="roleLoading" :loading="roleLoading">确认</n-button>
        </div>
      </template>
    </n-card>
  </n-modal>
</template>

<style scoped lang="less">
.authManager {
  height: v-bind("pageContentHeight");
  display: flex;
  .auth-role {
    width: 20%;
  }
  .auth-list {
    width: 0px;
    flex: 1;
  }
}
</style>
