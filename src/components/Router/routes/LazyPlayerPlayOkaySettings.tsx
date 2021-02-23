// @flow
import * as React from "react";
import LazyPortal from "Components/LazyPortal";
// @ts-expect-error ts-migrate(2724) FIXME: '"../../../models/playOkay"' has no exported membe... Remove this comment to see the full error message
import { limitPeriod, type Period } from "Models/playOkay";

export function LazyPlayerPlayOkaySettings() {
  return (
    <>
      <TimeLimitsCardLazyPortal />
      <TimeLimitsCardLazyPortal inReview />
      {/* @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'Period'. */}
      <TimeLimitsCardLazyPortal period={limitPeriod.DAILY} />
      {/* @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'Period'. */}
      <TimeLimitsCardLazyPortal period={limitPeriod.DAILY} inReview />
      {/* @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'Period'. */}
      <TimeLimitsCardLazyPortal period={limitPeriod.WEEKLY} />
      {/* @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'Period'. */}
      <TimeLimitsCardLazyPortal period={limitPeriod.WEEKLY} inReview />
      {/* @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'Period'. */}
      <TimeLimitsCardLazyPortal period={limitPeriod.MONTHLY} />
      {/* @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'Period'. */}
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
