import {
  equals,
  filter,
  sort,
  prop,
  descend,
  pipe,
  head,
  includes,
} from "ramda";
import {
  VALUABLE_STATES,
  VALUABLE_TYPES,
  VALUABLE_REQUIREMENT_TYPES,
  VALUABLE_SPIN_TYPES,
} from "Models/valuables";
import type {
  ValuableDetailsTranslations,
  ValuableRequirementType,
  ValuableType,
  ValuableState,
  ValuableActionProps,
  DurationTranslations,
} from "Models/valuables";
import {
  convertTimestampToLuxonDate,
  getDateTimeDifferenceFromNow,
} from "Utils";

export const depositRouteId = "deposit";
export const gameBrowserRouteId = "games-top";
export const sportsRouteId = "sports";
export const liveCasinoRouteId = "live-casino";
export const inventoryRouteId = "player-valuables";

export const isAboutToExpire = (hours: number): boolean =>
  hours >= 0 && hours <= 24;

export const showStateBadge = (valuableState: ValuableState, hours: number) =>
  valuableState === VALUABLE_STATES.LOCKED ||
  valuableState === VALUABLE_STATES.USED ||
  isAboutToExpire(hours);

export const getValuablesByState = (states: ValuableState[]) =>
  filter(({ valuableState }) => includes(valuableState, states));

export const getValuableDetailsAction = ({
  valuableType,
  valuableState,
  requirementType,
  translations,
}: {
  valuableType: ValuableType;
  valuableState: ValuableState;
  requirementType?: ValuableRequirementType | undefined;
  translations: ValuableDetailsTranslations;
}): ValuableActionProps => {
  const ACTION_PROPS_DEFAULT: ValuableActionProps = {
    text: translations.cashUnlockedActionLabel,
    isDepositBonusSelected: false,
    url: gameBrowserRouteId,
  };

  const isCash = equals(valuableType, VALUABLE_TYPES.CASH);
  const isSpins = equals(valuableType, VALUABLE_TYPES.SPINS);
  const isCashback = equals(valuableType, VALUABLE_TYPES.CASHBACK);
  const isFreeBet = equals(valuableType, VALUABLE_TYPES.FREE_BET);
  const isLiveCasinoFreeBet = equals(
    valuableType,
    VALUABLE_TYPES.LIVE_CASINO_FREE_BET
  );
  const isBundle = equals(valuableType, VALUABLE_TYPES.BUNDLE_LOCK);

  if (equals(valuableType, VALUABLE_TYPES.DEPOSIT)) {
    // The redirection is being taken care of by the KO code, so url is not required
    return {
      ...ACTION_PROPS_DEFAULT,
      url: "",
      text: translations.depositNowLabel,
      isDepositBonusSelected: true,
    };
  }

  if (equals(valuableState, VALUABLE_STATES.LOCKED)) {
    if (equals(requirementType, VALUABLE_REQUIREMENT_TYPES.DEPOSIT)) {
      // The redirection is being taken care of by the KO code, so url is not required
      return {
        ...ACTION_PROPS_DEFAULT,
        url: "",
        text: translations.depositToUnlockLabel,
        isDepositBonusSelected: true,
      };
    }

    if (equals(requirementType, VALUABLE_REQUIREMENT_TYPES.KAMBI_SPORTS_BET)) {
      return {
        ...ACTION_PROPS_DEFAULT,
        url: sportsRouteId,
        text: translations.playToUnlockLabel,
      };
    }

    return {
      ...ACTION_PROPS_DEFAULT,
      text: translations.playToUnlockLabel,
    };
  }

  if (isCash) {
    return {
      text: translations.cashUnlockedActionLabel,
      ...ACTION_PROPS_DEFAULT,
    };
  }

  if (isCashback) {
    const text = equals(valuableState, VALUABLE_STATES.FRESH)
      ? translations.activateCashbackActionLabel
      : translations.playNowLabel;

    return {
      ...ACTION_PROPS_DEFAULT,
      text,
    };
  }

  if (isFreeBet) {
    return {
      ...ACTION_PROPS_DEFAULT,
      text: translations.cashUnlockedActionLabel,
      url: sportsRouteId,
    };
  }

  if (isLiveCasinoFreeBet) {
    return {
      ...ACTION_PROPS_DEFAULT,
      text: translations.cashUnlockedActionLabel, //todo: check what CTA should
      url: liveCasinoRouteId,
    };
  }

  if (isSpins) {
    return {
      ...ACTION_PROPS_DEFAULT,
      text: translations.spinsUnlockedActionLabel,
      url: "",
    };
  }

  if (isBundle) {
    return {
      ...ACTION_PROPS_DEFAULT,
      text: translations.cashUnlockedActionLabel,
      url: inventoryRouteId,
    };
  }

  return ACTION_PROPS_DEFAULT;
};

// TODO: either move this to somewhere more localised
// or refactor to use ISO8601Duration component
// Issue: https://jira.casumocave.com/browse/PRR-65
export function durationToTranslationKey(
  durationKey: DurationTranslations[keyof DurationTranslations],
  value: number
) {
  return {
    days: value > 1 ? "day_plural" : "day_singular",
    hours: value > 1 ? "hour_plural" : "hour_singular",
    minutes: value > 1 ? "minute_plural" : "minute_singular",
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

export const getExpiryTimeLeft = (timestamp: number = 0) => {
  const luxonDate = convertTimestampToLuxonDate(timestamp);

  return getDateTimeDifferenceFromNow(luxonDate);
};

// @ts-expect-error: apply fix if you know the context
export const orderValuablesByCreationTime = sort(descend(prop("created")));

// @ts-expect-error: apply fix if you know the context
export const getLatestValuable = pipe(orderValuablesByCreationTime, head);
