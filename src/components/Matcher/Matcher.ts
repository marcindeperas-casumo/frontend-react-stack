// @flow
type Props = {
  getKey: Function,
  matchers: Object,
};

const renderNothing = () => null;

const Matcher = ({ getKey, matchers, ...rest }: Props) => {
  const key = getKey(rest);
  const matchingMode = matchers[key];

  if (!matchingMode) {
    console.warn(`No matching mode for key ${key}`);
  }

  return (matchingMode || matchers.default || renderNothing)(rest);
};

export default Matcher;
