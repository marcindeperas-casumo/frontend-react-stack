// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";

type Props = {
  // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  label: ?string | React.Node,
  // @ts-expect-error ts-migrate(2694) FIXME: Namespace 'React' has no exported member 'Node'.
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
