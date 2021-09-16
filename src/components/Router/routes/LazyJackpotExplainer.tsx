import React from "react";
import LazyPortal from "Components/LazyPortal";
import PromotionPageSkeleton from "Components/PromotionPageSkeletons/PromotionPageSkeleton";

export const LazyJackpotExplainer = props => {
  const augmentedProps = {
    ...props,
    jackpotSlug: props.slug,
  };
console.log("Lazy jackpot");
  return (
    <LazyPortal
      hostElementId="react-host-jackpot-details"
      loader={() => import("Components/ExplainerPage")}
      fallback={<PromotionPageSkeleton />}
      namedExport="LazyJackpotExplainerContainer"
      props={augmentedProps}
    />
  );
};
