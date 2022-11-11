import { defineComponent } from "vue";
import type { App } from "vue";

export const elUIComponent = {
  install: (app: App) => {
    app.component("aA", defineComponent({}));
  },
};
