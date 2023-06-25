/// <reference types="vite/client" />
declare module "vue3-json-viewer";

interface ImportMetaEnv {
  VITE_ENV: string;
  VITE_APP_NAME: string;
  VITE_APP_ICO: string;
  VITE_RecordNo: string;
  VITE_SERVICE_URL: string;
  VITE_CaptchaAppId: number;
  VITE_PRIVACY_AGREEMENT_URL: string;
  VITE_SERVICE_AGREEMENT_URL: string;
}
