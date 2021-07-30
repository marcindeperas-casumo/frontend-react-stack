import React from "react";
import Flex from "@casumo/cmp-flex";
import { RotatingSymbol } from "./RotatingSymbol/RotatingSymbol";

export const SymbolWithPots = ({ height, width, isSmall, potSvgsForIntro }) => {
  const potIconSize = height / (isSmall ? 1.5 : 1.7);
  const rotatingSymbolSize = height * 1.2;
  const padding = isSmall
    ? "u-padding-bottom u-padding-x--md"
    : "u-padding-bottom--md u-padding-x--md";

  const potImages = potSvgsForIntro.map((x, i) => (
    <Flex.Item style={{ height: potIconSize, width: potIconSize }} key={i}>
      <img src={x} />
    </Flex.Item>
  ));
  // eslint-disable-next-line fp/no-mutating-methods
  potImages.reverse().splice(
    potSvgsForIntro.length % 2 === 0 ? potSvgsForIntro.length / 2 : 0,
    0,
    <Flex.Item
      style={{
        width: rotatingSymbolSize,
        height: rotatingSymbolSize,
      }}
    >
      <RotatingSymbol size={rotatingSymbolSize} />
    </Flex.Item>
  );

  return (
    <div
      style={{
        width,
        height,
        top: `-${height / 2}px`,
        left: `-${width / 2}px`,
      }}
      className="o-position--absolute u-font-lg u-font-weight-bold t-background-purple-50 t-color-yellow-30 u-text-align-center"
    >
      <Flex
        className={`u-height--full ${padding}`}
        spacing={isSmall ? "md" : "xlg"}
        justify="center"
        align="end"
      >
        {potImages}
      </Flex>
    </div>
  );
};
