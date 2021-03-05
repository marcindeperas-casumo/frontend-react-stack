import Text from "@casumo/cmp-text";
import * as React from "react";
import cx from "classnames";

type Props = {
  children: React.ReactChild;
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
