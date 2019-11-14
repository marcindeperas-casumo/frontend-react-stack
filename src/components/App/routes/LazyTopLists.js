import React from "react";
import LazyPortal from "Components/LazyPortal";
import { TopListsSkeleton } from "Components/TopLists";

export const LazyTopLists = props => (
  <LazyPortal
    hostElementId="react-host-games-lists"
    loader={() => import("Components/TopLists")}
    fallback={<TopListsSkeleton />}
    namedExport="TopLists"
    {...props}
  />
);
