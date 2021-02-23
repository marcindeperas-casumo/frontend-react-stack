/* @flow */
import * as React from "react";
import { LockIcon, TimeLockedIcon, ActiveIcon } from "@casumo/cmp-icons";
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
  } else if (state === VALUABLE_STATES.USED) {
    return (
      <div className="u-display--inline-block t-color-green-30">
        <ActiveIcon
          size="sm"
          className="u-margin-right--sm"
          style={{ width: "10px", height: "11px" }}
        />
        {label}
      </div>
    );
  }

  return (
    <div className="u-display--inline-block t-color-red-30">
      <TimeLockedIcon
        size="sm"
        className="u-margin-right--sm"
        style={{ width: "10px", height: "11px" }}
      />
      {label}
    </div>
  );
};
