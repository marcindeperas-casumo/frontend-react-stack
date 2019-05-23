// @flow
import React, { PureComponent, type Node } from "react";
import classNames from "classnames";
import Flex from "@casumo/cmp-flex";

type Props = {
  text: Node,
  action?: Node,
  className?: string,
  padding: string,
};

const paddingValues = {
  default: "lg",
  md: "md",
};
class SettingsRow extends PureComponent<Props> {
  static defaultProps = {
    padding: "default",
  };

  render() {
    const { text, action, className, padding } = this.props;

    return (
      <Flex
        spacing="md"
        justify="space-between"
        align="center"
        className={classNames(
          "u-padding",
          `u-padding-vert--${paddingValues[padding]}`,
          "u-padding-horiz--md",
          "t-border-bottom",
          "t-border--current-color",
          "t-color-grey-light-2",
          "t-background-white",
          className
        )}
      >
        <Flex.Item>{text}</Flex.Item>
        {action ? <Flex.Item>{action}</Flex.Item> : ""}
      </Flex>
    );
  }
}

export default SettingsRow;
