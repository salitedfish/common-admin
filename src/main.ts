import { createApp, ref } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import { uiComponent } from "@/component/uiComponent";

import "@/util/extendsProto";
import "@/assets/css/index.less";
import "vue3-json-viewer/dist/index.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(uiComponent);

app.mount("#app");

console.log("runtime：", import.meta.env.VITE_ENV, import.meta.env.VITE_SERVICE_URL);
