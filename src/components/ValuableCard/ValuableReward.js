// @flow
import React from "react";
import Flex from "@casumo/cmp-flex";
// import Star from "./Icons/star.svg";
import Coin from "./Icons/coin.svg";

type Props = {
  ValuableSymbol: React.Node,
};

const ValuableReward = ({ ValuableSymbol }: Props) => {
  return (
    <div className="c-valuable-reward u-position-relative o-flex-justify--center o-flex-align--center u-text-justify-center">
      <div className="c-valuable-reward__content u-position-absolute u-font-weight-bold">
        <ValuableSymbol />
      </div>
      <Coin />
    </div>
    // <Flex
    //   className="c-valuable-reward u-position-relative"
    //   align="center"
    //   justify="center"
    // >
    //   <Coin />
    //   <div className="c-valuable-reward__content u-position-absolute u-font-weight-bold">
    //     <ValuableSymbol />
    //   </div>
    // </Flex>
  );
};

export default ValuableReward;
