/**
 * 创建全局状态管理器
 * @param {Object} initialState 初始状态
 * @param {Array} middlewares 中间件数组
 */
export function createStore(initialState, middlewares = []) {
  // 当前状态（闭包保存）
  let state = deepClone(initialState);

  // 监听器集合：Map<callback, selector>
  const listeners = new Map();

  // 基础setState实现
  const setState = (updater) => {
    const newState = typeof updater === "function" ? updater(state) : updater;

    // 浅比较优化
    if (!shallowEqual(state, newState)) {
      const prevState = state;
      state = deepClone(newState); // 确保不可变

      // 通知所有监听器
      listeners.forEach((selector, callback) => {
        const prevSlice = selector(prevState);
        const newSlice = selector(state);
        if (!shallowEqual(prevSlice, newSlice)) {
          callback(newSlice, prevSlice);
        }
      });
    }
  };

  // 应用中间件
  const enhanced = applyMiddleware(
    {
      getState: () => state,
      setState,
    },
    middlewares
  );

  // 订阅状态变化
  const subscribe = (selector, callback) => {
    const wrappedCallback = () => {
      const selected = selector(state);
      callback(selected, selected); // 初始化立即执行一次
    };

    listeners.set(wrappedCallback, selector);
    return () => listeners.delete(wrappedCallback);
  };

  return {
    getState: () => deepClone(state), // 返回副本防止外部修改
    setState: enhanced.setState,
    subscribe,
  };
}

// 深拷贝工具函数（简易版）
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// 浅比较工具
function shallowEqual(a, b) {
  if (a === b) return true;
  if (
    typeof a !== "object" ||
    a === null ||
    typeof b !== "object" ||
    b === null
  ) {
    return false;
  }
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;
  return keysA.every((key) => a[key] === b[key]);
}

// 中间件系统
function applyMiddleware(store, middlewares) {
  let setState = store.setState;

  // 反向组合中间件
  middlewares.reverse().forEach((middleware) => {
    setState = middleware(store)(setState);
  });

  return { ...store, setState };
}
