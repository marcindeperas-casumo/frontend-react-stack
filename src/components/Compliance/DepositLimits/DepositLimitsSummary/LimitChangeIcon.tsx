// @flow
import * as React from "react";
import { ArrowDownIcon, ArrowUpIcon } from "@casumo/cmp-icons";
import type { LimitChangeType } from "Models/playOkay/depositLimits";

export function LimitChangeIcon(props: { change: LimitChangeType }) {
  // @ts-expect-error ts-migrate(1170) FIXME: A computed property name in a type literal must re... Remove this comment to see the full error message
  const possibilities: { [LimitChangeType]: React.Node } = {
    increase: <ArrowUpIcon className="u-margin-right t-color-green-30" />,
    decrease: <ArrowDownIcon className="u-margin-right t-color-green-30" />,
  };

  return possibilities[props.change] || <div className="u-padding--md" />;
}
