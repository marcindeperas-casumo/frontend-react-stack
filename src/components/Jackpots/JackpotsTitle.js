// @flow
import React, { PureComponent } from "react";
import Text from "@casumo/cmp-text";
import classNames from "classnames";

export type Props = {
  title?: string,
};

// TODO: @leventebalogh move it out to a more generic place
// (it can serve as the title component for top-list blocks)
export default class JackpotsTitle extends PureComponent<Props> {
  render() {
    const { title = "Jackpots" } = this.props;

    return (
      <Text
        tag="h3"
        className={classNames(
          "u-margin-top--md",
          "u-padding-top--md",
          "u-padding-bottom--md",
          "u-padding-bottom--lg@tablet",
          "u-padding-bottom--lg@desktop",
          "u-padding-left--md",
          "u-padding-left--2xlg@tablet",
          "u-padding-left--2xlg@desktop",
          "u-font-weight-bold",
          "flex-1"
        )}
      >
        {title}
      </Text>
    );
  }
}
