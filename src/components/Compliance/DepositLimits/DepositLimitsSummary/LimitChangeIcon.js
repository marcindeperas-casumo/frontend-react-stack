// @flow
import * as React from "react";
import { ArrowDownIcon } from "@casumo/cmp-icons";
import type { LimitChangeType } from "Models/playOkay/depositLimits";

export function LimitChangeIcon(props: { change: LimitChangeType }) {
  const possibilities: { [LimitChangeType]: React.Node } = {
    increase: (
      <ArrowDownIcon className="u-margin-right Icons-c-icon-rotate--180 t-color-positive" />
    ),
    decrease: <ArrowDownIcon className="u-margin-right t-color-positive" />,
  };

  return possibilities[props.change] || <div className="u-padding--md" />;
}
