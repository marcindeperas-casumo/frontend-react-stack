// @flow

const noop = () => {};

const createAdapter = () => ({
  track: noop,
  setState: noop,
});

export default createAdapter;
