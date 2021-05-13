import React from "react";
import LazyPortal from "Components/LazyPortal";

export const LazyPlayerSettingsRealityCheck = props => (
  <LazyPortal
    hostElementId="react-host-settings-reality-check"
    loader={() => import("Components/Settings/SettingsRealityCheck")}
    namedExport="SettingsRealityCheckContainer"
    props={props}
  />
);
