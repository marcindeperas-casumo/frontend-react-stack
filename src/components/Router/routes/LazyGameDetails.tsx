import React from "react";
import LazyPortal from "Components/LazyPortal";
import { GameDetailsSkeleton } from "Components/GameDetails/GameDetailsSkeleton";

export const LazyGameDetails = props => {
  return (
    <LazyPortal
      hostElementId="react-host-game-details"
      loader={() => import("Components/GameDetails")}
      fallback={<GameDetailsSkeleton />}
      namedExport="GameDetailsContainer"
      props={{ slug: props.slug }}
    />
  );
};
