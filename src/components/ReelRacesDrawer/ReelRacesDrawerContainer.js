// @flow
import React from "react";
import { useSelector } from "react-redux";
import { localeSelector } from "Models/handshake";
import { useTranslationsGql } from "Utils/hooks";
import { getOrdinalSuffix } from "Utils";
import { calculateProgress } from "../../models/reelRaces/reelRaces.utils";
import { CMS_SLUGS as CMS_SLUG } from "../../models/playing/playing.constants";
import { type CurrentReelRaceInfo } from "../../utils/hooks/useCurrentReelRaceInfo";
import { ReelRacesDrawer } from "./ReelRacesDrawer";

type Props = {
  currentRace?: CurrentReelRaceInfo,
};

export const ReelRacesDrawerContainer = ({ currentRace }: Props) => {
  const { t } = useTranslationsGql({
    reel_races_drawer_pts: `root:${CMS_SLUG.MODAL_WAGERING}:fields.reel_races_drawer_pts`,
  });
  const locale = useSelector(localeSelector);

  if (!currentRace || !currentRace?.isInProgress) {
    return null;
  }

  const { remainingSpins, position, points, startTime, endTime } = currentRace;

  // This returns the position suffix eg 1'st, 52'nd etc
  const ordinalSuffix = currentRace
    ? getOrdinalSuffix(locale, currentRace.position)
    : "";
  const gameProgress = calculateProgress(startTime, endTime) * 100 || 0;
  const gameDuration = (endTime - startTime) / 1000 / 60 || 0;
  return (
    <ReelRacesDrawer
      t={t}
      spinsLeft={remainingSpins}
      position={position}
      points={points}
      ordinalSuffix={ordinalSuffix}
      gameProgress={gameProgress}
      gameDuration={gameDuration}
    />
  );
};
