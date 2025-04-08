import { createStore } from "./core/state-manager";
const routerConfig = [
  { name: "home", path: "/" },
  { name: "home", path: "/home" },
  { name: "dashboards", path: "/dashboards" },
  { name: "web-elements", path: "/web-elements" },
];

// 初始路由状态
const initialState = {
  currentPath: "/",
  currentName: "Home",
  config: routerConfig,
};

// 调试中间件
const loggerMiddleware = (store) => (next) => (updater) => {
  console.log("Before state:", store.getState());
  const result = next(updater);
  console.log("After state:", store.getState());
  return result;
};

export const routerStore = createStore(initialState, [loggerMiddleware]);
