// @flow
import { Duration } from "luxon";

type OptionsType = {
  isShort?: boolean,
  withMillis?: boolean,
};

export function convertSecondsToISO8601Duration(
  seconds: number,
  opts: OptionsType = {}
): string {
  const { isShort, withMillis } = opts;
  const duration = Duration.fromMillis(seconds * 1000).shiftTo(
    "days",
    "hours",
    "minutes",
    "seconds"
  );

  if (!withMillis) {
    duration.set({ seconds: parseInt(duration.seconds) });
  }

  if (!isShort) {
    return duration.toISO();
  }

  if (duration.days > 0) {
    return `P${duration.days}DT${duration.hours}H`;
  }
  if (duration.hours > 0) {
    return `PT${duration.hours}H${duration.minutes}M`;
  }
  if (duration.minutes > 0) {
    return `PT${duration.minutes}M${duration.seconds}S`;
  }

  return `PT${duration.seconds}S`;
}
