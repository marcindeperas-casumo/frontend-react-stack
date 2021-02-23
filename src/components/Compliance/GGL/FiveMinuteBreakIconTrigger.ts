// @flow
import {
  useFiveMinuteBreakRealityCheck,
  useFiveMinuteBreakIcon,
  useFiveMinuteBreakModals,
  // @ts-expect-error ts-migrate(2305) FIXME: Module '"../../../models/gglFiveMinuteBreak"' has ... Remove this comment to see the full error message
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
