<template>
  <div class="form">
    <n-form ref="formDom" :model="formData" :rules="formDataRules">
      <n-form-item label="主体类型" path="organizationType">
        <n-radio-group v-model:value="formData.organizationType">
          <n-space>
            <n-radio :label="item.label" :value="item.value" v-for="(item, index) in organizationTypes" :key="index" :disabled="submitLoading" />
          </n-space>
        </n-radio-group>
      </n-form-item>

      <n-divider v-show="formData.organizationType !== OrganizationTypes.MICRO" :disabled="submitLoading" />

      <section v-show="formData.organizationType !== OrganizationTypes.MICRO">
        <n-form-item label="营业执照" path="businessLicenseFileList">
          <n-upload
            list-type="image-card"
            accept="image/png, image/jpeg"
            :max="1"
            :action="uploadWCImgUrl"
            v-model:file-list="formData.businessLicenseFileList"
            :onFinish="
              (options) => {
                onUploadFinish(options, 'businessLicenseFileList');
              }
            "
            :with-credentials="true"
            :headers="{
              authentication: token,
            }"
            :disabled="submitLoading"
          >
          </n-upload>
        </n-form-item>
        <n-form-item label="营业执照注册号" path="businessLicenseNumber">
          <n-input class="form-input" placeholder="请输入营业执照注册号" v-model:value="formData.businessLicenseNumber" :disabled="submitLoading"></n-input>
        </n-form-item>
        <n-form-item label="营业执照/登记证书的商家名称" path="merchantName">
          <n-input
            class="form-input"
            placeholder="个体工商户，若营业执照上商户名称为空或为“无”，请填写“个体户+经营者姓名“，如“个体户张三”"
            v-model:value="formData.merchantName"
            :disabled="submitLoading"
          ></n-input>
        </n-form-item>
        <n-form-item label="经营者/法定代表人姓名" path="legalPerson">
          <n-input class="form-input" placeholder="请输入经营者/法定代表人姓名" v-model:value="formData.legalPerson" :disabled="submitLoading"></n-input>
        </n-form-item>
      </section>

      <n-divider />

      <n-form-item label="经营者/法人身份证姓名" path="idCardName">
        <n-input class="form-input" placeholder="请输入经营者/法人身份证姓名" v-model:value="formData.idCardName" :disabled="submitLoading"></n-input>
      </n-form-item>
      <n-form-item label="经营者/法人身份证号码" path="idCardNumber">
        <n-input class="form-input" placeholder="请输入经营者/法人身份证号码" v-model:value="formData.idCardNumber" :disabled="submitLoading"></n-input>
      </n-form-item>
      <n-form-item label="身份证人像面照片" path="idCardFrontImageFileList">
        <n-upload
          list-type="image-card"
          accept="image/png, image/jpeg"
          :max="1"
          :action="uploadWCImgUrl"
          v-model:file-list="formData.idCardFrontImageFileList"
          :onFinish="
            (options) => {
              onUploadFinish(options, 'idCardFrontImageFileList');
            }
          "
          :headers="{
            authentication: token,
          }"
          :with-credentials="true"
          :disabled="submitLoading"
        >
        </n-upload>
      </n-form-item>
      <n-form-item label="身份证国徽面照片" path="idCardBackImageFileList">
        <n-upload
          list-type="image-card"
          accept="image/png, image/jpeg"
          :max="1"
          :action="uploadWCImgUrl"
          v-model:file-list="formData.idCardBackImageFileList"
          :onFinish="
            (options) => {
              onUploadFinish(options, 'idCardBackImageFileList');
            }
          "
          :headers="{
            authentication: token,
          }"
          :with-credentials="true"
          :disabled="submitLoading"
        >
        </n-upload>
      </n-form-item>
      <n-form-item label="身份证开始时间" path="idCardStart">
        <n-date-picker v-model:value="formData.idCardStart" type="date" :disabled="submitLoading" />
      </n-form-item>
      <n-form-item label="身份证结束时间" path="idCardEnd">
        <n-date-picker v-model:value="formData.idCardEnd" type="date" :disabled="submitLoading" />
        <n-button @click="formData.idCardEnd = infinity" :disabled="submitLoading">长期有效</n-button>
      </n-form-item>
      <n-form-item label="身份证居住地址" path="idCardAddress">
        <n-input class="form-input" placeholder="请输入身份证居住地址" v-model:value="formData.idCardAddress" :disabled="submitLoading"></n-input>
      </n-form-item>

      <n-divider />

      <n-form-item label="账户类型" path="bankAccountType">
        <n-radio-group v-model:value="formData.bankAccountType">
          <n-space>
            <n-radio
              :disabled="formData.organizationType === OrganizationTypes.MICRO || submitLoading"
              :label="item.label"
              :value="item.value"
              v-for="(item, index) in bankAccountTypes"
              :key="index"
            />
          </n-space>
        </n-radio-group>
      </n-form-item>
      <n-form-item label="开户银行" path="accountBank">
        <n-select v-model:value="formData.accountBank" :options="accountBankList" placeholder="请选择开户银行" :disabled="submitLoading" clearable />

        <!-- <n-input class="form-input" placeholder="请输入开户银行" v-model:value="formData.accountBank" :disabled="submitLoading"></n-input> -->
      </n-form-item>
      <n-form-item label="开户名称" path="accountName">
        <n-input class="form-input" placeholder="请输入开户名称" v-model:value="formData.accountName" :disabled="submitLoading"></n-input>
      </n-form-item>
      <n-form-item label="银行账号" path="accountNumber">
        <n-input class="form-input" placeholder="请输入银行账号" v-model:value="formData.accountNumber" :disabled="submitLoading"></n-input>
      </n-form-item>
      <n-form-item label="开户银行省市区编号" path="bankAddressCode">
        <n-input class="form-input" placeholder="请输入开户银行省市区编号" v-model:value="formData.bankAddressCode" :disabled="submitLoading"></n-input>
        <n-button type="primary" @click="downLoadCityCodeRecord">下载《省市区编号对照表》</n-button>

        <!-- <n-cascader
          v-model:value="formData.bankAddressCode"
          :options="bankAddressCodes"
          check-strategy="child"
          :onLoad="getCities"
          remote
          :show-path="true"
          :disabled="submitLoading"
          placeholder="请选择开户银行省市"
        ></n-cascader> -->
      </n-form-item>
      <n-form-item label="开户银行全称" path="bankName">
        <n-input class="form-input" placeholder="请输入开户银行" v-model:value="formData.bankName" :disabled="submitLoading"></n-input>
        <n-button type="primary" @click="downloadLoadBankFullNameRecord">下载《开户银行全称（含支行）对照表》</n-button>
      </n-form-item>

      <n-divider />

      <n-form-item label="超级管理员类型" path="contactType">
        <n-radio-group v-model:value="formData.contactType">
          <n-space>
            <n-radio
              :disabled="formData.organizationType === OrganizationTypes.MICRO || submitLoading"
              :label="item.label"
              :value="item.value"
              v-for="(item, index) in contactTypes"
              :key="index"
            />
          </n-space>
        </n-radio-group>
      </n-form-item>
      <n-form-item label="超级管理员手机" path="contactPhone">
        <n-input class="form-input" placeholder="请输入超级管理员手机" v-model:value="formData.contactPhone" :disabled="submitLoading"></n-input>
      </n-form-item>
      <n-form-item label="超级管理员邮箱" path="contactEmail">
        <n-input class="form-input" placeholder="请输入超级管理员邮箱" v-model:value="formData.contactEmail" :disabled="submitLoading"></n-input>
      </n-form-item>
      <n-form-item label="超级管理员姓名" path="contactName">
        <n-input class="form-input" placeholder="请输入超级管理员姓名" v-model:value="formData.contactName" :disabled="submitLoading"></n-input>
      </n-form-item>
      <n-form-item label="超级管理员身份证件号码" path="contactIdCardNumber">
        <n-input class="form-input" placeholder="请输入超级管理员身份证件号码" v-model:value="formData.contactIdCardNumber" :disabled="submitLoading"></n-input>
      </n-form-item>
      <section v-show="formData.contactType === ContactTypes.OPERATOR">
        <n-form-item label="超级管理员证件正面照片" path="contactIdCardFrontImageFileList">
          <n-upload
            list-type="image-card"
            accept="image/png, image/jpeg"
            :max="1"
            :action="uploadWCImgUrl"
            v-model:file-list="formData.contactIdCardFrontImageFileList"
            :onFinish="
              (options) => {
                onUploadFinish(options, 'contactIdCardFrontImageFileList');
              }
            "
            :headers="{
              authentication: token,
            }"
            :with-credentials="true"
            :disabled="submitLoading"
          >
          </n-upload>
        </n-form-item>
        <n-form-item label="超级管理员证件反面照片" path="contactIdCardBackImageFileList">
          <n-upload
            list-type="image-card"
            accept="image/png, image/jpeg"
            :max="1"
            :action="uploadWCImgUrl"
            v-model:file-list="formData.contactIdCardBackImageFileList"
            :onFinish="
              (options) => {
                onUploadFinish(options, 'contactIdCardBackImageFileList');
              }
            "
            :headers="{
              authentication: token,
            }"
            :with-credentials="true"
            :disabled="submitLoading"
          >
          </n-upload>
        </n-form-item>
        <n-form-item label="超级管理员证件开始时间" path="contactIdCardStart">
          <n-date-picker v-model:value="formData.contactIdCardStart" type="date" :disabled="submitLoading" />
        </n-form-item>
        <n-form-item label="超级管理员证件结束时间" path="contactIdCardEnd">
          <n-date-picker v-model:value="formData.contactIdCardEnd" type="date" :disabled="submitLoading" />
          <n-button @click="formData.contactIdCardEnd = infinity" :disabled="submitLoading">长期有效</n-button>
        </n-form-item>
        <n-form-item label="业务办理授权函" path="businessAuthorizationLetterFileList">
          <n-upload
            :disabled="submitLoading"
            list-type="image-card"
            accept="image/png, image/jpeg"
            :max="1"
            :action="uploadWCImgUrl"
            v-model:file-list="formData.businessAuthorizationLetterFileList"
            :onFinish="
              (options) => {
                onUploadFinish(options, 'businessAuthorizationLetterFileList');
              }
            "
            :headers="{
              authentication: token,
            }"
            :with-credentials="true"
          >
          </n-upload>
        </n-form-item>
      </section>

      <n-divider />

      <n-form-item label="店铺名称" path="storeName">
        <n-input class="form-input" placeholder="请输入店铺名称" v-model:value="formData.storeName" :disabled="submitLoading"></n-input>
      </n-form-item>
      <n-form-item label="店铺简称" path="shortName">
        <n-input class="form-input" placeholder="请输入店铺简称，用于向用户展示" v-model:value="formData.shortName" :disabled="submitLoading" :maxlength="64"></n-input>
      </n-form-item>
      <n-form-item label="店铺描述" path="storeDescription">
        <n-input
          type="textarea"
          class="form-input"
          placeholder="请输入店铺描述，最多2048个字，用于向用户展示"
          v-model:value="formData.storeDescription"
          :disabled="submitLoading"
          :maxlength="21"
        ></n-input>
      </n-form-item>
      <n-form-item label="店铺地址" path="storeAddress">
        <n-input class="form-input" placeholder="请输入店铺地址，用于向用户展示" v-model:value="formData.storeAddress" :disabled="submitLoading"></n-input>
      </n-form-item>
      <n-form-item label="店铺联系方式" path="storeContact">
        <n-input class="form-input" placeholder="请输入店铺联系方式，用于向用户展示" v-model:value="formData.storeContact" :disabled="submitLoading"></n-input>
      </n-form-item>
      <n-form-item label="店铺证照" path="storeLicense" v-if="formData.organizationType !== OrganizationTypes.MICRO">
        <common-upload type="img" v-model="formData.storeLicense" :max="1" :disabled="submitLoading"></common-upload>
      </n-form-item>
    </n-form>
    <n-button @click="submitHandler" type="primary" block :loading="submitLoading" :disabled="submitLoading">提交</n-button>
  </div>
