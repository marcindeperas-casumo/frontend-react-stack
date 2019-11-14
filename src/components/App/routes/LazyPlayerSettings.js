import React from "react";
import LazyPortal from "Components/LazyPortal";

export const LazyPlayerSettings = props => (
  <LazyPortal
    hostElementId="react-host-settings"
    loader={() =>
      import("Components/Settings/SettingsSections/SettingsSectionsContainer")
    }
    namedExport="SettingsSectionsContainer"
    {...props}
  />
);
