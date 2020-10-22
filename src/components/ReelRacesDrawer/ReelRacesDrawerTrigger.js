// @flow
import React from "react";
import { useSelector } from "react-redux";
import { playingSelector } from "Models/playing";
import { isNativeByUserAgent } from "Src/gameProviders/utils";
import { useReelRaceLeaderboardModal } from "Components/RSModal/Slots/ReelRaceLeaderboardModal/useReelRaceLeaderboardModal";
import { useSumoIcon } from "Components/SumoIcon/useSumoIconHook";
import { ReelRaceIcon } from "Components/ReelRaceIcon/ReelRaceIcon";
import { useCurrentReelRaceInfo } from "../../utils/hooks/useCurrentReelRaceInfo";

export const ReelRacesDrawerTrigger = () => {
  const playing = useSelector(playingSelector);
  const currentReelRaceFromHook = useCurrentReelRaceInfo(playing?.gameId);
  const currentRace = isNativeByUserAgent() ? null : currentReelRaceFromHook;
  const { addIcon, removeIcon, hasIcon } = useSumoIcon({ currentRace });

  useReelRaceLeaderboardModal(currentRace);

  React.useEffect(() => {
    if (currentRace && currentRace.isInProgress && !hasIcon()) {
      addIcon(ReelRaceIcon);
    } else if (currentRace && currentRace.hasEnded && hasIcon()) {
      removeIcon();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRace?.isInProgress]);

  return null;
};
