/* eslint-disable */
// @ts-nocheck
const captchaAppId = import.meta.env.VITE_CaptchaAppId;
const options = {};

export const useTencentCaptcha = (callback) => {
  return new TencentCaptcha(captchaAppId, callback, options);
};
