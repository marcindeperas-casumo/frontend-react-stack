// @flow
import * as React from "react";
import Text from "@casumo/cmp-text";

type Props = {
  // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  children: ?React.Node,
};

export function Header(props: Props) {
  return (
    <Text
      tag="h3"
      className="u-font-weight-bold t-color-grey-50 t-background-grey-0 u-padding--md u-padding-top--lg"
    >
      {props.children}
    </Text>
  );
}
