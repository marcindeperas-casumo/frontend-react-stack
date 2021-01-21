// @flow
import {
  useFiveMinuteBreakRealityCheck,
  useFiveMinuteBreakIcon,
  useFiveMinuteBreakModals,
  type PauseResumeGameSlugProps,
} from "Models/gglFiveMinuteBreak";

export const FiveMinuteBreakIconTrigger = ({
  pauseGame,
  resumeGame,
  gameSlug,
}: PauseResumeGameSlugProps) => {
  useFiveMinuteBreakRealityCheck();
  useFiveMinuteBreakIcon();
  useFiveMinuteBreakModals({
    pauseGame,
    resumeGame,
    gameSlug,
  });

  return null;
};
