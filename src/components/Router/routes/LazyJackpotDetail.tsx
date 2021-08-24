import React from "react";
import LazyPortal from "Components/LazyPortal";
import PromotionPageSkeleton from "Components/PromotionPageSkeletons/PromotionPageSkeleton";

export const LazyJackpotDetail = props => {
  const augmentedProps = {
    ...props,
    jackpotSlug: props.slug,
  };
  return (
    <LazyPortal
      hostElementId="react-host-jackpot-detail"
      loader={() => import("Components/JackpotDetailPage")}
      fallback={<PromotionPageSkeleton />}
      namedExport="JackpotDetailPageContainer"
      props={augmentedProps}
    />
  );
};
