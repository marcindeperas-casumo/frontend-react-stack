// @flow
import React from "react";
import { useTranslationsGql } from "Utils/hooks";
import { useReelRaceProgress } from "Utils/hooks/useReelRaceProgress";
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
    reel_races_drawer_points: `root:${CMS_SLUG.MODAL_WAGERING}:fields.reel_races_drawer_points`,
    reel_races_drawer_spins: `root:${CMS_SLUG.MODAL_WAGERING}:fields.reel_races_drawer_spins`,
    reel_races_drawer_full_leaderboard: `root:${CMS_SLUG.MODAL_WAGERING}:fields.reel_races_drawer_full_leaderboard`,
  });

  const gameProgress = useReelRaceProgress(currentRace);

  if (!currentRace || !currentRace?.isInProgress) {
    return null;
  }

  const {
    remainingSpins,
    position,
    points,
    startTime,
    endTime,
    boosters,
  } = currentRace;

  const gameDuration = parseInt((endTime - startTime) / 1000 / 60, 10) || 0;
  return (
    <ReelRacesDrawer
      t={t}
      className={className}
      spinsLeft={remainingSpins}
      position={position}
      points={points}
      boosters={boosters}
      gameProgress={gameProgress}
      gameDuration={gameDuration}
    />
  );
};
