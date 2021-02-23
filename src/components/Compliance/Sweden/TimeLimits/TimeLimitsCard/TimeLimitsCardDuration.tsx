// @flow
import * as React from "react";
import { Duration as LuxonDuration } from "luxon";
import { Duration } from "Components/Duration";

type Props = {
  duration: LuxonDuration,
};

export function TimeLimitsCardDuration({ duration }: Props) {
  const durationInHours = duration.shiftTo("hours");

  return (
    <span className="u-font-weight-bold">
      {/* @ts-expect-error ts-migrate(2786) FIXME: 'Duration' cannot be used as a JSX component. */}
      <Duration
        preferAbbreviated
        duration={durationInHours
          .set({ hours: Math.ceil(durationInHours.hours) })
          .toObject()}
      />
    </span>
  );
}
