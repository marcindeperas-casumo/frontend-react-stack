import React from "react";
import Skeleton from "@casumo/cmp-skeleton";

export const CuratedCardSkeleton = () => (
  <div className="c-curated-card o-ratio o-ratio--curated-card">
    <Skeleton
      colorHi="#d3d8e1"
      colorLow="#e5eaed"
      viewBox={null}
      className="o-ratio__content"
      width="100%"
      height="100%"
    >
      <rect x="0" y="0" rx="8" ry="8" width="100%" height="100%" />
    </Skeleton>
  </div>
);
