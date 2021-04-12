import Text from "@casumo/cmp-text";
import * as React from "react";
import { Duration as LuxonDuration, DateTime } from "luxon";
import type { LoginTimeLimit } from "Models/playOkay";
import { interpolateWithJSX } from "Utils";
import { TimeLimitsCardDuration } from "./TimeLimitsCardDuration";

type Props = {
  t: {
    coming_limit_note: string;
  };
  limit: LoginTimeLimit;
};

export function ComingLimitNote({ t, limit }: Props) {
  if (!limit.comingLimit) {
    return null;
  }

  const limitDuration = LuxonDuration.fromISO(limit.comingLimit.limit);
  const activationDate = DateTime.fromMillis(limit.comingLimit?.activationTime);

  return (
    <Text tag="div" size="sm" className="t-color-yellow-30">
      {interpolateWithJSX(
        {
          time: <TimeLimitsCardDuration duration={limitDuration} />,
          date: activationDate.toFormat("DD"),
        },
        t.coming_limit_note
      )}
    </Text>
  );
}
