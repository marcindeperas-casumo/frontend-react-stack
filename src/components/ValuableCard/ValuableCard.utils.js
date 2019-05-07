import { VALUABLE_SPIN_TYPES } from "Models/valuables";

export const CoinValueToSpinType = coinValue => {
  if (coinValue >= 0.1 && coinValue <= 0.3) {
    return VALUABLE_SPIN_TYPES.BASIC_SPINS;
  } else if (coinValue > 0.3 && coinValue <= 0.9) {
    return VALUABLE_SPIN_TYPES.BONUS;
  } else if (coinValue > 0.9 && coinValue <= 3) {
    return VALUABLE_SPIN_TYPES.SUPER;
  } else if (coinValue > 3) {
    return VALUABLE_SPIN_TYPES.MEGA;
  }

  return VALUABLE_SPIN_TYPES.BASIC_SPINS;
};
