/**
 * 将动态路径转换为正则表达式
 * @param {string} path 如 '/user/:id'
 * @returns {RegExp}
 */
export function compilePath(path) {
  const segments = path
    .replace(/^\//, "") // 移除开头斜杠
    .split("/");

  const regexSegments = segments.map((segment) => {
    if (segment.startsWith(":")) {
      const paramName = segment.slice(1);
      return `(?<${paramName}>[^/]+)`;
    }
    return segment;
  });

  return new RegExp(`^/${regexSegments.join("/")}$`, "i");
}

/**
 * 检查路径是否匹配
 * @param {string} currentPath 当前路径
 * @param {string} routePath 路由定义路径
 * @returns {object|null} 参数对象或null
 */
export function matchPath(currentPath, routePath) {
  if (currentPath === routePath) return {};

  const regex = compilePath(routePath);
  const match = currentPath.match(regex);
  return match ? match.groups || {} : null;
}
