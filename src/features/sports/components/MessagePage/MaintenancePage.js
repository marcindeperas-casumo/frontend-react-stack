// @flow
import React from "react";
import MessagePage from "./MessagePage";
import MaintenanceIcon from "./icons/maintenance-icon.svg";

const MaintenancePage = () => (
  <MessagePage
    image={<MaintenanceIcon />}
    headingTermKey="maintenance.heading"
    messageTermKey="maintenance.message"
  />
);

export { MaintenancePage };
