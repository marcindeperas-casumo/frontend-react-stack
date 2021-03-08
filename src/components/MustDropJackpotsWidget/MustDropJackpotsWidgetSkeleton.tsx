import Skeleton from "@casumo/cmp-skeleton";
import React from "react";
import { topListWidgetWidth, topListWidgetHeight } from "Src/constants";

export const MustDropJackpotsWidgetSkeleton = () => (
  <Skeleton
    colorHi="#d3d8e1"
    colorLow="#e5eaed"
    className="u-display--block"
    viewBox={null}
    width={topListWidgetWidth}
    height={topListWidgetHeight}
  >
    <rect x="0" y="0" rx="16" ry="16" width="100%" height="100%" />
  </Skeleton>
);
