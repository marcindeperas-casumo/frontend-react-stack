import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import * as React from "react";

export function LimitHeaderNormal(props: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactChild;
}) {
  return (
    <Flex
      align="center"
      justify="space-between"
      spacing="none"
      className="u-padding--md bg-white"
    >
      <Flex
        justify="center"
        align="center"
        spacing="none"
        className="u-margin-right--md u-padding t-border-r--circle bg-teal-50"
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
