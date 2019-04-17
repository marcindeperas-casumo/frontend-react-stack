// @flow
import React, { PureComponent } from "react";
import classNames from "classnames";
import Flex from "@casumo/cmp-flex";
import Valuable from "Components/Valuable";
import { valuableToColor, VALUABLE_TYPES } from "Models/valuables";
import Background from "./background.svg";

type ValuableType = $Values<VALUABLE_TYPES>;

type Props = {
  valuableType: ValuableType,
};

class ValuableCardBackground extends PureComponent<Props> {
  get valuableColors() {
    const { valuableType } = this.props;

    return valuableToColor[valuableType] || "black"; //TODO: revise the default
  }

  render() {
    const themeColors = this.valuableColors;

    return (
      <Flex justify="center" className="u-position-relative t-border-r--16">
        <Background
          className={classNames(
            "u-position-absolute",
            `t-color-${themeColors.background}`
          )}
        />
        <div
          className={classNames(
            "u-margin-top--lg u-padding--sm",
            `t-color-${themeColors.coin}`
          )}
        >
          <Valuable />
        </div>
      </Flex>
    );
  }
}

export default ValuableCardBackground;

/*

// #FFF9C7
<div className="u-position-absolute">
  <BackgroundSVG colour1="#FFF9C7" colour2="#FFC930" colour3="#FFFCBE" />
</div>
*/ // #FFC930 t-color-yellow
// #FFFCBE
