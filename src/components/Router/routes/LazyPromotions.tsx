import React from "react";
import LazyPortal from "Components/LazyPortal";
import PromotionPageSkeleton from "Components/PromotionPageSkeletons/PromotionPageSkeleton";

export const LazyPromotions = props => (
  <LazyPortal
    hostElementId="react-host-promotions"
    loader={() => import("Components/PromotionPage")}
    fallback={<PromotionPageSkeleton />}
    namedExport="PromotionPage"
  />
);
