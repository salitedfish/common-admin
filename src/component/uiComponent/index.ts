import type { App } from "vue";

import { naiveUIComponent } from "./naiveUIComponent";
import { otherComponent } from "./otherComponent";

export const uiComponent = {
  install: (app: App) => {
    app.use(naiveUIComponent);
    app.use(otherComponent);
  },
};
