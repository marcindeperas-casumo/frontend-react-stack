// @flow
import * as React from "react";
import { VirtualGridSkeleton } from "Components/VirtualGrid";
import { gameTileHeight, gameTileWidth } from "./GamesVirtualGrid";

export const GamesVirtualGridSkeleton = () => (
  <VirtualGridSkeleton
    spacerSize="sm"
    tileWidth={gameTileWidth}
    tileHeight={gameTileHeight}
  />
);
