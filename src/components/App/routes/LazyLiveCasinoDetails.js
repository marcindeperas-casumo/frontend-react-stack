import React from "react";
import LazyPortal from "Components/LazyPortal";
import { GameListSkeleton } from "Components/GameListSkeleton/GameListSkeleton";

export const LazyLiveCasinoDetails = props => (
  <LazyPortal
    hostElementId="react-host-live-casino-details"
    loader={() => import("Components/LiveCasinoDetailPage")}
    fallback={<GameListSkeleton />}
    namedExport="LiveCasinoDetailPage"
    props={props}
  />
);
