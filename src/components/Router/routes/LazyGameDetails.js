import React from "react";
import LazyPortal from "Components/LazyPortal";
import { GameListSkeleton } from "Components/GameListSkeleton/GameListSkeleton";

export const LazyGameDetails = props => {
  return (
    <LazyPortal
      hostElementId="react-host-game-details"
      loader={() => import("Components/GameDetails")}
      fallback={<GameListSkeleton hasTitle={false} />}
      namedExport="GameDetails"
      props={{ slug: props.slug }}
    />
  );
};
