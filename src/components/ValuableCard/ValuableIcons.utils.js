import { VALUABLE_TYPES, VALUABLE_SPIN_TYPES } from "Models/valuables";
import DepositIcon from "./Icons/deposit.svg";
import SportIcon from "./Icons/sport.svg";
import BasicSpinsIcon from "./Icons/spins-1star.svg";
import BonusSpinsIcon from "./Icons/spins-2star.svg";
import SuperSpinsIcon from "./Icons/spins-3star.svg";
import MegaSpinsIcon from "./Icons/spins-4star.svg";

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
