// @flow
import * as React from "react";
import * as R from "ramda";
import { Duration } from "luxon";
import { interpolate } from "Utils";
import { durationToTranslationKey } from "./ISO8601Duration.utils";
import type {
  DurationTranslations,
  LuxonDurationKey,
} from "./ISO8601Duration.types";

type Props = {
  duration: string, // ISO8601 duration, https://en.wikipedia.org/wiki/ISO_8601#Durations
  preferAbbreviated?: boolean,
  t: DurationTranslations & {
    separator: string,
  },
  fetchTranslations: () => void,
};

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

      return interpolate(
        props.t[durationToTranslationKey(key, value, props.preferAbbreviated)],
        {
          value: value.toString(),
        }
      );
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
