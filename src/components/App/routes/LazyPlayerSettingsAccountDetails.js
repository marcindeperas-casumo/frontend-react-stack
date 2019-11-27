import React from "react";
import LazyPortal from "Components/LazyPortal";

export const LazyPlayerSettingsAccountDetails = props => (
  <LazyPortal
    hostElementId="react-host-settings-account-details"
    loader={() =>
      import(
        "Components/Settings/SettingsAccountDetails/SettingsAccountDetailsContainer"
      )
    }
    namedExport="SettingsAccountDetailsContainer"
    props={props}
  />
);
