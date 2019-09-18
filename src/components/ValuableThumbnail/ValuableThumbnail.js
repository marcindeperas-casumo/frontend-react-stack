/* @flow */
import React, { type Node } from "react";
import classNames from "classnames";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { ValuableStateIndicator } from "Components/ValuableStateIndicator";
import { interpolate } from "Utils";
import { INTL_LOCALES } from "Src/constants";
import {
  type ValuableState,
  VALUABLE_TYPES,
  VALUABLE_STATES,
  coinValueToSpinType,
  showStateBadge,
  isAboutToExpire,
} from "Models/valuables";
import { ValuableSymbol } from "./ValuableSymbol";
import "./ValuableThumbnail.scss";
import Coin from "./Icons/coin.svg";

type Props = {
  /** Valuable type of the valuable */
  valuableType: ValuableType,
  /** currency of the player */
  currency: string,
  /** The coin value of each spin. Applies when valuable is type spins */
  coinValue?: number,
  /** Market of the player */
  market: string,
  /** Background image to be displayed in the Card header */
  backgroundRenderer: Node,
  /** The state of the valuable */
  valuableState: ValuableState,
  /** The date on which the valuable will expiry */
  expirationTimeInHours: number,
  /** translated label for the 'hours' unit */
  translatedHoursUnit: string,
  size?: "small" | "large",
};

export const ValuableThumbnail = ({
  backgroundRenderer,
  coinValue,
  currency,
  expirationTimeInHours,
  market,
  size = "large",
  valuableState,
  valuableType,
  translatedHoursUnit,
}: Props) => {
  const spinType = coinValueToSpinType(coinValue);
  const isFresh = valuableState === VALUABLE_STATES.FRESH;
  const stateBadgeVisible =
    size !== "small" &&
    (showStateBadge(valuableState, expirationTimeInHours) || !isFresh);
  const stateBadgeText = getStatusBadgeText(
    expirationTimeInHours,
    translatedHoursUnit,
    valuableState
  );

  const locale = INTL_LOCALES[market];

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
              getCoinClassModifier(valuableType)
            )}
          >
            <Coin className="u-width--1/1" />
          </div>
          <Flex
            align="center"
            justify="center"
            className={classNames(
              "o-ratio__content",
              getCoinTextClassModifier(valuableType)
            )}
          >
            <ValuableSymbol
              currency={currency}
              locale={locale}
              spinType={spinType}
              valuableType={valuableType}
              fontSize={size === "small" ? "md" : "lg"}
            />
          </Flex>
        </div>
      </Flex>
      {stateBadgeVisible && (
        <div className="o-ratio__content">
          <div className="c-valuable-card-thumbnail__state u-font-2xs t-border-r-bottom-right--md u-display--inline-block t-background-white u-padding-bottom u-padding-right">
            <ValuableStateIndicator
              hoursToExpiry={expirationTimeInHours}
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

function getStatusBadgeText(
  hoursToExpiry: number,
  translatedHoursLabel: string,
  valuableState: ValuableState
): ?string {
  if (valuableState === VALUABLE_STATES.LOCKED) {
    return VALUABLE_STATES.LOCKED;
  }

  if (isAboutToExpire(hoursToExpiry)) {
    return interpolate(translatedHoursLabel, { value: hoursToExpiry });
  }

  return null;
}

function getCoinClassModifier(valuableType: ValuableType) {
  // eslint-disable-next-line no-switch-statements/no-switch
  switch (valuableType) {
    case VALUABLE_TYPES.CASH:
      return "t-color-yellow";
    case VALUABLE_TYPES.DEPOSIT:
      return "t-color-blue-light-1";
    case VALUABLE_TYPES.SPORT:
      return "t-color-green-light-1";
    case VALUABLE_TYPES.SPINS:
      return "t-color-grey-dark-3";
    default:
      return "";
  }
}

function getCoinTextClassModifier(valuableType: ValuableType) {
  // eslint-disable-next-line no-switch-statements/no-switch
  switch (valuableType) {
    case VALUABLE_TYPES.CASH:
      return "t-color-yellow-dark-3";
    case VALUABLE_TYPES.DEPOSIT:
      return "t-color-blue-dark-3";
    case VALUABLE_TYPES.SPORT:
      return "t-color-green-dark-3";
    case VALUABLE_TYPES.SPINS:
      return "t-color-yellow";
    default:
      return "";
  }
}
