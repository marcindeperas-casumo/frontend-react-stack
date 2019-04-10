// @flow
import React, { PureComponent } from "react";
import Valuable from "Components/Valuable";
import ValuableBackground from "./ValuableCardBackground";
import "./ValuableCard.scss";

type Props = {};

class ValuableCard extends PureComponent<Props> {
  render() {
    return (
      <div className="c-valuable-card t-border-r--16 o-flex-justify--center t-color-grey">
        <ValuableBackground />
        <div className="c-valuable-card-content o-flex--vertical o-flex-align--center o-flex-justify--space-between">
          <Valuable />
          <div className="t-color-grey-dark-2 u-font-weight-bold">
            <div>20 Bonus Spins</div>
          </div>
        </div>
      </div>
    );
  }
}

export default ValuableCard;
