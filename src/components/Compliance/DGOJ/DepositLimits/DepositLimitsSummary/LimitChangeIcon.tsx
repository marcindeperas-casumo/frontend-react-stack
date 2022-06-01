import { ArrowDownIcon, ArrowUpIcon } from "@casumo/cmp-icons";
import * as React from "react";
import type { LimitChangeType } from "Models/playOkay/dgojDepositLimits";

export function LimitChangeIcon(props: { change: LimitChangeType }) {
  const possibilities = {
    increase: <ArrowUpIcon className="u-margin-right text-green-30" />,
    decrease: <ArrowDownIcon className="u-margin-right text-green-30" />,
    created: <ArrowDownIcon className="u-margin-right text-green-30" />,
  };

  return possibilities[props.change] || <div className="u-padding--md" />;
}
