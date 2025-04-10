import { HistoryStrategy } from "./strategies/historyStrategy";
import { HashStrategy } from "./strategies/hashStrategy";
import { compilePath, matchPath } from "./pathParser";

const STRATEGIES = {
  history: HistoryStrategy,
  hash: HashStrategy,
};

export class Router {
  constructor(config = {}) {
    this.routerStore = config.routerStore;
    this.mode = config.mode || "hash";
    this.routes = this._processRoutes(config.routes || {});
    this.strategy = new STRATEGIES[this.mode](config.baseURL);
    this._unlisten = null;
    this._init();
  }

  _processRoutes(routes) {
    return Object.entries(routes).map(([path, config]) => ({
      path,
      handler: config.handler, // 正确提取 handler
      meta: config.meta || {}, // 提取 meta 数据
      regex: path.includes(":") ? compilePath(path) : null,
      exact: !path.includes(":"),
    }));
  }

  _init() {
    // 初始化事件监听
    this._unlisten = this.strategy.listen(() => this._handleRouteChange());

    // 绑定链接点击事件
    document.addEventListener("click", this._handleLinkClick.bind(this));

    // 初始路由处理
    this._handleRouteChange();
  }

  _handleRouteChange() {
    const currentPath = this.strategy.getCurrentPath();
    const { handler, params, route } = this._findHandler(currentPath); // 修改返回route

    // 权限校验
    if (route?.meta?.requiresAuth) {
      if (!this._checkAuth(route.meta)) {
        this.replace("/log-in");
        return;
      }
    }
    // // 更新路由状态
    // const matchedRoute = this.routerStore
    //   .getState()
    //   .config.find((r) => this.matchPath(currentPath, r.path));
    // if (matchedRoute) {
    //   this.routerStore.setState({
    //     currentPath,
    //     currentName: matchedRoute.name,
    //   });
    // }

    if (handler) {
      handler(params);
    } else {
      console.warn(`No route handler for path: ${currentPath}`);
    }
  }
  // 权限校验方法(新增)
  _checkAuth(meta) {
    const user = localStorage.getItem("user"); // 假设存储用户信息

    // 检查登录状态
    if (!localStorage.getItem("auth_token")) {
      return false;
    }

    // 检查角色权限
    if (meta.roles) {
      return meta.roles.includes(user?.role); // 根据实际数据结构调整
    }

    return true;
  }
  // // 简易路径匹配（支持动态参数）
  // matchPath(currentPath, routePath) {
  //   const routeSegments = routePath.split("/");
  //   const pathSegments = currentPath.split("/");

  //   if (routeSegments.length !== pathSegments.length) return false;

  //   return routeSegments.every(
  //     (seg, i) => seg.startsWith(":") || seg === pathSegments[i]
  //   );
  // }

  _findHandler(currentPath) {
    // 1. 精确匹配
    const exactMatch = this.routes.find(
      (r) => r.exact && r.path === currentPath
    );
    if (exactMatch)
      return {
        handler: exactMatch.handler,
        params: {},
        route: exactMatch, // 新增 route 属性
      };

    // 2. 动态路由匹配
    for (const route of this.routes) {
      if (!route.regex) continue;
      const params = matchPath(currentPath, route.path);
      if (params)
        return {
          handler: route.handler,
          params,
          route: route, // 返回当前路由对象
        };
    }

    // 3. 通配符匹配
    const wildcard = this.routes.find((r) => r.path === "*");
    return wildcard
      ? {
          handler: wildcard.handler,
          params: { path: currentPath },
          route: wildcard,
        }
      : {
          handler: null,
          params: {},
          route: null, // 明确返回 null 表示未匹配
        };
  }

  _handleLinkClick(event) {
    const link = event.target.closest("[data-router-link]");
    if (link) {
      event.preventDefault();
      this.push(link.getAttribute("href"));
    }
  }

  // 公开API
  push(path) {
    this.strategy.navigate(path);
  }

  replace(path) {
    this.strategy.navigate(path, true);
  }

  destroy() {
    this._unlisten?.();
    document.removeEventListener("click", this._handleLinkClick);
  }

  // 历史记录操作
  go(n) {
    window.history.go(n);
  }
  back() {
    this.go(-1);
  }
  forward() {
    this.go(1);
  }
}

/**
 * 创建路由实例的工厂函数
 */
export function createRouter(config) {
  return new Router(config);
}