</template>

<script lang="ts" setup>
// 框架
import { reactive, ref, watch, onMounted } from "vue";
// 组件库
import type { FormInst, FormRules, FormItemRule, UploadFileInfo } from "naive-ui";
// 自定义组件
import CommonUpload from "@/component/common/commonUpload.vue";
// 工具库
import { usePhoneLegal, useIDCargLegal, useEmailLegal, useTimeFormat } from "@ultra-man/noa";
// store
import { accountBankList } from "./settleStore";

// 自定义工具
import { useBankAddressCodes, useNowTimeStamp, useInfinityTimeStamp, commonNotify, downLoadCityCodeRecord, downloadLoadBankFullNameRecord } from "@/util";
// 网络请求
import { uploadWCImgUrl } from "@/request/common";
import { submitMerchantInfo as submitMerchantInfoRequest, getAllowMicro } from "@/request/auth";
import type * as RequestParam from "@/request/type/RequestParam";
import type { FileUpload } from "@/type/Common";
import { OrganizationTypes } from "@/type/Auth";

const emit = defineEmits<{
  (event: "updateStep"): void;
}>();

const token = localStorage.getItem("token") || "";

// 获取hook数据
const now = useNowTimeStamp();
const infinity = useInfinityTimeStamp();
// const { bankAddressCodes, getCities } = useBankAddressCodes();

