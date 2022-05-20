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
  VALUABLE_CIRCLE_LOCK_ICON,
  VALUABLE_CIRCLE_CLAIM_ICON,
} from "Models/valuables";
import type {
  ValuableState,
  DurationProps,
  ValuableThumbnailTranslations as Translations,
} from "Models/valuables";
import { AllValuableTypes, ValuableSymbol } from "./ValuableSymbol";
import "./ValuableThumbnail.scss";
import Coin from "./Icons/coin.svg";
import Cashback from "./Icons/cashback.svg";
import { ClaimSymbol } from "./icons";

type Props = {
  /** Valuable type of the valuable */
  valuableType: AllValuableTypes;
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
  valuableBadgeName: string;
  size?: "small" | "large";
  itemImage?: string;
};

const getValuableTypeChristmasAware = (
  badgeRuleName: string,
  valuableType: AllValuableTypes
) => {
  const christmasRelatedBadgeRule = {
    "christmas-fs_fb_gold": VALUABLE_TYPES.CHRISTMAS_SPECIAL_DEPOSIT_GOLD,
    "xmas21-fs_fb_gold_locked": VALUABLE_TYPES.CHRISTMAS_SPECIAL_DEPOSIT_GOLD,
    "christmas21-fs_fb_silver": VALUABLE_TYPES.CHRISTMAS_SPECIAL_DEPOSIT_SILVER,
    "christmas21-fs_fb_silver_locked":
      VALUABLE_TYPES.CHRISTMAS_SPECIAL_DEPOSIT_SILVER,
  };

  if (!Object.keys(christmasRelatedBadgeRule).includes(badgeRuleName)) {
    return valuableType;
  }

  return christmasRelatedBadgeRule[badgeRuleName];
};

const isChristmasCampaignRelated = (badgeRuleName: string) => {
  return /christmas|xmas+/u.test(badgeRuleName);
};

export type TLockIcon =
  | typeof VALUABLE_CIRCLE_LOCK_ICON
  | typeof VALUABLE_CIRCLE_CLAIM_ICON;

type ValuableCoinProps = {
  awardType?: A.WageringLockAwardType;
  coinValue?: number;
  currency: string;
  size?: "small" | "large";
  valuableType: AllValuableTypes;
  lockIcon?: TLockIcon;
  valuableBadgeName: string;
  className?: string;
  itemImage?: string;
};

export const ValuableCoin = ({
  awardType,
  coinValue,
  currency,
  size = "large",
  valuableType,
  lockIcon,
  valuableBadgeName = "",
  className,
  itemImage,
}: ValuableCoinProps) => {
  const spinType = coinValueToSpinType(coinValue);
  const baseClass = className || `c-valuable-card-thumbnail-coin--${size}`;
  const valuableTypeChristmasAware = getValuableTypeChristmasAware(
    valuableBadgeName,
    valuableType
  );

  return (
    <div
      className={`${baseClass} u-margin-bottom--sm o-ratio o-ratio--valuable-card-thumbnail-coin`}
    >
      {itemImage && isChristmasCampaignRelated(valuableBadgeName) ? (
        <div className={classNames("o-ratio__content")}>
          <img className="u-width--full" alt="" src={itemImage} />
        </div>
      ) : (
        <>
          <div
            className={classNames(
              "o-ratio__content",
              getCoinClassModifier(valuableType, awardType)
            )}
          >
            {([VALUABLE_TYPES.CASHBACK] as AllValuableTypes[]).includes(
              valuableType
            ) ? (
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
            {lockIcon === "claim" && <ClaimSymbol />}
            <ValuableSymbol
              awardType={awardType}
              currency={currency}
              spinType={spinType}
              valuableType={valuableTypeChristmasAware}
              size={size === "small" ? "sm" : "default"}
            />
          </Flex>
        </>
      )}
    </div>
  );
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
  valuableBadgeName,
  itemImage,
}: Props) => {
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
        <ValuableCoin
          itemImage={itemImage}
          awardType={awardType}
          coinValue={coinValue}
          currency={currency}
          size={size}
          valuableType={valuableType}
          valuableBadgeName={valuableBadgeName}
        />
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
  valuableType: AllValuableTypes,
  awardType?: A.WageringLockAwardType
) {
  // eslint-disable-next-line no-switch-statements/no-switch
  switch (valuableType) {
    case VALUABLE_TYPES.CASH:
    case VALUABLE_TYPES.CASHBACK:
    case VALUABLE_TYPES.BUNDLE_LOCK:
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
    case VALUABLE_TYPES.LIVE_CASINO_FREE_BET:
      return "text-green-30";
    case VALUABLE_TYPES.SPINS:
      return "text-grey-90";
    default:
      return "";
  }
}

function getCoinTextClassModifier(
  valuableType: AllValuableTypes,
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
    case VALUABLE_TYPES.LIVE_CASINO_FREE_BET:
      return "text-grey-70";
    case VALUABLE_TYPES.SPINS:
      return "text-yellow-30";
    default:
      return "text-grey-70";
  }
}
