import Text from "@casumo/cmp-text";
import * as React from "react";

type Props = {
  children: React.ReactNode;
};

export function Header(props: Props) {
  return (
    <Text
      tag="h3"
      className="u-font-weight-bold text-grey-50 bg-grey-0 u-padding--md u-padding-top--lg"
    >
      {props.children}
    </Text>
  );
}
