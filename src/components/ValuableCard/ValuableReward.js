// @flow
import React from "react";
import Flex from "@casumo/cmp-flex";
import Star from "./Icons/star.svg";
import Coin from "./Icons/coin.svg";

type Props = {
  ValuableSymbol: React.Node,
  rewardLevel: number,
};

type StarsProps = {
  starAmount: number,
};

const Stars = ({ starAmount }: StarsProps) => {
  return (
    <Flex
      className="c-stars u-width--1/1"
      justify="space-around"
      direction="horizontal"
    >
      {starAmount > 0 && <Star className="u-margin-top--sm" />}
      {starAmount > 2 && <Star />}
      {starAmount > 1 && <Star className="u-margin-top--sm" />}
    </Flex>
  );
};

// TODO: add space between stars & symbol
const ValuableReward = ({ ValuableSymbol, rewardLevel }: Props) => {
  return (
    <Flex
      className="c-valuable-reward u-position-relative"
      align="center"
      justify="center"
    >
      <Coin />
      <div className="c-valuable-reward__content u-position-absolute u-font-weight-bold">
        {rewardLevel > 0 && <Stars starAmount={rewardLevel} />}
        <ValuableSymbol />
      </div>
    </Flex>
  );
};

export default ValuableReward;
