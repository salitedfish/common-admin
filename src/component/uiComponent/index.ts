import type { App } from "vue";

import { naiveUIComponent } from "./naiveUIComponent";
import { elUIComponent } from "./elUIComponent";

export const uiComponent = {
  install: (app: App) => {
    app.use(naiveUIComponent);
    app.use(elUIComponent);
  },
};
