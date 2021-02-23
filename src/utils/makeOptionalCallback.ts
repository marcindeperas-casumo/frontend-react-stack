// @flow

/**
 * Creates a function that calls with supplied parameters or resolves to null if not provided
 * Is useful for React components that have optional callbacks, but also need parameters passing.
 */
// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'mixed'.
const makeOptionalCallback = (fn?: any => mixed, ...params: Array<mixed>) => {
  return fn
    ? () => {
        // yeah this looks dumb, but can't seem to get flow to understand the above if statements makes this unnecessary
        if (fn) {
          fn(...params);
        }
      }
    : undefined;
};

export { makeOptionalCallback };
