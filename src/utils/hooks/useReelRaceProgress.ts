import React from "react";
import { calculateProgress } from "Models/reelRaces";
import type { CurrentReelRaceInfo } from "./useCurrentReelRaceInfo";
import { useTimeoutFn } from "./useTimeoutFn";

export const useReelRaceProgress = (
  currentRace?: CurrentReelRaceInfo | undefined,
  // @ts-expect-error ts-migrate(1015) FIXME: Parameter cannot have question mark and initialize... Remove this comment to see the full error message
  updateInterval?: number = 2500
) => {
  const [gameProgress, setGameProgress] = React.useState(0);
  const timer = useTimeoutFn();
  const refreshProgress = React.useCallback(() => {
    setGameProgress(
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
