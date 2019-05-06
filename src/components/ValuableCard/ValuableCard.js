// @flow
import React, { PureComponent } from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { VALUABLE_TYPES } from "Models/valuables";
import { CURRENCY_SYMBOLS } from "Src/constants";
import ValuableHeaderBackground from "./ValuableHeaderBackground";
import { VALUABLE_ICON } from "./ValuableIcons.utils";
import { CoinValueToSpinType } from "./ValuableCard.utils";
import ValuableReward from "./ValuableReward";
import "./ValuableCard.scss";

type ValuableType = $Values<VALUABLE_TYPES>;

type Props = {
  id: string,
  title: string,
  valuableType: ValuableType,
  currency: string,
  valuableType: ValuableType,
  backgroundImageUrl: string,
  coinValue: number,
};

class ValuableCard extends PureComponent<Props> {
  get valuableSymbol() {
    const { valuableType } = this.props;

    if (valuableType === VALUABLE_TYPES.CASH) {
      return this.cashSymbol;
    }

    return VALUABLE_ICON[valuableType];
  }

  get classModifier(): string {
    const { valuableType } = this.props;

    return `c-valuable-card--${valuableType}`;
  }

  // TODO: maybe move to graphql
  get spinType() {
    return CoinValueToSpinType(this.props.coinValue);
  }

  cashSymbol = () => {
    const { currency } = this.props;
    const currencySymbol = CURRENCY_SYMBOLS[currency];

    return (
      <Text tag="div" size="lg">
        {currencySymbol}
      </Text>
    );
  };

  render() {
    const { id, title, valuableType } = this.props;
    const ValuableSymbol = this.valuableSymbol;
    const level0 = 0;

    // TODO: group this
    const rewardLevel =
      valuableType === VALUABLE_TYPES.SPINS ? this.spinType : level0;
    const backgroundImageUrl =
      valuableType === VALUABLE_TYPES.SPINS ? this.props.game.gameImageUrl : "";

    return (
      <Flex
        className="c-valuable-card u-drop-shadow t-background-white t-border-r--16 u-padding-top"
        direction="vertical"
        gap="none"
      >
        <Flex.Block>
          <ValuableHeaderBackground
            className={this.classModifier}
            imageUrl={backgroundImageUrl}
            id={id}
          >
            <ValuableReward
              ValuableSymbol={ValuableSymbol}
              rewardLevel={rewardLevel}
            />
          </ValuableHeaderBackground>
        </Flex.Block>
        {/* TODO: format content */}
        <Flex.Item className="c-valuable-card__content u-text-align-center">
          <div className="t-color-grey-dark-2 u-font-weight-bold u-font">
            {title}
          </div>
          <div className="t-color-grey u-font-xs u-margin-top">Starburst</div>
        </Flex.Item>
      </Flex>
    );
  }
}

export default ValuableCard;
