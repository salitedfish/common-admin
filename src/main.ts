import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import { uiComponent } from "@/component/uiComponent";

import "@/assets/css/index.less";

// import {} from "@ultra-man/noa";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(uiComponent);

app.mount("#app");

console.log("当前模式：", import.meta.env.VITE_ENV);
111111;
