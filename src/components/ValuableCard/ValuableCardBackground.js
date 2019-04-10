// @flow
import React, { PureComponent } from "react";
import Background from "./background.svg";

type Props = {};

class ValuableCardBackground extends PureComponent<Props> {
  render() {
    return (
      <div className="c-valuable-card-background">
        <Background />
      </div>
    );
  }
}

export default ValuableCardBackground;
