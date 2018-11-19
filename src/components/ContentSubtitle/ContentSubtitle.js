// @flow
import React, { PureComponent } from "react";
import Text from "@casumo/cmp-text";

type Props = {
  className?: string,
  subtitle: string,
};

export default class ContentSubtitle extends PureComponent<Props> {
  render() {
    const { className, subtitle } = this.props;

    return (
      <Text tag="h2" className={className}>
        {subtitle}
      </Text>
    );
  }
}
