// @flow
import React from "react";
import { range } from "ramda";
import Skeleton from "@casumo/cmp-skeleton";

export const PromotionCardListSkeleton = () => (
  <div className="u-margin-x--3xlg@desktop u-padding-left--md u-padding-left--3xlg@tablet u-padding-left--3xlg@desktop">
    <div className="o-wrapper u-padding-top--xlg">
      <Skeleton
        colorHi="#d3d8e1"
        colorLow="#e5eaed"
        preserveAspectRatio="xMinYMin"
        width={256 * 4}
        height={312}
      >
        <rect x="0" y="0" rx="3" ry="3" width="80" height="18" />
        {range(0, 4).map(i => (
          <rect
            key={i}
            x={(210 + 8) * i}
            y={40}
            rx="8"
            ry="8"
            width={210}
            height={268}
          />
        ))}
      </Skeleton>
    </div>
  </div>
);
