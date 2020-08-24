// @flow
import React from "react";
import LazyPortal from "Components/LazyPortal";
import { Router } from "Components/Router";
import { LazyPlayerPlayOkaySettings } from "Components/Router/routes/LazyPlayerPlayOkaySettings";
import { LazyCasinoGamesRTPLight } from "Components/CasinoGames";

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
    <LazyPlayerPlayOkaySettings />
    <LazyCasinoGamesRTPLight />
  </>
);
