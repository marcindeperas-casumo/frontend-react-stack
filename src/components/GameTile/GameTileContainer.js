// @flow
import React from "react";
import { GameTile } from "Components/GameTile/GameTile";
import * as A from "Types/apollo";

type Props = {
  game: A.GameTile_Game,
};

export const GameTileContainer = ({ game }: Props) => {
  // __FIX__: update all properties to come from the Apollo store
  return <GameTile game={game} onLaunchGame={() => {}} />;
};
