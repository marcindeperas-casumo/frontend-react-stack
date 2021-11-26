import * as React from "react";
import LazyPortal from "Components/LazyPortal";
import type { TPeriod } from "Models/playOkay";

export function LazyPlayerPlayOkaySettings() {
  return (
    <>
      <TimeLimitsCardLazyPortal />
      <TimeLimitsCardLazyPortal inReview />
    </>
  );
}

type TimeLimitsCardLazyPortalProps = {
  period?: TPeriod;
  inReview?: boolean;
};

function TimeLimitsCardLazyPortal({
  period,
  inReview,
}: TimeLimitsCardLazyPortalProps) {
  return (
    <LazyPortal
      hostElementId={`react-host-sga-${inReview ? "review-" : ""}${
        period ? period.toLowerCase() + "-" : ""
      }login-time-limits-card`}
      loader={() =>
        import("Components/Compliance/Sweden/TimeLimits/TimeLimitsCard")
      }
      namedExport="TimeLimitsCardContainer"
      props={{
        selectedPeriod: period,
      }}
    />
  );
}
