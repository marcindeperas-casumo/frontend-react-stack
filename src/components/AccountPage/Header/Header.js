// @flow
import * as React from "react";
import cx from "classnames";
import Text from "@casumo/cmp-text";

type Props = {
  children: React.Node,
};

export function Header({ children }: Props) {
  return (
    <Text
      tag="h3"
      className={cx(
        "u-font-weight-bold u-font-md@desktop",
        "u-padding-top--lg u-padding-top--xlg@desktop u-padding-bottom--md"
      )}
    >
      {children}
    </Text>
  );
}
