import { VALUABLE_SPIN_TYPES } from "Models/valuables";

export const CoinValueToSpinType = coinValue => {
  if (coinValue >= 0 && coinValue <= 5) {
    return VALUABLE_SPIN_TYPES.BONUS;
  } else if (coinValue > 5 && coinValue <= 10) {
    return VALUABLE_SPIN_TYPES.SUPER;
  }

  return VALUABLE_SPIN_TYPES.MEGA;
};
