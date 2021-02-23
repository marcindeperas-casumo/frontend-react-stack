// @flow
import React from "react";
import Skeleton from "@casumo/cmp-skeleton";

const FavouriteSportsSelectorListItemSkeleton = () => (
  <Skeleton
    colorHi="#d3d8e1"
    colorLow="#e5eaed"
    width="100%"
    height="50px"
    preserveAspectRatio="none"
    viewBox={null}
  >
    <rect x="8" y="8" rx="16" ry="16" width="32" height="32" />
    <rect x="56" y="17" rx="3" ry="3" width="150" height="16" />
    <rect
      x="100%"
      y="5"
      rx="20"
      ry="20"
      width="40"
      height="40"
      transform="translate(-40, 0)"
    />
  </Skeleton>
);

export default FavouriteSportsSelectorListItemSkeleton;
