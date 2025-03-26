import { BaseRouterStrategy } from "./baseStrategy";

export class HashStrategy extends BaseRouterStrategy {
  getCurrentPath() {
    const hash = window.location.hash.slice(1);
    return hash || "/";
  }

  navigate(path, replace = false) {
    if (replace) {
      window.location.replace(`${this.baseURL}#${path}`);
    } else {
      window.location.hash = path;
    }
  }

  listen(callback) {
    window.addEventListener("hashchange", callback);
    return () => window.removeEventListener("hashchange", callback);
  }
}
