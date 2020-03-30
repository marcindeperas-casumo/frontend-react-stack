// @flow
import * as R from "ramda";
import { Duration as LuxonDuration } from "luxon";
import { interpolate } from "Utils";
import { useTranslations } from "Utils/hooks";
import { durationToTranslationKey } from "./Duration.utils";
import type {
  DurationTranslations,
  LuxonDurationKey,
  LuxonDurationObject,
} from "./Duration.types";

export const CMS_SLUG = "i18n.durations";

type Props = {
  /**
   * string is ISO8601 duration, https://en.wikipedia.org/wiki/ISO_8601#Durations
   */
  duration: string | LuxonDurationObject,
  preferAbbreviated?: boolean,
  preferShort?: boolean,
  separator?: string,
};

export function Duration(props: Props): string {
  const t = useTranslations<DurationTranslations>(CMS_SLUG);

  if (!t) {
    return "";
  }

  const separator = props?.separator || t.separator;
  const duration: LuxonDurationObject =
    typeof props.duration === "string"
      ? LuxonDuration.fromISO(props.duration).toObject()
      : props.duration;

  return R.pipe(
    // we could just iterate over duration but it would create issue with preserving proper order in output
    R.filter(R.has(R.__, duration)),
    // drop items from the beginning which values in duration are lte 0
    R.dropWhile(
      R.pipe(
        R.prop(R.__, duration),
        R.lte(R.__, 0)
      )
    ),
    R.when(R.always(props.preferShort), R.take(2)),
    R.map((key: LuxonDurationKey) => {
      const value = duration[key];

      return interpolate(
        t[durationToTranslationKey(key, value, props.preferAbbreviated)],
        {
          value: value.toString(),
        }
      );
    }),
    R.join(separator)
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
