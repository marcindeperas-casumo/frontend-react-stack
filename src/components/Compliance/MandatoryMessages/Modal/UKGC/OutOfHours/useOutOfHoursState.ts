import * as React from "react";
import { useSelector } from "react-redux";
import { useInterval, useAsync } from "react-use";
import { DateTime } from "luxon";
import { playingSelector } from "Models/playing";
import { useCrossCodebaseNavigation } from "Utils/hooks";
import { ROUTE_IDS } from "Src/constants";
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
  const { navigateToKO } = useCrossCodebaseNavigation();
  const { isPlaying } = useSelector(playingSelector);
  const { markAsRead, ...defaultState } = useDefaultState({ message, slug });
  const getElapsedSeconds = () =>
    message
      ? DateTime.fromMillis(message?.createdTime).diffNow("seconds").negate()
          .seconds
      : breakInSeconds;
  const [remainingSeconds, setRemainingSeconds] = React.useState(
    breakInSeconds - getElapsedSeconds()
  );
  const isDisabled = remainingSeconds > 0;
  const roundedRemainingSeconds = Math.round(remainingSeconds);

  useInterval(
    () => {
      setRemainingSeconds(breakInSeconds - getElapsedSeconds());
    },
    isDisabled ? 1000 : null
  );

  useAsync(async () => {
    if (isPlaying && !isDisabled) {
      await markAsRead();

      navigateToKO(ROUTE_IDS.TOP_LISTS);
    }
  }, [isPlaying, isDisabled]);

  return {
    ...defaultState,
    markAsRead,
    isDisabled,
    buttonLabel: isDisabled
      ? String(roundedRemainingSeconds >= 0 ? roundedRemainingSeconds : "")
      : defaultState.buttonLabel,
  };
}
