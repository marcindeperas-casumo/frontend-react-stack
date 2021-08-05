import * as React from "react";
import { useInterval } from "react-use";
import { DateTime } from "luxon";
import { useDefaultState } from "../../Default/useDefaultState";
import {
  TUseDefaultState,
  TUseDefaultStateArgs,
} from "../../Default/useDefaultState.types";
import { breakInSeconds } from "./OutOfHours.constants";

export function useOutOfHoursState({
  message,
  slug,
}: TUseDefaultStateArgs): TUseDefaultState {
  const defaultState = useDefaultState({ message, slug });
  const getElapsedSeconds = () =>
    message
      ? DateTime.fromMillis(message?.createdTime).diffNow("seconds").negate()
          .seconds
      : breakInSeconds;
  const [remainingSeconds, setRemainingSeconds] = React.useState(
    breakInSeconds - getElapsedSeconds()
  );
  const [isDisabled, setIsDisabled] = React.useState(remainingSeconds > 0);

  useInterval(
    () => {
      setRemainingSeconds(breakInSeconds - getElapsedSeconds());
      setIsDisabled(remainingSeconds > 0);
    },
    isDisabled ? 1000 : null
  );

  return {
    ...defaultState,
    isDisabled,
    buttonLabel: isDisabled
      ? String(Math.round(remainingSeconds))
      : defaultState.buttonLabel,
  };
}
