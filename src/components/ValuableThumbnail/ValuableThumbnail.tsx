import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import * as React from "react";
import classNames from "classnames";
import * as A from "Types/apollo";
import { ValuableStateIndicator } from "Components/ValuableStateIndicator";
import { interpolate } from "Utils";
import {
  VALUABLE_TYPES,
  VALUABLE_STATES,
  coinValueToSpinType,
  showStateBadge,
  isAboutToExpire,
} from "Models/valuables";
import type {
  ValuableState,
  DurationProps,
  ValuableThumbnailTranslations as Translations,
} from "Models/valuables";
import { ValuableSymbol } from "./ValuableSymbol";
import "./ValuableThumbnail.scss";
import Coin from "./Icons/coin.svg";
import Cashback from "./Icons/cashback.svg";

type Props = {
  /** Valuable type of the valuable */
  valuableType: A.ValuableType;
  /** award type - applies when valuableType === Wagering Lock */
  awardType?: A.WageringLockAwardType;
  /** currency of the player */
  currency: string;
  /** The coin value of each spin. Applies when valuable is type spins */
  coinValue?: number;
  /** Market of the player */
  market: string;
  /** Background image to be displayed in the Card header */
  backgroundRenderer: React.ReactNode;
  /** The state of the valuable */
  valuableState: ValuableState;
  /** Time left in h, m for the valuable to expire */
  expiryTimeLeft: DurationProps;
  /* Translations of the component */
  translations: Translations;
  size?: "small" | "large";
};

export const ValuableThumbnail = ({
  awardType,
  backgroundRenderer,
  coinValue,
  currency,
  market,
  size = "large",
  expiryTimeLeft,
  valuableState,
  valuableType,
  translations,
}: Props) => {
  const spinType = coinValueToSpinType(coinValue);
  const stateBadgeVisible =
    size !== "small" && showStateBadge(valuableState, expiryTimeLeft.hours);
  const stateBadgeText = getStateBadgeText(
    expiryTimeLeft,
    translations,
    valuableState
  );

  return (
    <div className={`o-ratio o-ratio--valuable-card-thumbnail-${size}`}>
      <div className="o-ratio__content t-border-r">{backgroundRenderer}</div>
      <Flex
        align="center"
        className="o-ratio__content"
        data-test="valuable-card-thumbnail-coin"
        direction="vertical"
        justify={size === "small" ? "center" : "end"}
      >
        <div
          className={`c-valuable-card-thumbnail-coin--${size} u-margin-bottom--sm o-ratio o-ratio--valuable-card-thumbnail-coin`}
        >
          <div
            className={classNames(
              "o-ratio__content",
              getCoinClassModifier(valuableType, awardType)
            )}
          >
            {/* @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'ValuableType' is not assignable ... Remove this comment to see the full error message */}
            {[VALUABLE_TYPES.CASHBACK].includes(valuableType) ? (
              <Cashback className="u-width--full" />
            ) : (
              <Coin className="u-width--full" />
            )}
          </div>
          <Flex
            align="center"
            justify="center"
            className={classNames(
              "o-ratio__content",
              getCoinTextClassModifier(valuableType, awardType)
            )}
          >
            <ValuableSymbol
              awardType={awardType}
              currency={currency}
              spinType={spinType}
              valuableType={valuableType}
              size={size === "small" ? "sm" : "md"}
            />
          </Flex>
        </div>
      </Flex>
      {stateBadgeVisible && (
        <div className="o-ratio__content">
          <div className="c-valuable-card-thumbnail__state u-font-2xs t-border-r-bottom-right--md u-display--inline-block bg-white u-padding-bottom u-padding-right">
            <ValuableStateIndicator
              state={valuableState}
              label={
                <Text size="2xs" tag="span" className="u-font-weight-bold">
                  {stateBadgeText}
                </Text>
              }
            />
          </div>
        </div>
      )}
    </div>
  );
};

function getStateBadgeText(
  expiryTimeLeft: DurationProps,
  translations: Translations,
  valuableState: ValuableState
): string | undefined {
  if (valuableState === VALUABLE_STATES.LOCKED) {
    return translations.lockedListTitleLabel;
  } else if (valuableState === VALUABLE_STATES.USED) {
    return translations.usedListTitleLabel;
  } else if (isAboutToExpire(expiryTimeLeft.hours)) {
    const { minutes, hours } = expiryTimeLeft;

    if (hours < 1) {
      return interpolate(translations.minutesLabel, { value: minutes });
    }

    return interpolate(translations.hoursLabel, { value: hours });
  }

  return null;
}

function getCoinClassModifier(
  valuableType: A.ValuableType,
  awardType?: A.WageringLockAwardType
) {
  // eslint-disable-next-line no-switch-statements/no-switch
  switch (valuableType) {
    case VALUABLE_TYPES.CASH:
    case VALUABLE_TYPES.CASHBACK:
      return "text-yellow-30";
    case VALUABLE_TYPES.WAGERING_LOCK:
      if (awardType === "spins") {
        return "text-grey-90";
      }

      if (["freeMoney", "bonusMoney"].includes(awardType)) {
        return "text-yellow-30";
      }

      return "text-yellow-30";
    case VALUABLE_TYPES.DEPOSIT:
      return "text-blue-50";
    case VALUABLE_TYPES.SPORT:
    case VALUABLE_TYPES.FREE_BET:
      return "text-green-30";
    case VALUABLE_TYPES.SPINS:
      return "text-grey-90";
    default:
      return "";
  }
}

function getCoinTextClassModifier(
  valuableType: A.ValuableType,
  awardType?: A.WageringLockAwardType
) {
  // eslint-disable-next-line no-switch-statements/no-switch
  switch (valuableType) {
    case VALUABLE_TYPES.CASH:
    case VALUABLE_TYPES.CASHBACK:
      return "text-grey-70";
    case VALUABLE_TYPES.WAGERING_LOCK:
      if (awardType === "spins") {
        return "text-yellow-30";
      }

      if (["freeMoney", "bonusMoney"].includes(awardType)) {
        return "text-grey-70";
      }

      return "text-grey-70";
    case VALUABLE_TYPES.DEPOSIT:
      return "text-grey-70";
    case VALUABLE_TYPES.SPORT:
    case VALUABLE_TYPES.FREE_BET:
      return "text-grey-70";
    case VALUABLE_TYPES.SPINS:
      return "text-yellow-30";
    default:
      return "text-grey-70";
  }
}
