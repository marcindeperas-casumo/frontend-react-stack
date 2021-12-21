import React from "react";
import LazyPortal from "Components/LazyPortal";
import PromotionPageSkeleton from "Components/PromotionPageSkeletons/PromotionPageSkeleton";

export const LazyExcludedGamePage = props => {
  const augmentedProps = {
    ...props,
  };

  return (
    <LazyPortal
      hostElementId="react-host-game-excluded"
      loader={() => import("Components/GameExcludedPage")}
      fallback={<PromotionPageSkeleton />}
      namedExport="GameExcludedPageContainer"
      props={augmentedProps}
    />
  );
};
