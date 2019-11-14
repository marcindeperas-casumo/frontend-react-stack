import React from "react";
import LazyPortal from "Components/LazyPortal";
import PromotionPageSkeleton from "Components/PromotionPageSkeletons/PromotionPageSkeleton";

export const LazyPromotionDetail = props => (
  <LazyPortal
    hostElementId="react-host-promotion-detail"
    loader={() => import("Components/ComponentBuilder")}
    fallback={<PromotionPageSkeleton />}
    namedExport="ComponentBuilder"
    {...props}
  />
);
