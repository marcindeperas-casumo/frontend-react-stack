// @flow
import { equals, anyPass } from "ramda";
import {
  type ValuableDetailsTranslations,
  type ValuableRequirementType,
  type ValuableType,
  type ValuableState,
  VALUABLE_STATES,
  VALUABLE_TYPES,
  VALUABLE_REQUIREMENT_TYPES,
} from "Models/valuables";

export const depositUrl = "/en/cash/deposit";
export const gameBrowserUrl = "/en/games/top";

export const getValuableDetailsAction = ({
  valuableType,
  valuableState,
  requirementType,
  translations,
}: {
  valuableType: ValuableType,
  valuableState: ValuableState,
  requirementType?: ValuableRequirementType,
  translations: ValuableDetailsTranslations,
}): {
  text: string,
  url: string,
} => {
  const isCash = equals(valuableType, VALUABLE_TYPES.CASH);
  const isSpins = equals(valuableType, VALUABLE_TYPES.SPINS);

  const setActionProps = (text = "", url = "") => ({
    text,
    url,
  });

  if (equals(valuableType, VALUABLE_TYPES.DEPOSIT)) {
    return setActionProps(translations.depositToUnlockLabel, depositUrl);
  }

  if (anyPass(isSpins, isCash)) {
    if (equals(valuableState, VALUABLE_STATES.LOCKED)) {
      if (equals(requirementType, VALUABLE_REQUIREMENT_TYPES.DEPOSIT)) {
        return setActionProps(translations.depositToUnlockLabel, depositUrl);
      }

      return setActionProps(translations.playToUnlockLabel, gameBrowserUrl);
    }

    return isSpins
      ? setActionProps(translations.playNowLabel)
      : setActionProps(translations.playNowLabel, gameBrowserUrl);
  }

  return setActionProps();
};
