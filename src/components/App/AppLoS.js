// @flow
import React from "react";
import LazyPortal from "Components/LazyPortal";
import SportsShellSkeleton from "Features/sports/components/SportsShell/SportsShellSkeleton";

export const AppLoS = () => (
  <LazyPortal
    hostElementId="sports-los-portal"
    loader={() => import("Features/sports/components/SportsLOS")}
    fallback={<SportsShellSkeleton />}
    namedExport="SportsLOSContainer"
  />
);
