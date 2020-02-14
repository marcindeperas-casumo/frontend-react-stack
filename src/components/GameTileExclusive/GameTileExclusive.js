import React from "react";
import { GameTile } from "Components/GameTile";

const EXCLUSIVE_GAME_TILE_IMGIX_OPTS = {
  w: 188,
  h: 280,
  fit: "crop",
};
export const GameTileExclusive = props => (
  <GameTile
    {...props}
    ratio="game-tile-exclusive"
    imgixOpts={EXCLUSIVE_GAME_TILE_IMGIX_OPTS}
  />
);
