import React from "react";
import Flex from "@casumo/cmp-flex";
import Background from "./background.svg";

function ValuableCardBackground({ ValuableCoin }) {
  return (
    <Flex justify="center" className="u-position-relative">
      <Background className="u-position-absolute" />
      <div className="u-margin-top--lg u-padding--sm">
        <ValuableCoin />
      </div>
    </Flex>
  );
}

export default ValuableCardBackground;
