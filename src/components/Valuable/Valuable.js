// @flow
import React, { PureComponent } from "react";
import Text from "@casumo/cmp-text";
import Coin from "./coin.svg";
import "./Valuable.scss";

type Props = {
  magnitude: string,
};

class Valuable extends PureComponent<Props> {
  render() {
    const { magnitude } = this.props;

    return (
      <div className="c-valuable o-flex-align--center o-flex-justify--center u-position-relative">
        <Coin className="valuable-icon" />
        <div className="u-position-absolute u-line-height--1 o-flex--vertical o-flex-align--center t-color-yellow-dark-3 u-font-weight-bold">
          <Text tag="div" size="md">
            {magnitude}
          </Text>
          <Text tag="div">€</Text>
        </div>
      </div>
    );
  }
}

export default Valuable;
