/* @flow */
import {
  equals,
  anyPass,
  filter,
  sort,
  prop,
  descend,
  pipe,
  head,
  includes,
} from "ramda";
import {
  type ValuableDetailsTranslations,
  type ValuableRequirementType,
  type ValuableType,
  type ValuableState,
  type ValuableActionProps,
  VALUABLE_STATES,
  VALUABLE_TYPES,
  VALUABLE_REQUIREMENT_TYPES,
  type DurationTranslations,
  VALUABLE_SPIN_TYPES,
} from "Models/valuables";
import {
  convertTimestampToLuxonDate,
  getDateTimeDifferenceFromNow,
} from "Utils";

export const depositRouteId = "deposit";
export const gameBrowserRouteId = "games-top";

export const isAboutToExpire = (hours: number): boolean =>
  hours >= 0 && hours <= 24;

export const showStateBadge = (valuableState: ValuableState, hours: number) =>
  valuableState === VALUABLE_STATES.LOCKED || isAboutToExpire(hours);

export const getValuablesByState = (states: ValuableState[]) =>
  filter(({ valuableState }) => includes(valuableState, states));

export const getValuableDetailsAction = ({
  valuableType,
  valuableState,
  requirementType,
  translations,
}: {
  valuableType: ValuableType,
  valuableState: ValuableState,
  requirementType?: ?ValuableRequirementType,
  translations: ValuableDetailsTranslations,
}): ValuableActionProps => {
  const isCash = equals(valuableType, VALUABLE_TYPES.CASH);
  const isSpins = equals(valuableType, VALUABLE_TYPES.SPINS);

  const setActionProps = (
    text = "",
    isDepositBonusSelected = false,
    url = ""
  ) => ({
    text,
    isDepositBonusSelected,
    url,
  });

  if (equals(valuableType, VALUABLE_TYPES.DEPOSIT)) {
    // The redirection is being taken care of by the KO code, so url is not required
    return setActionProps(translations.depositNowLabel, true);
  }

  if (anyPass(isSpins, isCash)) {
    if (equals(valuableState, VALUABLE_STATES.LOCKED)) {
      if (equals(requirementType, VALUABLE_REQUIREMENT_TYPES.DEPOSIT)) {
        // The redirection is being taken care of by the KO code, so url is not required
        return setActionProps(translations.depositToUnlockLabel, true);
      }

      return setActionProps(
        translations.playToUnlockLabel,
        false,
        gameBrowserRouteId
      );
    }

    return isSpins
      ? setActionProps(translations.spinsUnlockedActionLabel)
      : setActionProps(
          translations.cashUnlockedActionLabel,
          false,
          gameBrowserRouteId
        );
  }

  return setActionProps();
};

// TODO: either move this to somewhere more localised
// or refactor to use ISO8601Duration component
// Issue: https://jira.casumocave.com/browse/PRR-65
export function durationToTranslationKey(
  durationKey: $Values<DurationTranslations>,
  value: number
): $Keys<DurationTranslations> {
  return {
    days: value > 1 ? "day_plural" : "day_singular",
    hours: value > 1 ? "hour_plural" : "hour_singular",
    minutes: value > 1 ? "minute_plural" : "minute_sungular",
  }[durationKey];
}

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

export const getExpiryTimeLeft = (timestamp: number) => {
  const luxonDate = convertTimestampToLuxonDate(timestamp);

  return getDateTimeDifferenceFromNow(luxonDate);
};

export const orderValuablesByCreationTime = sort(descend(prop("created")));

export const getLatestValuable = pipe(orderValuablesByCreationTime, head);
