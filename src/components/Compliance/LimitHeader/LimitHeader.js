// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import "./limitHeader.scss";

export function LimitHeader(props: {
  title: string,
  icon: React.Node,
  children: ?React.Node,
}) {
  return (
    <Flex
      align="center"
      justify="space-between"
      spacing="none"
      className="u-padding--md t-background-white c-limit-header"
    >
      <Flex
        justify="center"
        align="center"
        spacing="none"
        className="u-margin-right--md u-padding t-border-r--circle t-background-turquoise"
      >
        {props.icon}
      </Flex>
      <Text tag="span" className="u-font-weight-bold o-flex--1">
        {props.title}
      </Text>
      {props.children}
    </Flex>
  );
}
