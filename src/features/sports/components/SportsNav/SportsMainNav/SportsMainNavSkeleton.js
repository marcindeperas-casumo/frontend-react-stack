import React from "react";
import Skeleton from "@casumo/cmp-skeleton";

const TabSkeleton = () => (
  <div style={{ marginLeft: 32 }}>
    <div
      style={{
        backgroundColor: "#FFF",
        height: 32,
        width: 32,
        borderRadius: 16,
        margin: "0 auto",
      }}
    />
    <div
      style={{
        backgroundColor: "#FFF",
        width: 50,
        height: 8,
        borderRadius: 3,
        marginTop: 12,
      }}
    />
  </div>
);

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
      <TabSkeleton />
      <TabSkeleton />
      <TabSkeleton />
      <TabSkeleton />
      <TabSkeleton />
    </div>
  </div>
);
