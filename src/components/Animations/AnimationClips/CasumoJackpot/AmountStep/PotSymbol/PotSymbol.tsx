import React from "react";
import PotBorder from "./potBorder.svg";

export const PotSymbol = ({
  size,
  potSvgUrl,
}: {
  size: number;
  potSvgUrl: string;
}) => {
  const rotatingSymbolSize = size * 1.5;
  const potSymbolSize = rotatingSymbolSize * 0.7;

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
      <img
        className="o-position--absolute"
        style={{
          top: `calc(50% - ${potSymbolSize / 2}px)`,
          left: `calc(50% - ${potSymbolSize / 2}px)`,
          width: potSymbolSize,
        }}
        src={potSvgUrl}
      />
    </div>
  );
};
