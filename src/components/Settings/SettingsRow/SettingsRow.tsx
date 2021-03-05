import Flex from "@casumo/cmp-flex";
import * as React from "react";
import classNames from "classnames";

type OwnProps = {
  text: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  padding: string;
};

type Props = OwnProps & typeof SettingsRow.defaultProps;

export class SettingsRow extends React.PureComponent<Props> {
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
