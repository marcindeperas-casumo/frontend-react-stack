// @flow
import React, { PureComponent, type Node } from "react";
import { is } from "ramda";

const isString = is(String);

type Props = {
  enabled: ?boolean,
  label: Node,
  target: mixed,
  launcher?: (params: any) => any,
};

const renderLaunchableNode = (label, target, launcher) => {
  if (launcher) {
    return <a onClick={() => launcher(target)}>{label}</a>;
  }
  return null;
};

class Link extends PureComponent<Props> {
  static defaultProps = {
    enabled: true,
  };
  render() {
    const { label, target, launcher, enabled } = this.props;

    if (!enabled) {
      return label;
    }

    return isString(target) && !launcher ? (
      <a href={target}>{label}</a>
    ) : (
      renderLaunchableNode(label, target, launcher)
    );
  }
}

export default Link;
