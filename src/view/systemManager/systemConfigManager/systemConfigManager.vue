<template>
  <n-card>
    <screen-section @submitSearch="() => getList()" :searching="searching" :showDeploy="showDeploy"></screen-section>
  </n-card>
  <n-data-table :single-line="false" :columns="createColumns()" :data="list" :scroll-x="listXWidth" :max-height="listYHeight" :loading="searching"> </n-data-table>
  <input ref="inputDom" type="file" hidden @change="handleUpload" />
</template>

<script lang="ts">
// 框架
import { h, ref, defineComponent, computed } from "vue";
// 组件库
import { NEllipsis, NInput, NButton, NSpace, NImage } from "naive-ui";
// 自定义组件
import screenSection from "./screenSection.vue";
import commonUpload from "@/component/common/commonUpload.vue";
// 工具库
import { useFileNameFromURL } from "@ultra-man/noa";
// 自定义工具
import { useListNoPage, commonNotify, useBinaryToBase64 } from "@/util/common";
// 网络请求
import { uploadWCImg } from "@/request/common";
import { getSystemConfigList, editSystemConfig } from "@/request/system";
// store
import { ValueType } from "./systemConfigManagerStore";
// 类型
import type { VNode } from "vue";
import type { DataTableColumns } from "naive-ui";
import type { SystemConfigListItem } from "@/type/System";
import type { FileUpload } from "@/type/Common";
// 组件名
export default defineComponent({
  name: "systemConfigManager",
});
</script>

<script lang="ts" setup>
const inputDom = ref<null | HTMLInputElement>(null);
const currentRow = ref<null | SystemConfigListItem>(null);
// 列表项
const createColumns = () => {
  const list: DataTableColumns<SystemConfigListItem> = [
    {
      title: "描述",
      key: "description",
      align: "left",
      width: 120,
    },
    {
      title: "值",
      key: "value",
      align: "left",
      width: 160,
      render: (row) => {
        if ([ValueType.BASE64, ValueType.TEXT, ValueType.WXIMG].includes(row.valueType)) {
          return h(
            NEllipsis,
            {},
            {
              default: () => row.value || "-",
            }
          );
        } else {
          return h(NImage, {
            src: row.value,
            width: 100,
          });
        }
      },
    },
    {
      title: "新值",
      key: "newValue",
      align: "left",
      width: 160,
      render: (row) => {
        if (row.valueType === ValueType.TEXT) {
          // 纯文本
          return h(NInput, {
            value: row.newValue,
            onUpdateValue: (newValue) => {
              row.newValue = newValue;
            },
            placeholder: `请输入${row.description}`,
          });
        } else if (row.valueType === ValueType.IMG) {
          // 上传图片
          const fileList = ref<FileUpload[]>([]);
          if (row.newValue) {
            fileList.value.push({
              fileUrl: row.newValue,
              hashName: row.newValue,
            });
          }
          return h(commonUpload, {
            modelValue: fileList.value,
            type: "img",
            "onUpdate:modelValue": (list: FileUpload[]) => {
              if (list.length > 0) {
                row.newValue = list[0].fileUrl;
              }
            },
            max: 1,
            maxSize: 2,
          });
        } else if (row.valueType === ValueType.BASE64) {
          // 选择图片上传base64
          return [
            h(NInput, {
              value: row.newValue,
              disabled: true,
              placeholder: `请选择${row.description}`,
            }),
            h(
              NButton,
              {
                size: "small",
                type: "primary",
                secondary: true,
                onClick: () => {
                  inputDom.value?.click();
                  currentRow.value = row;
                },
              },
              {
                default: () => "选择文件",
              }
            ),
          ];
        } else if (row.valueType === ValueType.WXIMG) {
          // 选择图片上传到微信，保存返回的值
          return [
            h(NInput, {
              value: row.newValue,
              disabled: true,
              placeholder: `请选择${row.description}`,
            }),
            h(
              NButton,
              {
                size: "small",
                type: "primary",
                secondary: true,
                onClick: () => {
                  inputDom.value?.click();
                  currentRow.value = row;
                },
              },
              {
                default: () => "选择文件",
              }
            ),
          ];
        }
      },
    },
    {
      title: "操作",
      key: "operaction",
      align: "center",
      width: 30,
      fixed: "right",
      render(row) {
        const list: VNode[] = [];
        const size = "small";
        const loading = ref(false);
        list.push(
          h(
            NButton,
            {
              size,
              type: "primary",
              secondary: true,
              loading: loading.value,
              onClick: async () => {
                loading.value = true;
                const resNewValue = [ValueType.TEXT, ValueType.BASE64, ValueType.WXIMG].includes(row.valueType) ? row.newValue : useFileNameFromURL(row.newValue)(true);
                const res = await editSystemConfig({ key: row.key, newValue: resNewValue });
                if (res) {
                  commonNotify("success", "系统配置保存成功");
                }
                loading.value = false;
              },
            },
            {
              default: () => "保存新值",
            }
          )
        );

        // 用来放按钮的容器
        const btnBox = h(NSpace, {}, { default: () => list });
        return btnBox;
      },
    },
  ];
  return list;
};

const { getList, list, listXWidth, listYHeight, searching } = useListNoPage(getSystemConfigList, createColumns);

// 选择文件并计算base64或者上传到微信
const handleUpload = async (event: any) => {
  const file = event.target?.files[0];
  if (file) {
    if (currentRow.value?.valueType === ValueType.BASE64) {
      const base64 = await useBinaryToBase64(file);
      console.log(base64);
      currentRow.value.newValue = base64;
    } else if (currentRow.value?.valueType === ValueType.WXIMG) {
      const res = await uploadWCImg(file);
      res.data ? (currentRow.value.newValue = res.data) : null;
    }
    if (inputDom.value) (inputDom.value as HTMLInputElement).value = "";
  }
};

const showDeploy = computed(() => {
  for (const item of list.value) {
    if (item.key === "mall:config:block_chain:contract:address" && item.value) {
      return false;
    }
  }
  return true;
});
</script>

<style scoped lang="less"></style>
