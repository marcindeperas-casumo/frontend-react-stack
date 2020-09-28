// @flow
import React from "react";
import { useTranslationsGql } from "Utils/hooks";
import { calculateProgress } from "../../models/reelRaces/reelRaces.utils";
import { CMS_SLUGS as CMS_SLUG } from "../../models/playing/playing.constants";
import { type CurrentReelRaceInfo } from "../../utils/hooks/useCurrentReelRaceInfo";
import { ReelRacesDrawer } from "./ReelRacesDrawer";

type Props = {
  currentRace?: CurrentReelRaceInfo,
  className?: string,
};

export const ReelRacesDrawerContainer = ({ currentRace, className }: Props) => {
  const { t } = useTranslationsGql({
    reel_races_drawer_pts: `root:${CMS_SLUG.MODAL_WAGERING}:fields.reel_races_drawer_pts`,
  });

  if (!currentRace || !currentRace?.isInProgress) {
    return null;
  }

  const { remainingSpins, position, points, startTime, endTime } = currentRace;

  const gameProgress = calculateProgress(startTime, endTime) * 100 || 0;
  const gameDuration = parseInt((endTime - startTime) / 1000 / 60, 10) || 0;
  return (
    <ReelRacesDrawer
      t={t}
      className={className}
      spinsLeft={remainingSpins}
      position={position}
      points={points}
      gameProgress={gameProgress}
      gameDuration={gameDuration}
    />
  );
};
