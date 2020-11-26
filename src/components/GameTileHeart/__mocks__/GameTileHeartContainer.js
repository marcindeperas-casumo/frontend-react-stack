// @flow
import React from "react";
import Flex from "@casumo/cmp-flex";
import { GameTileHeart } from "Components/GameTileHeart/GameTileHeart";

export const GameTileHeartContainer = ({
  heartClassName = "u-padding u-width--2xlg",
  containerClassName = "",
}: {
  heartClassName?: string,
  containerClassName?: string,
}) => {
  return (
    <Flex.Item
      className={containerClassName}
      onClick={e => e.stopPropagation()}
    >
    <GameTileHeart
      className={heartClassName}
      onClick={() => null}
      isActive={false}
    />
    </Flex.Item>
  );
};
