const showNothing = () => null;

const Matcher = ({ getKey, matchers, ...rest }) => {
  const key = getKey(rest);
  const matchingMode = matchers[key];

  if (!matchingMode) {
    console.warn(`No matching mode for key ${key}`);
  }

  return (matchingMode || matchers.default || showNothing)(rest);
};

export default Matcher;
