// @flow
import * as React from "react";
import LazyPortal from "Components/LazyPortal";
import { limitPeriod, type Period } from "Models/playOkay";

export function LazyPlayerPlayOkaySettings() {
  return (
    <>
      <TimeLimitsCardLazyPortal />
      <TimeLimitsCardLazyPortal inReview />
      <TimeLimitsCardLazyPortal period={limitPeriod.DAILY} />
      <TimeLimitsCardLazyPortal period={limitPeriod.DAILY} inReview />
      <TimeLimitsCardLazyPortal period={limitPeriod.WEEKLY} />
      <TimeLimitsCardLazyPortal period={limitPeriod.WEEKLY} inReview />
      <TimeLimitsCardLazyPortal period={limitPeriod.MONTHLY} />
      <TimeLimitsCardLazyPortal period={limitPeriod.MONTHLY} inReview />
    </>
  );
}

type TimeLimitsCardLazyPortalProps = {
  period?: Period,
  inReview?: boolean,
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
