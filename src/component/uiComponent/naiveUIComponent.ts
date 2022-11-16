import {
  create,
  NButton,
  NConfigProvider,
  NMenu,
  NSwitch,
  NLayout,
  NLayoutSider,
  NSpace,
  NGlobalStyle,
  NScrollbar,
  NCard,
  NBreadcrumb,
  NBreadcrumbItem,
  NLoadingBarProvider,
  NInput,
} from "naive-ui";

export const naiveUIComponent = create({
  components: [NButton, NConfigProvider, NMenu, NSwitch, NLayout, NLayoutSider, NSpace, NGlobalStyle, NScrollbar, NCard, NBreadcrumb, NBreadcrumbItem, NLoadingBarProvider, NInput],
});
