// @flow
import React from "react";
import GameTileExclusive from "Components/GameTileExclusive/GameTileExclusive";

// __FIX__: change "id" to "game" here + add Flow typing
export const GameTileExclusiveContainer = ({ id }) => {
  // __FIX__: update all properties to come from the Apollo store
  return (
    <GameTileExclusive
      game={id}
      isInMyList={false}
      onLaunchGame={() => {}}
      onFavouriteGame={() => {}}
    />
  );
};
