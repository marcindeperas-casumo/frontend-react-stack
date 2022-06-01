import React from "react";
import LazyPortal from "Components/LazyPortal";

export const LazyAccountVerificationUpload = props => (
  <LazyPortal
    hostElementId="react-account-verification"
    loader={() =>
      import(
        "Components/AccountVerification/AccountVerificationUploadContainer"
      )
    }
    namedExport="AccountVerificationUploadContainer"
    props={props}
  />
);
