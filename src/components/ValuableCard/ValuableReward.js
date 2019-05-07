// @flow
import React from "react";
import classNames from "classnames";
import Coin from "./Icons/coin.svg";

type Props = {
  ValuableSymbol: React.Node,
  justifyCenter?: boolean,
};

const ValuableReward = ({ ValuableSymbol, justifyCenter }: Props) => {
  const contentClassModifier = justifyCenter
    ? "o-flex-justify--center o-flex-align--center"
    : "";

  return (
    <div
      className={classNames(
        "c-valuable-reward u-position-relative",
        contentClassModifier
      )}
    >
      <div className="c-valuable-reward__content u-position-absolute u-font-weight-bold">
        <ValuableSymbol />
      </div>
      <Coin />
    </div>
  );
};

export default ValuableReward;
