/**
 * 路由策略抽象基类
 */
export class BaseRouterStrategy {
  constructor(baseURL = "") {
    this.baseURL = baseURL;
  }

  getCurrentPath() {
    throw new Error("Method not implemented: getCurrentPath()");
  }

  navigate(path, replace = false) {
    throw new Error("Method not implemented: navigate()");
  }

  listen(callback) {
    throw new Error("Method not implemented: listen()");
  }
}
