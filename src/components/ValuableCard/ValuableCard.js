// @flow
import React, { PureComponent } from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import classNames from "classnames";
import { compose, prop } from "ramda";
import { VALUABLE_TYPES, VALUABLE_STATES } from "Models/valuables";
import { getSymbolForCurrency } from "Utils";
import { ValuableHeaderBackground } from "./ValuableHeaderBackground";
import { ValuableCardStateBadge } from "./ValuableCardStateBadge";
import {
  VALUABLE_ICON,
  CoinValueToSpinType,
  ExpiryInHours,
} from "./ValuableCard.utils";
import { ValuableReward } from "./ValuableReward";
import Time from "./Icons/time.svg";
import Padlock from "./Icons/padlock.svg";
import "./ValuableCard.scss";

type ValuableType = $Values<VALUABLE_TYPES>;

type Game = {
  backgroundImage: string,
  name: string,
};

type Props = {
  id: string,
  title: string,
  valuableType: ValuableType,
  currency: string,
  valuableType: ValuableType,
  coinValue: number,
  game: Game,
  market: string,
  backgroundImageUrl: string,
  caveat: string,
  valuableState: string,
  expiryDate: Date,
};

export class ValuableCard extends PureComponent<Props> {
  get valuableSymbol() {
    const { valuableType } = this.props;

    if (valuableType === VALUABLE_TYPES.CASH) {
      return this.cashSymbol;
    }

    if (valuableType === VALUABLE_TYPES.SPINS) {
      return compose(
        prop(this.spinType),
        prop(valuableType)
      )(VALUABLE_ICON);
    }

    return VALUABLE_ICON[valuableType];
  }

  get headerClassModifier(): string {
    const { valuableType } = this.props;
    const isValuableTypeSpins = valuableType === VALUABLE_TYPES.SPINS;

    return classNames(
      `c-valuable-card--${valuableType}`,
      isValuableTypeSpins && this.spinType
    );
  }

  get stateBadgeOptions(): Object {
    const badgeOpts = (
      text,
      badgeClassModifiers,
      badgeIcon,
      visible = true
    ) => ({
      visible,
      text,
      badgeClassModifiers,
      badgeIcon,
    });
    const { valuableState, expiryDate } = this.props;

    if (valuableState === VALUABLE_STATES.LOCKED) {
      const className = "t-color-black";
      return badgeOpts(VALUABLE_STATES.LOCKED, className, () => <Padlock />);
    }

    const expiryInHours = ExpiryInHours(expiryDate);
    const hrs24 = 24;

    if (expiryInHours <= hrs24) {
      const className = "t-color-red";
      return badgeOpts(`${expiryInHours}h`, className, () => <Time />);
    }

    return { ...badgeOpts, visible: false };
  }

  // To move this to graphql
  get spinType() {
    return CoinValueToSpinType(this.props.coinValue);
  }

  cashSymbol = () => {
    const { market: locale, currency } = this.props;
    const currencySymbol = getSymbolForCurrency({ currency, locale });

    return (
      <Text tag="div" size="lg">
        {currencySymbol}
      </Text>
    );
  };

  render() {
    const {
      id,
      title,
      valuableType,
      game,
      backgroundImageUrl,
      caveat,
      valuableState,
    } = this.props;
    const isValuableTypeSpins = valuableType === VALUABLE_TYPES.SPINS;
    const isValuableTypeCash = valuableType === VALUABLE_TYPES.CASH;
    const blurAmount = 3;
    const stateBadgeOptions = this.stateBadgeOptions;
    const showStateBadge =
      stateBadgeOptions.visible || valuableState !== VALUABLE_STATES.FRESH;

    return (
      <div className="c-valuable-card-wrapper u-position-relative">
        <Flex
          className="c-valuable-card u-drop-shadow t-background-white t-border-r--16 u-padding-top"
          direction="vertical"
          gap="none"
        >
          <Flex.Block>
            <ValuableHeaderBackground
              className={this.headerClassModifier}
              imageUrl={
                isValuableTypeSpins ? game.backgroundImage : backgroundImageUrl
              }
              id={id}
              blur={isValuableTypeSpins ? blurAmount : 0}
            >
              <ValuableReward
                ValuableSymbol={this.valuableSymbol}
                justifyCenter={isValuableTypeCash}
              />
            </ValuableHeaderBackground>
          </Flex.Block>
          <Flex.Item className="c-valuable-card__content u-text-align-center">
            <div className="t-color-grey-dark-2 u-font-weight-bold u-font">
              {title}
            </div>
            {isValuableTypeSpins && (
              <div className="c-valuable-card__content-description t-color-grey u-font-xs u-margin-top">
                {game.name}
              </div>
            )}
          </Flex.Item>
        </Flex>
        <div
          data-test="valuableCard-caveat"
          className="t-color-grey u-font-xs u-margin-top u-text-align-center"
        >
          {caveat}
        </div>
        {showStateBadge && (
          <ValuableCardStateBadge
            {...stateBadgeOptions}
            className={classNames(
              "c-valuable-card-state u-font-xs t-background-white t-color-red u-padding u-position-absolute",
              stateBadgeOptions.badgeClassModifiers
            )}
          />
        )}
      </div>
    );
  }
}