// 主体类型数据依据
const organizationTypes = ref([
  {
    label: "企业",
    value: OrganizationTypes.ENTERPRISE,
  },
  {
    label: "个体工商户",
    value: OrganizationTypes.INDIVIDUAL,
  },
]);

// 账户类型数据依据
enum BankAccountTypes {
  PUBLIC = 74,
  PRIVATE,
}
const bankAccountTypes = [
  { label: "对公账户", value: BankAccountTypes.PUBLIC },
  { label: "对私账户", value: BankAccountTypes.PRIVATE },
];

// 超级管理员类型数据依据
enum ContactTypes {
  LEGEL = 65,
  OPERATOR,
}
const contactTypes = [
  { label: "经营者/法人", value: ContactTypes.LEGEL },
  { label: "经办人", value: ContactTypes.OPERATOR },
];

// 表单元素
const formDom = ref<FormInst | null>(null);

// 表单数据
const formData = reactive({
  organizationType: organizationTypes.value[0].value,
  //
  businessLicenseFileList: [] as UploadFileInfo[],
  businessLicenseNumber: "",
  merchantName: "",
  legalPerson: "",
  //
  idCardName: "",
  idCardNumber: "",
  idCardFrontImageFileList: [] as UploadFileInfo[],
  idCardBackImageFileList: [] as UploadFileInfo[],
  idCardStart: now,
  idCardEnd: now,
  idCardAddress: "",
  //
  bankAccountType: bankAccountTypes[0].value,
  accountBank: undefined,
  accountName: "",
  accountNumber: "",
  bankAddressCode: "",
  bankName: "",
  //
  contactType: contactTypes[0].value,
  contactPhone: "",
  contactEmail: "",
  contactName: "",
  contactIdCardNumber: "",
  //
  contactIdCardFrontImageFileList: [] as UploadFileInfo[],
  contactIdCardBackImageFileList: [] as UploadFileInfo[],
  contactIdCardStart: now,
  contactIdCardEnd: now,
  businessAuthorizationLetterFileList: [] as UploadFileInfo[],
  //
  storeName: "",
  shortName: "",
  storeDescription: "",
  storeAddress: "",
  storeContact: "",
  storeLicense: [] as FileUpload[],
});
type FormDataType = typeof formData;
// 表单规则
const formDataRules: FormRules = {
  organizationType: [
    {
      required: true,
    },
  ],
  //
  businessLicenseFileList: [
    {
      required: true,
      validator(rule: FormItemRule, value: UploadFileInfo[]) {
        if (value.length <= 0 && formData.organizationType !== OrganizationTypes.MICRO) {
          return new Error("请上传营业执照！");
        }
        return true;
      },
      trigger: ["blur"],
    },
  ],
  businessLicenseNumber: [
    {
      required: true,
      validator(rule: FormItemRule, value: string) {
        if (!value && formData.organizationType !== OrganizationTypes.MICRO) {
          return new Error("请填写营业执照注册号！");
        }
        return true;
      },
      trigger: ["blur"],
    },
  ],
  merchantName: [
    {
      required: true,
      validator(rule: FormItemRule, value: string) {
        if (!value && formData.organizationType !== OrganizationTypes.MICRO) {
          return new Error("营业执照/登记证书的商家名称！");
        }
        return true;
      },
      trigger: ["blur"],
    },
  ],
  legalPerson: [
    {
      required: true,
      validator(rule: FormItemRule, value: string) {
        if (!value && formData.organizationType !== OrganizationTypes.MICRO) {
          return new Error("请填写经营者/法定代表人姓名！");
        }
        return true;
      },
      trigger: ["blur"],
    },
  ],
  //
  idCardName: [
    {
      required: true,
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error("请填写经营者/法人身份证姓名！");
        }
        return true;
      },
      trigger: ["blur"],
    },
  ],
  idCardNumber: [
    {
      required: true,
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error("请填写经营者/法人身份证号码！");
        } else if (!useIDCargLegal(value)()) {
          return new Error("请填写正确的身份证号码！");
        }
        return true;
      },
      trigger: ["blur"],
    },
  ],
  idCardFrontImageFileList: [
    {
      required: true,
      validator(rule: FormItemRule, value: UploadFileInfo[]) {
        if (value.length <= 0) {
          return new Error("请上传身份证人像照片！");
        }
        return true;
      },
      trigger: ["blur"],
    },
  ],
  idCardBackImageFileList: [
    {
      required: true,
      validator(rule: FormItemRule, value: UploadFileInfo[]) {
        if (value.length <= 0) {
          return new Error("请上传身份证国徽面照片！");
        }
        return true;
      },
      trigger: ["blur"],
    },
  ],
  idCardStart: [
    {
      required: true,
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error("请填写身份证开始时间！");
        }
        return true;
      },
      trigger: ["blur"],
    },
  ],
  idCardEnd: [
    {
      required: true,
      validator(rule: FormItemRule, value) {
        if (!value) {
          return new Error("请填写身份证结束时间！");
        } else if (value <= formData.idCardStart) {
          return new Error("身份证结束时间必须大于开始时间！");
        }
        return true;
      },
      trigger: ["blur"],
    },
  ],
  idCardAddress: [
    {
      required: true,
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error("请填写身份证居住地址！");
        }
        return true;
      },
      trigger: ["blur"],
    },
  ],
  //
  bankAccountType: [
    {
      required: true,
    },
  ],
  accountBank: [
    {
      required: true,
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error("请填写开户银行！");
        }
        return true;
      },
      trigger: ["blur"],
    },
  ],
  accountName: [
    {
      required: true,
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error("请填写开户名称！");
        }
        return true;
      },
      trigger: ["blur"],
    },
  ],
  accountNumber: [
    {
      required: true,
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error("请填写银行账号！");
        }
        return true;
      },
      trigger: ["blur"],
    },
  ],
  bankAddressCode: [
    {
      required: true,
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error("请输入银行省市区编号！");
        }
        return true;
      },
      trigger: ["blur"],
    },
  ],
  bankName: [
    {
      required: true,
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error("请填写开户银行全称！");
        }
        return true;
      },
      trigger: ["blur"],
    },
  ],
  //
  contactType: [
    {
      required: true,
    },
  ],
  contactPhone: [
    {
      required: true,
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error("请填写超级管理员手机！");
        } else if (!usePhoneLegal(value)()) {
          return new Error("请填写正确的手机号！");
        }
        return true;
      },
      trigger: ["blur"],
    },
  ],
  contactEmail: [
    {
      required: true,
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error("请填写超级管理员邮箱！");
        } else if (!useEmailLegal(value)()) {
          return new Error("请填写正确的邮箱！");
        }
        return true;
      },
      trigger: ["blur"],
    },
  ],
  contactName: [
    {
      required: true,
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error("请填写超级管理员姓名！");
        }
        return true;
      },
      trigger: ["blur"],
    },
  ],
  contactIdCardNumber: [
    {
      required: true,
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error("请填写超级管理员身份证件号码！");
        } else if (!useIDCargLegal(value)()) {
          return new Error("请填写正确的身份证号码！");
        }
        return true;
      },
      trigger: ["blur"],
    },
  ],

  //
  contactIdCardFrontImageFileList: [
    {
      required: true,
      validator(rule: FormItemRule, value: UploadFileInfo[]) {
        if (value.length <= 0 && formData.contactType === ContactTypes.OPERATOR) {
          return new Error("请上传超级管理员证件正面照片！");
        }
        return true;
      },
      trigger: ["blur"],
    },
  ],
  contactIdCardBackImageFileList: [
    {
      required: true,
      validator(rule: FormItemRule, value: UploadFileInfo[]) {
        if (value.length <= 0 && formData.contactType === ContactTypes.OPERATOR) {
          return new Error("请上传超级管理员证件反面照片！");
        }
        return true;
      },
      trigger: ["blur"],
    },
  ],
  contactIdCardStart: [
    {
      required: true,
      validator(rule: FormItemRule, value: string) {
        if (!value && formData.contactType === ContactTypes.OPERATOR) {
          return new Error("请选择超级管理员身份证件开始时间！");
        }
        return true;
      },
      trigger: ["blur"],
    },
  ],
  contactIdCardEnd: [
    {
      required: true,
      validator(rule: FormItemRule, value) {
        if (formData.contactType === ContactTypes.OPERATOR) {
          if (!value) {
            return new Error("请选择超级管理员身份证件结束时间！");
          } else if (value <= formData.contactIdCardStart) {
            return new Error("身份证结束时间必须大于开始时间！");
          }
        }
        return true;
      },
      trigger: ["blur"],
    },
  ],
  //
  storeName: [
    {
      required: true,
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error("请填写店铺名称！");
        }
        return true;
      },
      trigger: ["blur"],
    },
  ],
  shortName: [
    {
      required: true,
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error("请填写店铺简称！");
        }
        return true;
      },
      trigger: ["blur"],
    },
  ],
  storeDescription: [
    {
      required: true,
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error("请填写店铺描述！");
        }
        return true;
      },
      trigger: ["blur"],
    },
  ],
  storeAddress: [
    {
      required: true,
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error("请填写店铺地址！");
        }
        return true;
      },
      trigger: ["blur"],
    },
  ],
  storeContact: [
    {
      required: true,
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error("请填写店铺联系方式！");
        }
        return true;
      },
      trigger: ["blur"],
    },
  ],
  storeLicense: [
    {
      required: true,
      validator(rule: FormItemRule, value: FileUpload[]) {
        if (value.length <= 0 && formData.organizationType !== OrganizationTypes.MICRO) {
          return new Error("请上传店铺证照！");
        }
        return true;
      },
      trigger: ["blur"],
    },
  ],
};

