// @flow
import { Duration } from "luxon";
import type {
  DurationTranslations,
  LuxonDurationKey,
} from "./ISO8601Duration.types";

type OptionsType = {
  /**
   * Display only first non-zero major unit and a subunit i.e. hours and minutes.
   */
  isShort?: boolean,
  withMillis?: boolean,
};

const LUXON_KEY_TO_CMS_KEY_ABBREVIATED = {
  years: "year_abbreviated",
  months: "month_abbreviated",
  weeks: "week_abbreviated",
  days: "day_abbreviated",
  hours: "hour_abbreviated",
  minutes: "minute_abbreviated",
  seconds: "second_abbreviated",
  milliseconds: "millisecond_abbreviated",
};
const LUXON_KEY_TO_CMS_KEY_SINGULAR = {
  years: "year_singular",
  months: "month_singular",
  weeks: "week_singular",
  days: "day_singular",
  hours: "hour_singular",
  minutes: "minute_singular",
  seconds: "second_singular",
  milliseconds: "millisecond_singular",
};
const LUXON_KEY_TO_CMS_KEY_PLURAL = {
  years: "year_plural",
  months: "month_plural",
  weeks: "week_plural",
  days: "day_plural",
  hours: "hour_plural",
  minutes: "minute_plural",
  seconds: "second_plural",
  milliseconds: "millisecond_plural",
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

export function durationToTranslationKey(
  durationKey: LuxonDurationKey,
  value: number,
  preferAbbreviated?: boolean
): $Keys<DurationTranslations> {
  if (preferAbbreviated) {
    return LUXON_KEY_TO_CMS_KEY_ABBREVIATED[durationKey];
  }
  if (value > 1) {
    return LUXON_KEY_TO_CMS_KEY_PLURAL[durationKey];
  }

  return LUXON_KEY_TO_CMS_KEY_SINGULAR[durationKey];
}
