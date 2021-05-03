import * as React from "react";
import { Duration, DateTime } from "luxon";
import { getActualDateTimeDifferenceFromNow } from "Utils";
import { useTimeoutFn } from "Utils/hooks";

export const WARM_UP_DURATION = 30;

export type DurationLiteralType = Pick<Duration, "days" | "hours" | "minutes">;

export const useAccountWarmUp = (
  inWarmupPhase: boolean,
  warmUpTimeEnd: string
) => {
  const elapsedDefault = Duration.fromObject({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  }).normalize();

  const [timeRemaining, setTimeRemaining] = React.useState<DurationLiteralType>(
    elapsedDefault
  );

  const timer = useTimeoutFn();

  const refreshTimeRemaining = React.useCallback(() => {
    const timeToElapse = DateTime.fromISO(warmUpTimeEnd);

    if (inWarmupPhase) {
      setTimeRemaining(getActualDateTimeDifferenceFromNow(timeToElapse));

      timer.scheduleIn(refreshTimeRemaining, 1000);
    }
  }, [warmUpTimeEnd, inWarmupPhase, timer]);

  React.useEffect(() => {
    refreshTimeRemaining();

    return () => {
      timer.clear();
    };
  }, [refreshTimeRemaining, timer]);

  return { timeRemaining };
};
