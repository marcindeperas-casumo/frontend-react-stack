import React from "react";
import LazyPortal from "Components/LazyPortal";

export const LazyRTPPage = props => (
  <LazyPortal
    hostElementId="react-host-rtp"
    loader={() => import("Components/RTPPage")}
    namedExport="RTPPage"
  />
);
