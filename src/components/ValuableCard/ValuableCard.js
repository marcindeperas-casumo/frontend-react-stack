// @flow
import React, { PureComponent } from "react";
import Flex from "@casumo/cmp-flex";
import Valuable from "Components/Valuable";
import ValuableCardBackground from "./ValuableCardBackground";
import "./ValuableCard.scss";

type Props = {};

class ValuableCard extends PureComponent<Props> {
  ValuableCoin = () => <Valuable />;

  render() {
    return (
      <Flex
        className="c-valuable-card u-drop-shadow t-background-white t-border-r--16 u-padding"
        justify="center"
        direction="vertical"
      >
        <Flex.Block>
          <ValuableCardBackground ValuableCoin={this.ValuableCoin} />
        </Flex.Block>
        <Flex.Item className="c-valuable-card__content u-text-align-center">
          <div className="t-color-grey-dark-2 u-font-weight-bold">
            20 Bonus Spins
          </div>
        </Flex.Item>
      </Flex>
    );
  }
}

export default ValuableCard;
