// @flow
import React from "react";
import Skeleton from "@casumo/cmp-skeleton";

const FavouriteCompetitionsSelectorRegionSkeleton = () => (
  <Skeleton
    colorHi="#d3d8e1"
    colorLow="#e5eaed"
    width="100%"
    height="50px"
    preserveAspectRatio="none"
    viewBox={null}
  >
    <rect x="0" y="13" rx="3" ry="3" width="150" height="24" />
    <rect
      x="100%"
      y="15"
      rx="3"
      ry="3"
      width="20"
      height="20"
      transform="translate(-20, 0)"
    />
  </Skeleton>
);

export default FavouriteCompetitionsSelectorRegionSkeleton;
