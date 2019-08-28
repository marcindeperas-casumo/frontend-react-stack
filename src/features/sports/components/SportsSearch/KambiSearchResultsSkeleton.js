// @flow
import React from "react";
import Skeleton from "@casumo/cmp-skeleton";
import List from "@casumo/cmp-list";

const KambiSearchResultsListSkeleton = () => (
  <List
    itemSpacing="md"
    items={[1, 2, 3, 4, 5]}
    render={id => (
      <Skeleton
        colorHi="#d3d8e1"
        colorLow="#e5eaed"
        key={id}
        width="100%"
        height="24px"
        preserveAspectRatio="none"
        viewBox={null}
      >
        <rect x="16" y="0" rx="12" ry="12" width="24" height="24" />
        <rect x="64" y="4" rx="12" ry="12" width="160" height="16" />
      </Skeleton>
    )}
  />
);

const KambiSearchResultsSkeleton = () => (
  <>
    <Skeleton
      colorHi="#d3d8e1"
      colorLow="#e5eaed"
      width="100%"
      height="52px"
      preserveAspectRatio="none"
      viewBox={null}
    >
      <rect x="0" y="16" rx="3" ry="3" width="90" height="20" />
    </Skeleton>
    <KambiSearchResultsListSkeleton />
    <Skeleton
      colorHi="#d3d8e1"
      colorLow="#e5eaed"
      width="100%"
      height="52px"
      preserveAspectRatio="none"
      viewBox={null}
    >
      <rect x="0" y="16" rx="3" ry="3" width="190" height="20" />
    </Skeleton>
    <KambiSearchResultsListSkeleton />
  </>
);

export default KambiSearchResultsSkeleton;
