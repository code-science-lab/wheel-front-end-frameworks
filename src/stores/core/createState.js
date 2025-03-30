export function createState(initialValue) {
  let value = initialValue;
  const listeners = [];

  function getState() {
    return value;
  }

  function setState(newValue) {
    value = typeof newValue === "function" ? newValue(value) : newValue;
    listeners.forEach((listener) => listener());
  }

  function subscribe(listener) {
    listeners.push(listener);
    return function unsubscribe() {
      const index = listeners.indexOf(listener);
      if (index > -1) listeners.splice(index, 1);
    };
  }

  return [getState, setState, subscribe];
}
