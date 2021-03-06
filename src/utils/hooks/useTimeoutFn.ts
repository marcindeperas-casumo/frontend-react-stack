import React from "react";

export const useTimeoutFn = () => {
  const timeoutId = React.useRef(null);

  const clear = () => {
    if (timeoutId.current !== null) {
      clearTimeout(timeoutId.current);
      // eslint-disable-next-line fp/no-mutation
      timeoutId.current = null;
    }
  };

  const schedule = (func, timeout) => {
    clear();
    // eslint-disable-next-line fp/no-mutation
    timeoutId.current = setTimeout(func, timeout);
  };
  const scheduleIn = (func: () => any, timeout: number) => {
    schedule(func, timeout);
  };
  const scheduleAt = (func: () => any, ts: number) => {
    const nextUpdateIn = ts - Date.now();

    schedule(func, nextUpdateIn < 0 ? 0 : nextUpdateIn);
  };

  const result = React.useRef({
    clear,
    scheduleIn,
    scheduleAt,
  });
  return result.current;
};
