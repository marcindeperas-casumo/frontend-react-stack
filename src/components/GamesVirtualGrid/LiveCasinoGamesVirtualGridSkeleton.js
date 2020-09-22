// @flow
import * as React from "react";
import { VirtualGridSkeleton } from "Components/VirtualGrid";
import {
  liveCasinoTileHeight,
  liveCasinoTileWidth,
} from "./LiveCasinoGamesVirtualGrid";

export const LiveCasinoGamesVirtualGridSkeleton = () => {
  return (
    <VirtualGridSkeleton
      spacerSize="sm"
      tileWidth={liveCasinoTileWidth}
      tileHeight={liveCasinoTileHeight}
    />
  );
};
