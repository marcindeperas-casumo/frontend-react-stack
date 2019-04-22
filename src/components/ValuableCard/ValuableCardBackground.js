/* @flow */
import React from "react";
import type { Node } from "react";
import classNames from "classnames";
import Flex from "@casumo/cmp-flex";
import Valuable from "Components/Valuable";
import Background from "./background.svg";

type Props = {
  background: String,
  coin: String,
  children: Node,
};

const ValuableCardBackground = ({ background, coin, children }: Props) => {
  //TODO: check solution toString
  // (Cannot coerce coin to string because String [1] should not be coerced.)
  const backgroundClass = `t-color-${background.toString()}`;
  const coinClass = `t-color-${coin.toString()}`;

  return (
    <Flex justify="center" className="t-border-r--16">
      <Background
        className={classNames("u-position-absolute", backgroundClass)}
      />
      <div className={classNames("u-margin-top--lg u-padding--sm", coinClass)}>
        <Valuable content={children} />
      </div>
    </Flex>
  );
};

export default ValuableCardBackground;
