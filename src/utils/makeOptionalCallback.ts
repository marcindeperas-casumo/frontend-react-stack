/**
 * Creates a function that calls with supplied parameters or resolves to null if not provided
 * Is useful for React components that have optional callbacks, but also need parameters passing.
 */
const makeOptionalCallback = (fn?: (a: any) => any, ...params: any[]) => {
  return fn
    ? () => {
        // yeah this looks dumb, but can't seem to get flow to understand the above if statements makes this unnecessary
        if (fn) {
          // @ts-expect-error ts-migrate(2556) FIXME: Expected 1 arguments, but got 0 or more.
          fn(...params);
        }
      }
    : undefined;
};

export { makeOptionalCallback };
