// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";

export function LimitHeaderNormal(props: {
  title: string,
  // @ts-expect-error ts-migrate(2694) FIXME: Namespace 'React' has no exported member 'Node'.
  icon: React.Node,
  // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  children: ?React.Node,
}) {
  return (
    <Flex
      align="center"
      justify="space-between"
      spacing="none"
      className="u-padding--md t-background-white"
    >
      <Flex
        justify="center"
        align="center"
        spacing="none"
        className="u-margin-right--md u-padding t-border-r--circle t-background-teal-50"
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
