import Text from "@casumo/cmp-text";
import Flex from "@casumo/cmp-flex";
import React, { PureComponent } from "react";

type Props = {
  /** The section title */
  title: string;
};

export class GamesVirtualListTitle extends PureComponent<Props> {
  render() {
    return (
      <Flex align="center">
        <Text tag="span" className="u-font-weight-bold text-grey-50 o-flex-1">
          {this.props.title}
        </Text>
      </Flex>
    );
  }
}
