// @flow
import React, { PureComponent } from "react";
import Text from "@casumo/cmp-text";

type Props = {
  subtitle: string,
};

export default class ContentSubtitle extends PureComponent<Props> {
  render() {
    const { subtitle } = this.props;

    return (
      <Text className="u-margin-bottom--xlg" tag="h2">
        {subtitle}
      </Text>
    );
  }
}
