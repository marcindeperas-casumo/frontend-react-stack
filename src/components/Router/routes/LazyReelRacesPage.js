import React from "react";
import LazyPortal from "Components/LazyPortal";

export const LazyReelRacesPage = props => (
  <LazyPortal
    hostElementId="react-host-reel-races"
    loader={() => import("Components/ReelRacesPage")}
    namedExport="ReelRacesPage"
    props={props}
  />
);
