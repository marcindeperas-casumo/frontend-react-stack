// @flow
import React from "react";
import Skeleton from "@casumo/cmp-skeleton";
import List from "@casumo/cmp-list";

const KambiSearchResultsSkeleton = () => (
  <List
    itemSpacing="md"
    items={[...Array(12).keys()]}
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

export default KambiSearchResultsSkeleton;
