// @flow
import * as React from "react";

/**
 * This hook is using useEffect to update its value after other hooks
 * get executed. It is used when you need to keep reference to previous state.
 */
export function usePrevious<T>(value: T): void | T {
  const ref = React.useRef();

  React.useEffect(() => {
    ref.current = value; // eslint-disable-line fp/no-mutation
  }, [value]);

  return ref.current;
}
