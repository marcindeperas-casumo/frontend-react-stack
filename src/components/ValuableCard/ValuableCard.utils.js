import {
  VALUABLE_TYPES,
  VALUABLE_STATES,
  VALUABLE_SPIN_TYPES,
} from "Models/valuables";
import {
  DepositIcon,
  SportIcon,
  BasicSpinsIcon,
  BonusSpinsIcon,
  SuperSpinsIcon,
  MegaSpinsIcon,
} from "./Valuable.icons";

// To move these urls somwhere more localised
export const VALUABLE_LOCKED_URL = "/en/player/valuables";
export const VALUABLE_DEPOSIT_URL = "/en/cash/deposit";

const VALUABLE_REDIRECT_URL = {
  [VALUABLE_STATES.LOCKED]: VALUABLE_LOCKED_URL,
  [VALUABLE_TYPES.DEPOSIT]: VALUABLE_DEPOSIT_URL,
};

export const VALUABLE_ICON = {
  [VALUABLE_TYPES.DEPOSIT]: DepositIcon,
  [VALUABLE_TYPES.SPINS]: {
    [VALUABLE_SPIN_TYPES.BASIC_SPINS]: BasicSpinsIcon,
    [VALUABLE_SPIN_TYPES.BONUS]: BonusSpinsIcon,
    [VALUABLE_SPIN_TYPES.SUPER]: SuperSpinsIcon,
    [VALUABLE_SPIN_TYPES.MEGA]: MegaSpinsIcon,
  },
  [VALUABLE_TYPES.SPORT]: SportIcon,
};

export const coinValueToSpinType = coinValue => {
  if (coinValue > 0.3 && coinValue <= 0.9) {
    return VALUABLE_SPIN_TYPES.BONUS;
  } else if (coinValue > 0.9 && coinValue <= 3) {
    return VALUABLE_SPIN_TYPES.SUPER;
  } else if (coinValue > 3) {
    return VALUABLE_SPIN_TYPES.MEGA;
  }

  return VALUABLE_SPIN_TYPES.BASIC_SPINS;
};

export const getCardUrl = (valuableState, valuableType) => {
  if (valuableState === VALUABLE_STATES.LOCKED) {
    return VALUABLE_REDIRECT_URL[valuableState];
  }

  return VALUABLE_REDIRECT_URL[valuableType] || null;
};
