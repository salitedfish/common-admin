/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript/recommended",
    "@vue/eslint-config-prettier",
  ],
  rules: {
    indent: ["error", 2],
    "no-var": "error",
    "no-console": "off",
    quotes: ["error", "double"], // 双引号
    eqeqeq: ["error", "always"], // 全等
    semi: "error", // 加分号
  },
};
