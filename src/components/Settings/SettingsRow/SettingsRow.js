// @flow
import React, { PureComponent, type Node } from "react";
import classNames from "classnames";
import Flex from "@casumo/cmp-flex";

type Props = {
  text: Node,
  children?: Node,
  className?: string,
  padding: string,
};

export class SettingsRow extends PureComponent<Props> {
  static defaultProps = {
    padding: "lg",
  };

  render() {
    const { text, children, className, padding } = this.props;

    return (
      <Flex
        spacing="md"
        justify="space-between"
        align="center"
        className={classNames(
          `u-padding-y--${padding}`,
          "u-padding-x--md",
          "t-border-bottom",
          "t-border--current-color",
          "t-color-chrome-light-1",
          "t-background-white",
          className
        )}
      >
        <Flex.Item>{text}</Flex.Item>
        {children && <Flex.Item>{children}</Flex.Item>}
      </Flex>
    );
  }
}
