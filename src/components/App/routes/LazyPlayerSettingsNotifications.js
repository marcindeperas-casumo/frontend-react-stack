import React from "react";
import LazyPortal from "Components/LazyPortal";

export const LazyPlayerSettingsNotifications = props => (
  <LazyPortal
    hostElementId="react-host-settings-notifications"
    loader={() =>
      import(
        "Components/Settings/SettingsNotifications/SettingsNotificationsContainer"
      )
    }
    namedExport="SettingsNotificationsContainer"
    props={props}
  />
);
