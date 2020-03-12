// @flow
import * as React from "react";
import * as R from "ramda";
import { Duration } from "luxon";
import { interpolate } from "Utils";

type DurationTranslations = {
  year_singular: string,
  year_plural: string,
  month_singular: string,
  month_plural: string,
  week_singular: string,
  week_plural: string,
  day_singular: string,
  day_plural: string,
  hour_singular: string,
  hour_plural: string,
  minute_singular: string,
  minute_plural: string,
  second_singular: string,
  second_plural: string,
  millisecond_singular: string,
  millisecond_plural: string,
};
type Props = {
  duration: string, // ISO8601 duration, https://en.wikipedia.org/wiki/ISO_8601#Durations
  t: DurationTranslations & {
    separator: string,
  },
  fetchTranslations: () => void,
};
type LuxonDurationKey =
  | "years"
  | "months"
  | "weeks"
  | "days"
  | "hours"
  | "minutes"
  | "seconds"
  | "milliseconds";

export function ISO8601Duration(props: Props): string {
  React.useEffect(props.fetchTranslations, []);

  if (!props.t) {
    return "";
  }

  const duration = Duration.fromISO(props.duration).toObject();

  return R.pipe(
    R.filter(R.has(R.__, duration)), // we could just iterate over duration but it would create issue with preserving proper order in output
    R.map((key: LuxonDurationKey) => {
      const value = duration[key];

      return interpolate(props.t[durationToTranslationKey(key, value)], {
        value: value.toString(),
      });
    }),
    R.join(props.t.separator)
  )([
    "years",
    "months",
    "weeks",
    "days",
    "hours",
    "minutes",
    "seconds",
    "milliseconds",
  ]);
}

export function durationToTranslationKey(
  durationKey: LuxonDurationKey,
  value: number
): $Keys<DurationTranslations> {
  return {
    years: value > 1 ? "year_plural" : "year_singular",
    months: value > 1 ? "month_plural" : "month_singular",
    weeks: value > 1 ? "week_plural" : "week_singular",
    days: value > 1 ? "day_plural" : "day_singular",
    hours: value > 1 ? "hour_plural" : "hour_singular",
    minutes: value > 1 ? "minute_plural" : "minute_singular",
    seconds: value > 1 ? "second_plural" : "second_singular",
    milliseconds: value > 1 ? "millisecond_plural" : "millisecond_singular",
  }[durationKey];
}
