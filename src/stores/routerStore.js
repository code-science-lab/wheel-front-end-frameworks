import { createStore } from "./core/state-manager";
const routerConfig = [
  { name: "Home", path: "/" },
  { name: "Home", path: "/Home" },
  { name: "Dashboards", path: "/Dashboards" },
  { name: "WebElements", path: "/WebElements" },
];

// 初始路由状态
const initialState = {
  currentPath: "/",
  currentName: "Home",
  config: routerConfig,
};

export const routerStore = createStore(initialState, [
  // 可添加路由中间件
  (store) => (next) => (updater) => {
    console.log("路由状态变更:", store.getState());
    return next(updater);
  },
]);
