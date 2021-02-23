/* @flow */
import * as React from "react";
import { LockIcon, TimeLockedIcon, ActiveIcon } from "@casumo/cmp-icons";
// @ts-expect-error ts-migrate(2305) FIXME: Module '"../../models/valuables"' has no exported ... Remove this comment to see the full error message
import { type ValuableState, VALUABLE_STATES } from "Models/valuables";

type Props = {
  state: ValuableState,
  // @ts-expect-error ts-migrate(2694) FIXME: Namespace 'React' has no exported member 'Node'.
  label?: React.Node,
};

export const ValuableStateIndicator = ({ state, label }: Props) => {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'LOCKED' does not exist on type '{}'.
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
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'USED' does not exist on type '{}'.
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
