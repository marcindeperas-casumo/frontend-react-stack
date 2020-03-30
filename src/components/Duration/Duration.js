// @flow
import * as R from "ramda";
import { Duration as LuxonDuration } from "luxon";
import { useTranslations } from "Utils/hooks";
import { CMS_SLUG } from "./Duration.constants";
import { interpolateDurationObject } from "./Duration.utils";
import type {
  DurationTranslations,
  LuxonDurationObject,
} from "./Duration.types";

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

  return interpolateDurationObject({
    ...R.pick(["preferShort", "preferAbbreviated"], props),
    separator,
    duration,
    t,
  });
}
