// @flow
export type LuxonDurationKey =
  | "years"
  | "months"
  | "weeks"
  | "days"
  | "hours"
  | "minutes"
  | "seconds"
  | "milliseconds";

export type LuxonDurationObject = {
  [LuxonDurationKey]: number,
};

export type DurationTranslations = {
  year_singular: string,
  year_plural: string,
  year_abbreviated: string,
  month_singular: string,
  month_plural: string,
  month_abbreviated: string,
  week_singular: string,
  week_plural: string,
  week_abbreviated: string,
  day_singular: string,
  day_plural: string,
  day_abbreviated: string,
  hour_singular: string,
  hour_plural: string,
  hour_abbreviated: string,
  minute_singular: string,
  minute_plural: string,
  minute_abbreviated: string,
  second_singular: string,
  second_plural: string,
  second_abbreviated: string,
  millisecond_singular: string,
  millisecond_plural: string,
  millisecond_abbreviated: string,
};
