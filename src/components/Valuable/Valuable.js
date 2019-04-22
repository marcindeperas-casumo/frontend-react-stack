import React from "react";
import Coin from "./icons/coin.svg";
import "./Valuable.scss";

const Valuable = ({ content }) => {
  return (
    <div className="c-valuable o-flex-align--center o-flex-justify--center u-position-relative">
      <Coin />
      <div className="u-position-absolute o-flex--vertical o-flex-align--center t-color-yellow-dark-3 u-font-weight-bold">
        {content}
      </div>
    </div>
  );
};

export default Valuable;
