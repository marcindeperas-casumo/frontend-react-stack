// @flow
import React, { PureComponent } from "react";
import Text from "@casumo/cmp-text";
import Coin from "./coin.svg";
import "./Valuable.scss";

type Props = {};

class Valuable extends PureComponent<Props> {
  render() {
    return (
      <div className="c-valuable o-flex-align--center o-flex-justify--center u-position-relative">
        <Coin className="valuable-icon" />
        <div className="u-position-absolute o-flex--vertical o-flex-align--center t-color-yellow-dark-3 u-font-weight-bold">
          <Text tag="div" size="lg">
            €
          </Text>
        </div>
      </div>
    );
  }
}

export default Valuable;