// 图片上传结束
const onUploadFinish = (options: { file: UploadFileInfo; event?: ProgressEvent }, fileListKey: keyof FormDataType) => {
  const res = JSON.parse((options.event?.target as XMLHttpRequest).response);
  if (res.code === 0) {
    commonNotify("success", "文件上传成功！");
    options.file.thumbnailUrl = res.data as string;
  } else {
    commonNotify("warning", res.message || "文件上传失败");
    setTimeout(() => {
      for (let index = 0; index < (formData as any)[fileListKey].length; index++) {
        const item = (formData as any)[fileListKey][index];
        if (item.id === options.file.id) {
          (formData as any)[fileListKey].splice(index, 1);
        }
      }
    }, 0);
  }
};

// 监听到如果是小微企业则只能选对私和法人
watch(
  () => formData.organizationType,
  (newValue) => {
    if (newValue === OrganizationTypes.MICRO) {
      formData.bankAccountType = BankAccountTypes.PRIVATE;
      formData.contactType = ContactTypes.LEGEL;
    }
  }
);

// 提交信息
const submitHandler = (e: MouseEvent) => {
  e.preventDefault();
  formDom.value?.validate((errors) => {
    if (!errors) {
      submit();
    } else {
      commonNotify("warning", "请将表单填写正确！");
    }
  });
};

