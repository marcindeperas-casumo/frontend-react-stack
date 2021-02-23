// @flow
import React from "react";
import { range } from "ramda";
import Skeleton from "@casumo/cmp-skeleton";
import {
  leftPaddingClasses,
  topMarginClasses,
} from "Components/GameListHorizontal/constants";

export const PromotionCardListSkeleton = () => (
  <div className={`o-wrapper ${leftPaddingClasses} ${topMarginClasses}`}>
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
);
