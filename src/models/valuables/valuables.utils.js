// @flow
import {
  type ValuableDetailsTranslations,
  type ValuableType,
  VALUABLE_REQUIREMENT_TYPES,
  VALUABLE_TYPES,
} from "Models/valuables";

export const unlockedValuableActionText = (
  valuableType: ValuableType,
  translations: ValuableDetailsTranslations
): string => {
  return {
    [VALUABLE_TYPES.DEPOSIT]: translations.depositNowLabel,
    [VALUABLE_TYPES.CASH]: translations.playNowLabel,
    [VALUABLE_TYPES.SPINS]: translations.playNowLabel,
  }[valuableType];
};

export const lockedValuableActionText = (
  valuableType: ValuableType,
  translations: ValuableDetailsTranslations
) => {
  return {
    [VALUABLE_TYPES.CASH]: {
      [VALUABLE_REQUIREMENT_TYPES.WAGER]: translations.playToUnlockLabel,
      [VALUABLE_REQUIREMENT_TYPES.DEPOSIT]: translations.depositToUnlockLabel,
    },
    [VALUABLE_TYPES.SPINS]: {
      [VALUABLE_REQUIREMENT_TYPES.WAGER]: translations.playToUnlockLabel,
      [VALUABLE_REQUIREMENT_TYPES.DEPOSIT]: translations.depositToUnlockLabel,
    },
  }[valuableType];
};
