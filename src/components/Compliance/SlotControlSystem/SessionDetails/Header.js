// @flow
import * as React from "react";
import Text from "@casumo/cmp-text";

type Props = {
  children: ?React.Node,
};

export function Header(props: Props) {
  return (
    <Text
      tag="h3"
      className="u-font-weight-bold t-color-grey-dark-1 t-background-grey-light-2 u-padding--md u-padding-top--lg"
    >
      {props.children}
    </Text>
  );
}
