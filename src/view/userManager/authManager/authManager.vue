<script lang="ts">
// 框架
import { defineComponent, ref, reactive, onMounted } from "vue";
// 组件
// 工具
// 接口
// 数据
// 类型
export default defineComponent({
  name: "authManager",
});
</script>

<script lang="ts" setup generic="T extends string">
// 定义
// withDefaults(
//   defineProps<{
//     name: string;
//     sex?: T;
//   }>(),
//   {
//     name: "",
//   }
// );
// defineEmits<{
//   foo: [id: number];
// }>();
// 公共业务
const data = ref(null);

// 独立业务

// 生命周期
onMounted(() => {
  null;
});
</script>

<template>
  <div class="authManager">authManager</div>
</template>

<style scoped lang="less">
.authManager {
}
</style>
