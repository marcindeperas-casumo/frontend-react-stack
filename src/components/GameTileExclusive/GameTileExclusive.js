import React from "react";
import { GameTile } from "Components/GameTile";
import { exclusiveTileHeight, exlusiveTileWidth } from "Src/constants";

const EXCLUSIVE_GAME_TILE_IMGIX_OPTS = {
  w: exlusiveTileWidth,
  h: exclusiveTileHeight,
  fit: "crop",
};
export const GameTileExclusive = props => (
  <GameTile
    {...props}
    ratio="game-tile-exclusive"
    imgixOpts={EXCLUSIVE_GAME_TILE_IMGIX_OPTS}
  />
);
