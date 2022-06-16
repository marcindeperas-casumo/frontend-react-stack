import * as React from "react";
import * as R from "ramda";
import { Duration as LuxonDuration } from "luxon";
import { useDurationTranslations } from "Utils/hooks/useDurationTranslations";
import { interpolateDurationObject } from "./Duration.utils";
import type { LuxonDurationObject, TProps } from "./Duration.types";

export function Duration(props: TProps) {
  const t = useDurationTranslations();

  if (!t) {
    return null;
  }

  const separator = props?.separator || t.separator;
  const duration: LuxonDurationObject =
    typeof props.duration === "string"
      ? LuxonDuration.fromISO(props.duration).toObject()
      : props.duration;

  return (
    <>
      {interpolateDurationObject({
        ...R.pick(["preferShort", "preferAbbreviated"], props),
        separator,
        duration,
        t,
      })}
    </>
  );
}
