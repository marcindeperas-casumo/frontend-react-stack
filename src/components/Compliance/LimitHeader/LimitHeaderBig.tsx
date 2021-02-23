// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";

export function LimitHeaderBig(props: {
  title: string,
  children: ?React.Node,
}) {
  return (
    <Flex
      align="center"
      justify="space-between"
      spacing="none"
      className="u-padding-x--md u-padding-y--lg"
    >
      <Text tag="span" size="lg" className="u-font-weight-bold o-flex--1">
        {props.title}
      </Text>
      {props.children}
    </Flex>
  );
}
