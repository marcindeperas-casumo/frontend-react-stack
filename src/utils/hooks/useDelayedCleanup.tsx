// @flow
import * as React from "react";

/**
 * General idea behind this hook is that you might change property, but keep old
 * reference for some time, ie. during transition animation.
 */
export function useDelayedCleanup<T>(newProp: T, delay: number): T {
  const [prop, setProp] = React.useState(newProp);

  React.useEffect(() => {
    if (prop === newProp) {
      return;
    } else if (newProp === null) {
      const timeoutId = setTimeout(() => setProp(newProp), delay);

      return function cleanup() {
        clearTimeout(timeoutId);
      };
    } else {
      setProp(newProp);
    }
  }, [delay, newProp, prop]);

  return prop;
}
