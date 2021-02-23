// @flow
import React from "react";
import { calculateProgress } from "Models/reelRaces";
// @ts-expect-error ts-migrate(2305) FIXME: Module '"./useCurrentReelRaceInfo"' has no exporte... Remove this comment to see the full error message
import { type CurrentReelRaceInfo } from "./useCurrentReelRaceInfo";
import { useTimeoutFn } from "./useTimeoutFn";

export const useReelRaceProgress = (
  currentRace?: ?CurrentReelRaceInfo,
  updateInterval?: number = 2500
) => {
  const [gameProgress, setGameProgress] = React.useState(0);
  const timer = useTimeoutFn();
  const refreshProgress = React.useCallback(() => {
    setGameProgress(
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'BigInt' is not assignable to par... Remove this comment to see the full error message
      calculateProgress(currentRace?.startTime, currentRace?.endTime) * 100 || 0
    );
    timer.scheduleIn(refreshProgress, updateInterval);
  }, [currentRace, timer, updateInterval]);
  React.useEffect(() => {
    refreshProgress();

    return () => {
      timer.clear();
    };
  }, [refreshProgress, timer]);

  return gameProgress;
};
