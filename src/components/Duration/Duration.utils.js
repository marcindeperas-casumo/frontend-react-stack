// @flow
import * as R from "ramda";
import { interpolate } from "Utils";
import {
  LUXON_DURATION_KEYS,
  LUXON_KEY_TO_CMS_KEY_ABBREVIATED,
  LUXON_KEY_TO_CMS_KEY_PLURAL,
  LUXON_KEY_TO_CMS_KEY_SINGULAR,
} from "./Duration.constants";
import type {
  DurationTranslations,
  LuxonDurationKey,
  LuxonDurationObject,
} from "./Duration.types";

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

type InterpolateDurationObjectProps = {
  duration: LuxonDurationObject,
  separator: string,
  t: DurationTranslations,
  preferShort?: boolean,
  preferAbbreviated?: boolean,
};

export function interpolateDurationObject(
  props: InterpolateDurationObjectProps
): string {
  return R.pipe(
    // we could just iterate over duration but it would create issue with preserving proper order in output
    R.filter(R.has(R.__, props.duration)),
    // drop items from the beginning which values in duration are lte 0
    R.dropWhile(
      R.pipe(
        R.prop(R.__, props.duration),
        R.lte(R.__, 0)
      )
    ),
    R.when(R.always(props.preferShort), R.take(2)),
    R.map((key: LuxonDurationKey) => {
      const value = props.duration[key];

      return interpolate(
        props.t[durationToTranslationKey(key, value, props.preferAbbreviated)],
        {
          value: value.toString(),
        }
      );
    }),
    R.join(props.separator)
  )(LUXON_DURATION_KEYS);
}
