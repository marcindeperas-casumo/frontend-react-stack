/* @flow */
import React, { type Node } from "react";
import classNames from "classnames";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { INTL_LOCALES } from "Src/constants";
import {
  type ValuableState,
  VALUABLE_TYPES,
  VALUABLE_STATES,
  coinValueToSpinType,
  getStateBadgeProperties,
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
  size?: "sm" | "lg",
};

export const ValuableThumbnail = ({
  backgroundRenderer,
  coinValue,
  currency,
  expirationTimeInHours,
  market,
  size = "sm",
  valuableState,
  valuableType,
  translatedHoursUnit,
}: Props) => {
  const spinType = coinValueToSpinType(coinValue);
  const stateBadgeProperties = getStateBadgeProperties(
    valuableState,
    expirationTimeInHours,
    translatedHoursUnit
  );
  const showStateBadge =
    size !== "sm" &&
    (stateBadgeProperties.visible || valuableState !== VALUABLE_STATES.FRESH);
  const locale = INTL_LOCALES[market];

  return (
    <div className={`o-ratio o-ratio--valuable-card-header-${size}`}>
      <div className="o-ratio__content t-border-r">{backgroundRenderer}</div>
      <Flex
        align="center"
        className="o-ratio__content"
        data-test="valuable-card-header-coin"
        direction="vertical"
        justify={getCoinAlignment(size)}
      >
        <div
          className={`c-valuable-card-header-coin-wrapper--${size} u-margin-bottom--sm o-ratio o-ratio--valuable-card-coin`}
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
              fontSize={size === "sm" ? "md" : "lg"}
            />
          </Flex>
        </div>
      </Flex>
      {showStateBadge && (
        <div className="o-ratio__content">
          <div className="c-valuable-card__state t-border-r-bottom-right--md u-display--inline-block t-background-white u-padding-bottom u-padding-right">
            <Flex
              align="center"
              className={stateBadgeProperties.classModifiers}
            >
              {stateBadgeProperties.icon}
              <Text
                data-test="valuable-card-header-state-label"
                size="2xs"
                tag="span"
                className="u-font-weight-bold"
              >
                {stateBadgeProperties.text}
              </Text>
            </Flex>
          </div>
        </div>
      )}
    </div>
  );
};

function getCoinAlignment(size: string) {
  if (size === "sm") {
    return "center";
  }

  return "end";
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
