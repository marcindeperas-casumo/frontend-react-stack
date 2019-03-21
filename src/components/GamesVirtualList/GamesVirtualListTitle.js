// @flow
import React, { PureComponent } from "react";
import Text from "@casumo/cmp-text";
import Flex from "@casumo/cmp-flex";

type Props = {
  /** The section title */
  title: string,
};

export default class GamesVirtualListTitle extends PureComponent<Props> {
  render() {
    return (
      <Flex align="center">
        <Text
          tag="span"
          className="u-font-weight-bold t-color-black o-flex-1"
          size="md"
        >
          {this.props.title}
        </Text>
      </Flex>
    );
  }
}
