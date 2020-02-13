// @flow
import React from "react";
import GameTileExclusive from "Components/GameTileExclusive/GameTileExclusive";
import * as A from "Types/apollo";

type Props = {
  game: A.GameTile_Game,
};

export const GameTileExclusiveContainer = ({ game }: Props) => {
  // __FIX__: update all properties to come from the Apollo store
  return <GameTileExclusive game={game} onLaunchGame={() => {}} />;
};
