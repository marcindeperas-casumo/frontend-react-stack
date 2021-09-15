import React from "react";
import LazyPortal from "Components/LazyPortal";
import PromotionPageSkeleton from "Components/PromotionPageSkeletons/PromotionPageSkeleton";

export const LazyJackpotDetails = props => {
  const augmentedProps = {
    ...props,
    jackpotSlug: props.slug,
  };

  console.log("DEtails ");
  return (
    <LazyPortal
      hostElementId="react-host-jackpot-details"
      loader={() => import("Components/SitePage")}
      fallback={<PromotionPageSkeleton />}
      namedExport="JackpotDetailsPageContainer"
      props={augmentedProps}
    />
  );
};
