import React from "react";
import LazyPortal from "Components/LazyPortal";

export const LazyAccountVerification = props => (
  <LazyPortal
    hostElementId="react-account-verification"
    loader={() =>
      import("Components/AccountVerification/AccountVerificationContainer")
    }
    namedExport="AccountVerificationContainer"
    props={props}
  />
);
