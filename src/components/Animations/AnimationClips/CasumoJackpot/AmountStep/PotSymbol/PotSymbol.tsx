import React from "react";
import PotBorder from "./potBorder.svg";
import Pot1 from "./pot1.svg";
import Pot2 from "./pot2.svg";
import Pot3 from "./pot3.svg";
import Pot4 from "./pot4.svg";

const POTS_MAP = {
  pot1: Pot1,
  pot2: Pot2,
  pot3: Pot3,
  pot4: Pot4,
};

export const PotSymbol = ({
  size,
  potKey,
}: {
  size: number;
  potKey: string;
}) => {
  const rotatingSymbolSize = size * 1.5;
  const potSymbolSize = rotatingSymbolSize * 0.7;

  const PotSymbolSvg = POTS_MAP[potKey];

  return (
    <div
      className="o-position--absolute"
      style={{
        top: "-120%",
        left: `calc(50% - ${rotatingSymbolSize / 2}px)`,
        width: rotatingSymbolSize,
        height: rotatingSymbolSize,
      }}
    >
      <PotBorder className="c-rotating-symbol__backplate" />
      <div
        className="o-position--absolute"
        style={{
          top: `calc(50% - ${potSymbolSize / 2}px)`,
          left: `calc(50% - ${potSymbolSize / 2}px)`,
          width: potSymbolSize,
        }}
      >
        <PotSymbolSvg />
      </div>
    </div>
  );
};
