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
          className="t-color-grey-5 u-font-weight-light u-margin-bottom"
        >
          {label}
        </Text>
        <Text
          tag="div"
          size="default"
          className="t-color-grey-90 u-margin-top--sm u-font-weight-medium"
        >
          {value}
        </Text>
      </>
    );
  }
}
