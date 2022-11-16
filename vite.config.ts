import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import autoprefixer from "autoprefixer";

export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },

  css: {
    postcss: {
      plugins: [
        autoprefixer({
          overrideBrowserslist: ["Android 4.1", "iOS 7.1", "Chrome > 31", "ff > 31", "ie >= 8"],
          grid: true,
        }),
      ],
    },
  },

  server: {
    proxy: {
      "^/api": {
        target: "http://183.134.99.140:46790/",
        // autoRewrite: true,
        changeOrigin: true,
      },
    },
  },
});
