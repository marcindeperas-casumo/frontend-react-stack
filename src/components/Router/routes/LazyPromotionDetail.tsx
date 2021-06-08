import React from "react";
import LazyPortal from "Components/LazyPortal";
import PromotionPageSkeleton from "Components/PromotionPageSkeletons/PromotionPageSkeleton";

export const LazyPromotionDetail = props => {
  const augmentedProps = {
    ...props,
    slug: `promotions.${props.slug}`,
  };
  return (
    <LazyPortal
      hostElementId="react-host-promotion-detail"
      loader={() => import("Components/PromotionDetailPage")}
      fallback={<PromotionPageSkeleton />}
      namedExport="PromotionDetailPage"
      props={augmentedProps}
    />
  );
};
