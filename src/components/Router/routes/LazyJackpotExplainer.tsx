import React from "react";
import LazyPortal from "Components/LazyPortal";
import PromotionPageSkeleton from "Components/PromotionPageSkeletons/PromotionPageSkeleton";

export const LazyJackpotExplainer = props => {
  const augmentedProps = {
    ...props,
    jackpotSlug: props.slug,
  };

  return (
    <LazyPortal
      hostElementId="react-host-jackpot-explainer"
      loader={() => import("Components/ExplainerPage")}
      fallback={<PromotionPageSkeleton />}
      namedExport="ExplainerPageContainer"
      props={augmentedProps}
    />
  );
};
