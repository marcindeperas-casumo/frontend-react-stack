export default ({ getKey, matchers, ...rest }) => {
  return (matchers[getKey(rest)] || matchers.default)(rest);
};
