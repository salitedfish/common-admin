import { createDiscreteApi } from "naive-ui";
import type { NotificationType } from "naive-ui";

export const { notification } = createDiscreteApi(["notification"]);

export const commonNotify = (type: NotificationType, message: string) => {
  notification[type]({
    content: message,
    duration: 2000,
    keepAliveOnHover: true,
  });
};
