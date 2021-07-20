import React from "react";
import Flex from "@casumo/cmp-flex";
import { RotatingSymbol } from "../RotatingSymbol/RotatingSymbol";
import Pot1Img from "./tier1.svg";
import Pot2Img from "./tier2.svg";
import Pot3Img from "./tier3.svg";
import Pot4Img from "./tier4.svg";

export const SymbolWithPots = ({ height, width, isSmall }) => {
  const potIconSize = height / (isSmall ? 1.5 : 1.7);
  const rotatingSymbolSize = height * 1.2;
  const padding = isSmall
    ? "u-padding-bottom u-padding-x--md"
    : "u-padding-bottom--md u-padding-x--md";
  return (
    <div
      style={{
        width,
        height,
        top: `-${height / 2}px`,
        left: `-${width / 2}px`,
      }}
      className="o-position--absolute c-jackpot-win-element u-font-lg u-font-weight-bold t-background-purple-50 t-color-yellow-30 u-text-align-center"
    >
      <Flex
        className={`u-height--full ${padding}`}
        spacing={isSmall ? "md" : "xlg"}
        justify="center"
        align="end"
      >
        <Flex.Item style={{ height: potIconSize, width: potIconSize }}>
          <Pot1Img />
        </Flex.Item>
        <Flex.Item style={{ height: potIconSize, width: potIconSize }}>
          <Pot2Img />
        </Flex.Item>
        <Flex.Item
          style={{
            width: rotatingSymbolSize,
            height: rotatingSymbolSize,
          }}
        >
          <RotatingSymbol size={rotatingSymbolSize} />
        </Flex.Item>
        <Flex.Item style={{ height: potIconSize, width: potIconSize }}>
          <Pot3Img />
        </Flex.Item>
        <Flex.Item style={{ height: potIconSize, width: potIconSize }}>
          <Pot4Img />
        </Flex.Item>
      </Flex>
    </div>
  );
};
