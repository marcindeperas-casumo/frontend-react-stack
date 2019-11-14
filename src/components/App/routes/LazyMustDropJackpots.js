import React from "react";
import LazyPortal from "Components/LazyPortal";
import { GameListSkeleton } from "Components/GameListSkeleton/GameListSkeleton";

export const LazyMustDropJackpots = props => (
  <LazyPortal
    hostElementId="react-host-must-drop-jackpots"
    loader={() => import("Components/MustDropJackpotList")}
    fallback={<GameListSkeleton hasTitle={false} />}
    namedExport="MustDropJackpotList"
    {...props}
  />
);
