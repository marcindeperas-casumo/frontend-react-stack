// @flow
import type {
  DurationTranslations,
  LuxonDurationKey,
} from "./ISO8601Duration.types";

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
