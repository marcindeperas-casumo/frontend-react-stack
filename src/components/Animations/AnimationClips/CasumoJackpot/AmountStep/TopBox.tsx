import React from "react";
import Flex from "@casumo/cmp-flex";
import { interpolate } from "Utils";

export const TopBox = ({ isSmall, height, width, t, potName, potColor }) => {
  const letterSpacing = isSmall ? "3px" : "6px";
  const fontSize = isSmall ? "" : "u-font-lg";

  return (
    <div
      style={{
        width,
        height,
        top: `-${height / 2}px`,
        left: `-${width / 2}px`,
        backgroundColor: potColor,
      }}
      className="o-position--absolute"
    >
      <Flex
        className={`u-text-align-center u-font-weight-bold u-height--full ${fontSize}`}
        direction="vertical"
        align="center"
        justify="center"
        spacing={isSmall ? "xs" : ""}
        style={{ letterSpacing }}
      >
        <Flex.Item className="t-color-white">{t.jackpotWinTextRow}</Flex.Item>
        <Flex.Item className="t-color-purple-80">
          {interpolate(t.jackpotTypeTextRow, {
            potName: potName.toUpperCase(),
          })}
        </Flex.Item>
      </Flex>
    </div>
  );
};
