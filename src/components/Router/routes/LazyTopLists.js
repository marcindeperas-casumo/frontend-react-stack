import React from "react";
import LazyPortal from "Components/LazyPortal";
import { TopListsSkeleton } from "Components/TopListsSkeleton";

export const LazyTopLists = props => (
  <LazyPortal
    hostElementId="react-host-games-lists"
    loader={() => import("Components/ComponentBuilder")}
    fallback={<TopListsSkeleton />}
    namedExport="ComponentBuilder"
    props={{ slug: "built-pages.top-lists-{{market}}" }}
  />
);