// 提交
const submitLoading = ref(false);
const submit = async () => {
  submitLoading.value = true;
  const data = genRequestData(formData);
  const res = await submitMerchantInfoRequest(data);
  if (res && res.code === 0) {
    commonNotify("success", "信息提交成功！");
    emit("updateStep");
  }
  submitLoading.value = false;
};

// 构造请求参数
const genRequestData = (formData: FormDataType) => {
  const {
    organizationType,
    businessLicenseFileList,
    businessLicenseNumber,
    merchantName,
    legalPerson,
    idCardName,
    idCardNumber,
    idCardFrontImageFileList,
    idCardBackImageFileList,
    idCardStart,
    idCardEnd,
    idCardAddress,
    bankAccountType,
    accountBank,
    accountName,
    accountNumber,
    bankAddressCode,
    bankName,
    contactType,
    contactPhone,
    contactEmail,
    contactName,
    contactIdCardNumber,
    contactIdCardFrontImageFileList,
    contactIdCardBackImageFileList,
    contactIdCardStart,
    contactIdCardEnd,
    businessAuthorizationLetterFileList,
    storeName,
    shortName,
    storeDescription,
    storeAddress,
    storeContact,
    storeLicense,
  } = formData;
  const data: RequestParam.SubmitMerchantInfo = {
    organizationType,
    businessLicense: businessLicenseFileList[0]?.thumbnailUrl as string,
    businessLicenseNumber,
    merchantName,
    legalPerson,
    idCardName,
    idCardNumber,
    idCardFrontImage: idCardFrontImageFileList[0]?.thumbnailUrl as string,
    idCardBackImage: idCardBackImageFileList[0]?.thumbnailUrl as string,
    idCardStart: useTimeFormat("{YYYY}-{MM}-{dd}")(idCardStart).format,
    idCardEnd: idCardEnd === infinity ? "长期" : useTimeFormat("{YYYY}-{MM}-{dd}")(idCardEnd).format,
    idCardAddress,
    bankAccountType,
    accountBank,
    accountName,
    accountNumber,
    // bankAddressCode: String(Number(bankAddressCode) - 100000),
    bankAddressCode,
    bankName,
    contactType,
    contactPhone,
    contactEmail,
    contactName,
    contactIdCardNumber,
    contactIdCardFrontImage: contactIdCardFrontImageFileList[0]?.thumbnailUrl as string,
    contactIdCardBackImage: contactIdCardBackImageFileList[0]?.thumbnailUrl as string,
    contactIdCardStart: useTimeFormat("{YYYY}-{MM}-{dd}")(contactIdCardStart).format,
    contactIdCardEnd: contactIdCardEnd === infinity ? "长期" : useTimeFormat("{YYYY}-{MM}-{dd}")(contactIdCardEnd).format,
    businessAuthorizationLetter: businessAuthorizationLetterFileList[0]?.thumbnailUrl as string,
    storeName,
    shortName,
    storeDescription,
    storeAddress,
    storeContact,
    storeLicense: storeLicense[0]?.hashName,
  };
  return data;
};

// 初始化
onMounted(async () => {
  const res = await getAllowMicro();
  if (res && res.data) {
    organizationTypes.value.push({
      label: "小微商户",
      value: OrganizationTypes.MICRO,
    });
  }
});
</script>

<style scoped lang="less">
.form {
  padding: 16px 0;
}
</style>
