import {
  useFiveMinuteBreakRealityCheck,
  useFiveMinuteBreakIcon,
  useFiveMinuteBreakModals,
} from "Models/gglFiveMinuteBreak";
import type { PauseResumeGameSlugProps } from "Models/gglFiveMinuteBreak";

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
