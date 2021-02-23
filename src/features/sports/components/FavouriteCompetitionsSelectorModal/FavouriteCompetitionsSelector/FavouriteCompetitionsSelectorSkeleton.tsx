// @flow
import React from "react";
import Skeleton from "@casumo/cmp-skeleton";
import List from "@casumo/cmp-list";
import FavouriteCompetitionsSelectorRegionSkeleton from "./FavouriteCompetitionsSelectorRegionSkeleton";

const FavouriteCompetitionsSelectorSkeleton = () => (
  <>
    <Skeleton
      colorHi="#d3d8e1"
      colorLow="#e5eaed"
      width="100%"
      height="100%"
      preserveAspectRatio="none"
      viewBox={null}
    >
      <rect x="0" y="32" rx="3" ry="3" width="80%" height="16" />
      <rect x="0" y="96" rx="3" ry="3" width="100" height="20" />
    </Skeleton>
    <List
      items={[1, 2, 3, 4, 5]}
      render={id => <FavouriteCompetitionsSelectorRegionSkeleton key="id" />}
    />
    <Skeleton
      colorHi="#d3d8e1"
      colorLow="#e5eaed"
      width="100%"
      height="100px"
      preserveAspectRatio="none"
      viewBox={null}
    >
      <rect x="0" y="48" rx="3" ry="3" width="100" height="20" />
    </Skeleton>
    <List
      items={[1, 2, 3, 4, 5]}
      render={id => <FavouriteCompetitionsSelectorRegionSkeleton key="id" />}
    />
  </>
);

export default FavouriteCompetitionsSelectorSkeleton;
