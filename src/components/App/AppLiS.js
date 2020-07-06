// @flow
import React from "react";
import LazyPortal from "Components/LazyPortal";
import { Router } from "Components/Router";
import { limitPeriod } from "Models/playOkay";

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
    <LazyPortal
      hostElementId="react-host-sga-login-time-limits-card"
      loader={() =>
        import("Components/Compliance/Sweden/TimeLimits/TimeLimitsCard")
      }
      namedExport="TimeLimitsCardContainer"
    />
    <LazyPortal
      hostElementId="react-host-sga-daily-login-time-limits-card"
      loader={() =>
        import("Components/Compliance/Sweden/TimeLimits/TimeLimitsCard")
      }
      namedExport="TimeLimitsCardContainer"
      props={{
        selectedPeriod: limitPeriod.DAILY,
      }}
    />
    <LazyPortal
      hostElementId="react-host-sga-weekly-login-time-limits-card"
      loader={() =>
        import("Components/Compliance/Sweden/TimeLimits/TimeLimitsCard")
      }
      namedExport="TimeLimitsCardContainer"
      props={{
        selectedPeriod: limitPeriod.WEEKLY,
      }}
    />
    <LazyPortal
      hostElementId="react-host-sga-monthly-login-time-limits-card"
      loader={() =>
        import("Components/Compliance/Sweden/TimeLimits/TimeLimitsCard")
      }
      namedExport="TimeLimitsCardContainer"
      props={{
        selectedPeriod: limitPeriod.MONTHLY,
      }}
    />
  </>
);
