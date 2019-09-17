// @flow
import React from "react";
import { LockIcon, ClockIcon } from "@casumo/cmp-icons";
import {
  type ValuableState,
  isAboutToExpire,
  VALUABLE_STATES,
} from "Models/valuables";

type Props = {
  hoursToExpiry: number,
  state: ValuableState,
};

export const ValuableStatusIcon = ({ hoursToExpiry, state }: Props) => {
  if (state === VALUABLE_STATES.LOCKED) {
    return (
      <LockIcon
        size="sm"
        className="u-margin-right--sm"
        style={{ width: "10px", height: "11px" }}
      />
    );
  }

  if (isAboutToExpire(hoursToExpiry)) {
    return (
      <ClockIcon
        size="sm"
        className="u-margin-right--sm"
        style={{ width: "10px", height: "11px" }}
      />
    );
  }

  return null;
};
