import type { App } from "vue";
import JsonViewer from "vue3-json-viewer";

export const otherComponent = {
  install: (app: App) => {
    app.use(JsonViewer);
  },
};
