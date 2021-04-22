import Text from "@casumo/cmp-text";
import * as React from "react";

type Props = {
  label?: React.ReactNode;
  value?: React.ReactNode;
};

export class SettingsLabelAndValue extends React.PureComponent<Props> {
  render() {
    const { label, value } = this.props;
    return (
      <>
        <Text
          tag="p"
          size="sm"
          className="text-grey-5 u-font-weight-light u-margin-bottom"
        >
          {label}
        </Text>
        <Text
          tag="div"
          size="default"
          className="text-grey-90 u-margin-top--sm u-font-weight-medium"
        >
          {value}
        </Text>
      </>
    );
  }
}
