const Matcher = ({ getKey, matchers, ...rest }) => {
  return (matchers[getKey(rest)] || matchers.default)(rest);
};

export default Matcher;
