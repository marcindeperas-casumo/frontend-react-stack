// @flow
import React, { PureComponent } from "react";
import Flex from "@casumo/cmp-flex";
import Valuable from "Components/Valuable";
import ValuableBackground from "./ValuableCardBackground";
import "./ValuableCard.scss";

type Props = {};

class ValuableCard extends PureComponent<Props> {
  render() {
    return (
      <div className="c-valuable-card t-border-r--16 o-flex-justify--center t-color-grey">
        <ValuableBackground />
        <Flex
          className="c-valuable-card__content u-position-absolute"
          direction="vertical"
          justify="space-between"
          align="center"
        >
          <Valuable />
          <div className="t-color-grey-dark-2 u-font-weight-bold">
            <div>20 Bonus Spins</div>
          </div>
        </Flex>
      </div>
    );
  }
}

export default ValuableCard;
