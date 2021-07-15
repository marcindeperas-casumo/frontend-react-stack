import React from "react";
import Backplate from "./Backplate.svg";
import J from "./J.svg";
import "./RotatingSymbol.scss";

const jToPlateWidthRatio = 0.473;
const jToPlateHeightRatio = 0.604;

export const RotatingSymbol = ({ size }) => {
  const jWidth = jToPlateWidthRatio * size;
  const jHeight = jToPlateHeightRatio * size;

  return (
    <div className="u-height--full u-width--full o-position--relative">
      <Backplate className="c-rotating-symbol__backplate" />
      <div
        style={{
          width: jWidth,
          top: `calc(50% - ${jHeight / 2}px)`,
          left: `calc(50% - ${jWidth / 2}px)`,
        }}
        className="o-position--absolute"
      >
        <J />
      </div>
    </div>
  );
};
