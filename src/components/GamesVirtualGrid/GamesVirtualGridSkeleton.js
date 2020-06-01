// @flow
import * as React from "react";
import { VirtualGridSkeleton } from "Components/VirtualGrid";
import { tileHeight, tileWidth } from "./GamesVirtualGrid";

export const GamesVirtualGridSkeleton = () => {
  return (
    <VirtualGridSkeleton
      spacerSize="sm"
      tileWidth={tileWidth}
      tileHeight={tileHeight}
    />
  );
};
