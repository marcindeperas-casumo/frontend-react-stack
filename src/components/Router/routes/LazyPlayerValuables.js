import React from "react";
import LazyPortal from "Components/LazyPortal";

export const LazyPlayerValuables = props => (
  <LazyPortal
    hostElementId="react-host-valuables"
    loader={() => import("Components/PlayerValuableList")}
    namedExport="PlayerValuableList"
    props={props}
  />
);
