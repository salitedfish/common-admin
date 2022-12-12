import type { RouteRecordRaw } from "vue-router";

export default <RouteRecordRaw[]>[
  {
    path: "systemConfigManager",
    name: "systemConfigManager",
    component: () => import("@/view/systemManager/systemConfigManager/systemConfigManager.vue"),
    meta: {
      label: "系统配置",
      icon: "peizhi",
      id: 7001,
    },
  },
  {
    path: "adminLogRecordManager",
    name: "adminLogRecordManager",
    component: () => import("@/view/systemManager/adminLogRecordManager/adminLogRecordManager.vue"),
    meta: {
      label: "操作日志",
      icon: "rizhi",
      id: 7021,
    },
  },
  {
    path: "systemVersionManager",
    name: "systemVersionManager",
    component: () => import("@/view/systemManager/systemVersionManager/systemVersionManager.vue"),
    meta: {
      label: "系统版本",
      icon: "jurassic_version",
      id: 7011,
    },
  },
];
