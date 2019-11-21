import React from "react";
import LazyPortal from "Components/LazyPortal";
import SportsShellSkeleton from "Features/sports/components/SportsShell/SportsShellSkeleton";

export const LazySports = props => (
  <LazyPortal
    hostElementId="react-host-sports-shell"
    loader={() => import("Features/sports/components/SportsShell")}
    fallback={<SportsShellSkeleton />}
    namedExport="SportsShellContainer"
    props={props}
  />
);
