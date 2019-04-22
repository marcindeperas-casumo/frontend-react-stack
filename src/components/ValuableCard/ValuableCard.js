// @flow
import React, { PureComponent } from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { valuableToColor, VALUABLE_TYPES } from "Models/valuables";
import ValuableCardBackground from "./ValuableCardBackground";
import { ValuableIcons } from "./ValuableIcons.utils";
import "./ValuableCard.scss";

type ValuableType = $Values<VALUABLE_TYPES>;

type Props = {
  title: string,
  valuableType: ValuableType,
};

class ValuableCard extends PureComponent<Props> {
  get valuableTheme() {
    const { valuableType } = this.props;

    return valuableToColor[valuableType] || valuableToColor["default"];
  }

  get valuableSymbol() {
    const { valuableType } = this.props;

    if (valuableType === VALUABLE_TYPES.CASH) {
      return this.cashSymbol;
    }

    return ValuableIcons[valuableType];
  }

  cashSymbol = () => {
    return (
      <Text tag="div" size="lg">
        €
      </Text>
    );
  };

  render() {
    const { title } = this.props;
    const ValuableSymbol = this.valuableSymbol;

    return (
      <Flex
        className="c-valuable-card u-drop-shadow t-background-white t-border-r--16 u-padding-top"
        direction="vertical"
      >
        <Flex.Block>
          <ValuableCardBackground {...this.valuableTheme}>
            <ValuableSymbol />
          </ValuableCardBackground>
        </Flex.Block>
        <Flex.Item className="c-valuable-card__content u-text-align-center">
          <div className="t-color-grey-dark-2 u-font-weight-bold">{title}</div>
        </Flex.Item>
      </Flex>
    );
  }
}

export default ValuableCard;
