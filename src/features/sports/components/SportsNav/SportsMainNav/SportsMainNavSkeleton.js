import React from "react";
import Skeleton from "@casumo/cmp-skeleton";
import { SportsNavTabSkeleton as NavTab } from "Features/sports/components/SportsNav/SportsNavTab/SportsNavTabSkeleton";

export const SportsMainNavSkeleton = () => (
  <div
    style={{
      height: 106,
      position: "relative",
      overflow: "hidden",
    }}
  >
    <Skeleton viewBox={null} width="100%" height="100%">
      <rect x={0} y={0} width="100%" height="100%" />
    </Skeleton>
    <div
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        display: "flex",
        alignItems: "center",
      }}
    >
      <NavTab />
      <NavTab />
      <NavTab />
      <NavTab />
      <NavTab />
    </div>
  </div>
);
