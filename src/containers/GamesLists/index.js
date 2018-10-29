import React, { lazy, Suspense } from "react";
import GamesListsSkeleton from "Components/GameListsSkeleton";

const LazyGamesListsPortalContainer = lazy(() =>
  import("Containers/GamesListsPortalContainer")
);

export default function() {
  return (
    <Suspense fallback={<GamesListsSkeleton />}>
      <LazyGamesListsPortalContainer />
    </Suspense>
  );
}
