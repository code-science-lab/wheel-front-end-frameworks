import { BaseRouterStrategy } from "./baseStrategy";

export class HistoryStrategy extends BaseRouterStrategy {
  getCurrentPath() {
    return window.location.pathname + window.location.search;
  }

  navigate(path, replace = false) {
    const method = replace ? "replaceState" : "pushState";
    window.history[method](null, "", path);
    // 手动触发路由更新（因为pushState不会触发popstate）
    this.triggerRouteChange();
  }

  listen(callback) {
    this.triggerRouteChange = callback;
    window.addEventListener("popstate", callback);
    return () => window.removeEventListener("popstate", callback);
  }
}
