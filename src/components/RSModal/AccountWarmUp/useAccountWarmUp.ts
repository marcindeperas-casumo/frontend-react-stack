import * as React from "react";
import { Duration } from "luxon";
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
  const registrationTimestamp = 1618309199; //useSelector(registrationDateSelector);

  const [timeRemaining, setTimeRemaining] = React.useState<
    Pick<Duration, "days" | "hours" | "minutes">[]
  >();

  const timer = useTimeoutFn();

  const refreshTimeRemaining = React.useCallback(() => {
    const luxonDate = convertTimestampToLuxonDate(registrationTimestamp);
    const warmUpExpiryTimestamp = luxonDate.plus({
      days: WARM_UP_DURATION,
    });
    setTimeRemaining(getActualDateTimeDifferenceFromNow(warmUpExpiryTimestamp));
    timer.scheduleIn(refreshTimeRemaining, 1000);
  }, [registrationTimestamp, timer]);

  React.useEffect(() => {
    refreshTimeRemaining();

    return () => {
      timer.clear();
    };
  }, [refreshTimeRemaining, timer]);

  return { timeRemaining };
};
