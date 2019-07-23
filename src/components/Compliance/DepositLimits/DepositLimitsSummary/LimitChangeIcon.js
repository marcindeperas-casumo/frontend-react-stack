// @flow
import * as React from "react";
import { ArrowDownIcon } from "@casumo/cmp-icons";
import type { LimitChange } from "./utils";

export function LimitChangeIcon(props: { change: LimitChange }) {
  const possibilities: { [LimitChange]: React.Node } = {
    increase: (
      <ArrowDownIcon
        className="u-margin-right Icons-c-icon-rotate--180"
        style={{ color: "#00CD66" }}
      />
    ),
    decrease: (
      <ArrowDownIcon className="u-margin-right" style={{ color: "#00CD66" }} />
    ),
  };

  return possibilities[props.change] || <div className="u-padding--md" />;
}
