// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";

type Props = {
  label: ?string | React.Node,
  value: string | React.Node,
};

export function Row(props: Props) {
  return (
    <Flex justify="space-between" className="u-padding--md">
      <Text tag="span" className="u-font-weight-bold">
        {props.label}
      </Text>
      <Text tag="span" className="t-color-grey-50">
        {props.value}
      </Text>
    </Flex>
  );
}
