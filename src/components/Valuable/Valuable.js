// @flow
import React, { PureComponent } from "react";
import Coin from "./coin.svg";
import "./Valuable.scss";

type Props = {};

class Valuable extends PureComponent<Props> {
  render() {
    return (
      <div className="c-valuable o-flex-align--center o-flex-justify--center u-position-relative">
        <Coin className="valuable-icon" />
        <div className="u-position-absolute u-line-height--1 o-flex--vertical o-flex-align--center t-color-yellow-dark-3 u-font-weight-bold u-font--med">
          <div className="u-font-md">20</div>
          <div>€</div>
        </div>
      </div>
    );
  }
}

export default Valuable;
