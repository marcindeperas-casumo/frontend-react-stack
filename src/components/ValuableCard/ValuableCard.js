// @flow
import React, { PureComponent } from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { DateTime } from "luxon";
import classNames from "classnames";
import { compose, prop } from "ramda";
import {
  type ValuableType,
  type ValuableState,
  VALUABLE_TYPES,
  VALUABLE_STATES,
} from "Models/valuables";
import { INTL_LOCALES } from "Src/constants";
import { getSymbolForCurrency, interpolate } from "Utils";
import { ValuableHeaderBackground } from "./ValuableHeaderBackground";
import { ValuableCardStateBadge } from "./ValuableCardStateBadge";
import {
  VALUABLE_ICON,
  coinValueToSpinType,
  expiryInHours,
} from "./ValuableCard.utils";
import { ValuableReward } from "./ValuableReward";
import Time from "./Icons/time.svg";
import Padlock from "./Icons/padlock.svg";
import "./ValuableCard.scss";

type Game = {
  backgroundImage: string,
  name: string,
};

type Props = {
  /** Unique id of the valuable */
  id: string,
  /** Title of the valuable */
  title: string,
  /** Valuable type of the valuable */
  valuableType: ValuableType,
  /** currency of the player */
  currency: string,
  /** The coin value of each spin. Applies when valuable is type spins */
  coinValue?: number,
  /** The game on which the spins can be used on. Applies when valuable is type spins */
  game?: Game,
  /** Market of the player */
  market: string,
  /** Background image to be displayed in the Card header */
  backgroundImage: string,
  /** Valuable caveats to be displayed */
  caveat: string,
  /** The state of the valuable */
  valuableState: ValuableState,
  /** The date on which the valuable will expiry */
  expiryDate: DateTime,
  /** Function to be triggered on click of card */
  onCardClick: () => void,
  /** translated label for the 'hours' unit */
  translatedHoursUnit: string,
};

export class ValuableCard extends PureComponent<Props> {
  static defaultProps = {
    valuableState: VALUABLE_STATES.FRESH,
  };

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
    const { valuableState, expiryDate, translatedHoursUnit } = this.props;

    if (valuableState === VALUABLE_STATES.LOCKED) {
      const className = "t-color-black";
      return badgeOpts(VALUABLE_STATES.LOCKED, className, () => <Padlock />);
    }

    const hours = expiryInHours(expiryDate);

    if (hours >= 0 && hours <= 24) {
      const className = "t-color-red";

      return badgeOpts(
        interpolate(translatedHoursUnit, { hours }),
        className,
        () => <Time />
      );
    }

    return { ...badgeOpts, visible: false };
  }

  // To move this to graphql
  get spinType() {
    return coinValueToSpinType(this.props.coinValue);
  }

  cashSymbol = () => {
    const { market, currency } = this.props;
    const currencySymbol = getSymbolForCurrency({
      currency,
      locale: INTL_LOCALES[market],
    });

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
      backgroundImage,
      caveat,
      valuableState,
      onCardClick,
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
          onClick={onCardClick}
          data-test="valuable-card"
          className="c-valuable-card u-drop-shadow t-background-white t-border-r--16 u-padding-top"
          direction="vertical"
          gap="none"
        >
          <Flex.Block>
            <ValuableHeaderBackground
              className={this.headerClassModifier}
              imageUrl={
                isValuableTypeSpins && game
                  ? game.backgroundImage
                  : backgroundImage
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
            {isValuableTypeSpins && game && (
              <div className="c-valuable-card__content-description t-color-grey u-font-xs u-margin-top">
                {game.name}
              </div>
            )}
          </Flex.Item>
        </Flex>
        <div
          data-test="valuableCard-caveat"
          className="t-color-grey u-font-2xs u-margin-top u-text-align-center"
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
