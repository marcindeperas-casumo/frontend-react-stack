// @flow
import * as React from "react";

/**
 * When working with data coming from hooks you might find yourself in
 * situation where you need to initialize something based off hook value.
 * The idea is quite simple - you pass condition and function. Function will be
 * called only once, first time condition is meet (ie. some value becomes
 * available).
 * For sake of simplicity cond is "any" since any truthy value will do.
 */
export function useCallOnce(cond: any, fn: void => any) {
  const ref = React.useRef(false);

  React.useEffect(() => {
    if (!ref.current && cond) {
      ref.current = true; // eslint-disable-line fp/no-mutation
      // @ts-expect-error ts-migrate(2349) FIXME: This expression is not callable.
      fn();
    }
  });
}
