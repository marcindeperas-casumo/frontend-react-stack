import React from "react";
import LazyPortal from "Components/LazyPortal";
import { GameListSkeleton } from "Components/GameListSkeleton/GameListSkeleton";

export const LazyGameProviderGames = props => (
  <LazyPortal
    hostElementId="react-host-provider-games"
    loader={() => import("Components/ProviderGamesList")}
    fallback={<GameListSkeleton hasTitle={false} />}
    namedExport="ProviderGamesList"
    props={props}
  />
);
