// @flow

import {
  VALUABLE_TYPES,
  VALUABLE_STATES,
  VALUABLE_SPIN_TYPES,
  VALUABLE_LOCKED_URL,
  VALUABLE_DEPOSIT_URL,
} from "./valuables.constants";
import type { ValuableState } from "./valuables.types";

export const coinValueToSpinType = (coinValue: number = 0) => {
  if (coinValue > 0.3 && coinValue <= 0.9) {
    return VALUABLE_SPIN_TYPES.BONUS;
  } else if (coinValue > 0.9 && coinValue <= 3) {
    return VALUABLE_SPIN_TYPES.SUPER;
  } else if (coinValue > 3) {
    return VALUABLE_SPIN_TYPES.MEGA;
  }

  return VALUABLE_SPIN_TYPES.BASIC_SPINS;
};

export const getCardUrl = (
  valuableState: ValuableState,
  valuableType: ValuableType
) => {
  if (valuableState === VALUABLE_STATES.LOCKED) {
    return VALUABLE_LOCKED_URL;
  }
  if (valuableType === VALUABLE_TYPES.DEPOSIT) {
    return VALUABLE_DEPOSIT_URL;
  }

  return null;
};
