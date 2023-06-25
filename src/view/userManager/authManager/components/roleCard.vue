<script lang="ts">
// 框架
import { defineComponent, ref, reactive, onMounted } from "vue";
// 组件
import customIcon from "@/component/common/customIcon.vue";

// 工具
// 接口
// 数据
// 类型
export default defineComponent({
  name: "roleCard",
});
</script>

<script lang="ts" setup generic="T extends string">
// 定义
const props = withDefaults(
  defineProps<{
    role: { id: number; name: string };
    activeRole: null | number;
  }>(),
  {}
);
const emit = defineEmits<{
  (event: "changeActiveRoleId", id: number): void;
  (event: "editRole", role: { id: number; name: string }): void;
  (event: "delRole", role: { id: number; name: string }): void;
}>();
// 公共业务
const data = ref(null);

// 独立业务
const changeActiveRole = () => {
  emit("changeActiveRoleId", props.role.id);
};

const editRole = () => {
  emit("editRole", props.role);
};

const delRole = () => {
  emit("delRole", props.role);
};

// 生命周期
// onMounted(() => {});
</script>

<template>
  <div class="roleCard" :class="{ active: role.id === activeRole }" @click="changeActiveRole">
    <span class="name">{{ role.name }}</span>
    <div class="options-icon" @click.stop>
      <n-tooltip placement="top" trigger="hover">
        <template #trigger>
          <custom-icon name="xiugaimingcheng" :size="18" @click="editRole"></custom-icon>
        </template>
        <span> 编辑 </span>
      </n-tooltip>

      <n-tooltip placement="top" trigger="hover">
        <template #trigger>
          <custom-icon name="shanchu" :size="18" @click="delRole"></custom-icon>
        </template>
        <span> 删除 </span>
      </n-tooltip>
    </div>
  </div>
</template>

<style scoped lang="less">
.roleCard {
  position: relative;
  height: 35px;
  line-height: 35px;
  cursor: pointer;
  padding: 0 50px 0 10px;
  display: flex;
  align-items: center;
  .name {
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

.active {
  color: var(--primary-color);
}
</style>
