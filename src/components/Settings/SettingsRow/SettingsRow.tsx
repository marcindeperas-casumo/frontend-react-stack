// @flow
// @ts-expect-error ts-migrate(2305) FIXME: Module '"../../../../node_modules/@types/react"' h... Remove this comment to see the full error message
import React, { PureComponent, type Node } from "react";
import classNames from "classnames";
import Flex from "@casumo/cmp-flex";

type OwnProps = {
    text: Node;
    children?: Node;
    className?: string;
    padding: string;
};

type Props = OwnProps & typeof SettingsRow.defaultProps;

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
          "t-border-current",
          "t-color-grey-5",
          "t-background-white",
          className
        )}
      >
        <Flex.Item>{text}</Flex.Item>
        {children && (
          <Flex.Item className="o-flex__item--no-shrink">{children}</Flex.Item>
        )}
      </Flex>
    );
  }
}
