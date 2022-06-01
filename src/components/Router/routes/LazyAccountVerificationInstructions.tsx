import React from "react";
import LazyPortal from "Components/LazyPortal";

export const LazyAccountVerificationInstructions = props => (
  <LazyPortal
    hostElementId="react-account-verification"
    loader={() =>
      import(
        "Components/AccountVerification/AccountVerificationInstructionsContainer"
      )
    }
    namedExport="AccountVerificationInstructionsContainer"
    props={props}
  />
);
