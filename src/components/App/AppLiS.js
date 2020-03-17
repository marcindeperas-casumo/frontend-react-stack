// @flow
import React from "react";
import LazyPortal from "Components/LazyPortal";
import { Router } from "Components/Router";

export const AppLiS = () => (
  <>
    <Router></Router>
    <LazyPortal
      hostElementId="react-host-deposit-limits"
      loader={() =>
        import("Components/Compliance/DepositLimits/DepositLimitsView")
      }
      namedExport="DepositLimitsViewContainer"
    />
  </>
);