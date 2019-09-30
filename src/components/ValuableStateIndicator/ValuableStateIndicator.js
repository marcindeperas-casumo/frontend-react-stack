/* @flow */
import * as React from "react";
import { LockIcon, ClockIcon } from "@casumo/cmp-icons";
import { type ValuableState, VALUABLE_STATES } from "Models/valuables";

type Props = {
  state: ValuableState,
  label?: React.Node,
};

export const ValuableStateIndicator = ({ state, label }: Props) => {
  if (state === VALUABLE_STATES.LOCKED) {
    return (
      <div className="u-display--inline-block t-color-black">
        <LockIcon
          size="sm"
          className="u-margin-right--sm"
          style={{ width: "10px", height: "11px" }}
        />
        {label}
      </div>
    );
  }

  return (
    <div className="u-display--inline-block t-color-red">
      <ClockIcon
        size="sm"
        className="u-margin-right--sm"
        style={{ width: "10px", height: "11px" }}
      />
      {label}
    </div>
  );
};
