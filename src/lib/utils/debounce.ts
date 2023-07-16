export const debounce = (fn: Function, delay: number = 300) => {
  let timeout = -1;
  return (...args: any[]) => {
    if (timeout !== -1) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(fn, delay, ...args);
  };
};
