import * as React from "react";
import { Duration, DateTime } from "luxon";
import { useSelector } from "react-redux";
import {
  convertTimestampToLuxonDate,
  getActualDateTimeDifferenceFromNow,
} from "Utils";
import { registrationDateSelector } from "Models/handshake";
import { useTimeoutFn } from "Utils/hooks";

export const WARM_UP_DURATION = 30;

export type DurationLiteralType = Pick<Duration, "days" | "hours" | "minutes">;

export const useAccountWarmUp = () => {
  const registrationSeconds = useSelector(registrationDateSelector);

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
    const registratioDate = convertTimestampToLuxonDate(registrationSeconds);
    const timeToElapse = registratioDate.plus({
      days: WARM_UP_DURATION,
    });

    const hasElapsed = timeToElapse > DateTime.utc();

    if (!hasElapsed) {
      setTimeRemaining(getActualDateTimeDifferenceFromNow(timeToElapse));

      timer.scheduleIn(refreshTimeRemaining, 1000);
    }
  }, [registrationSeconds, timer]);

  React.useEffect(() => {
    refreshTimeRemaining();

    return () => {
      timer.clear();
    };
  }, [refreshTimeRemaining, timer]);

  return { timeRemaining };
};
