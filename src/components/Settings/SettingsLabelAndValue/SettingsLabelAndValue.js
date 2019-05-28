// @flow
import React, { PureComponent, type Node } from "react";
import Text from "@casumo/cmp-text";

type Props = {
  label?: Node,
  value?: Node,
};

export class SettingsLabelAndValue extends PureComponent<Props> {
  render() {
    const { label, value } = this.props;
    return (
      <>
        <Text
          tag="p"
          size="sm"
          className="t-color-grey-light-1 u-font-weight-light"
        >
          {label}
        </Text>
        <Text
          tag="div"
          size="default"
          className="t-color-grey-dark-3 u-margin-top--sm u-font-weight-medium"
        >
          {value}
        </Text>
      </>
    );
  }
}
