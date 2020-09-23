// @flow
import React from "react";
import { useSelector } from "react-redux";
import { localeSelector } from "Models/handshake";
import { useTranslationsGql } from "Utils/hooks";
import { getOrdinalSuffix } from "Utils";
import {
  type CurrentReelRaceInfo,
  useCurrentReelRaceInfo,
} from "../../utils/hooks/useCurrentReelRaceInfo";
import { calculateProgress } from "../../models/reelRaces/reelRaces.utils";
import { CMS_SLUGS as CMS_SLUG } from "../../models/playing/playing.constants";
import { playingSelector } from "../../models/playing/playing.selectors";
import { ReelRacesDrawer } from "./ReelRacesDrawer";

export const ReelRacesDrawerContainer = () => {
  const { t } = useTranslationsGql({
    reel_races_drawer_pts: `root:${CMS_SLUG.MODAL_WAGERING}:fields.reel_races_drawer_pts`,
  });
  const locale = useSelector(localeSelector);
  const { gameId: slug } = useSelector(playingSelector);
  const currentReelRace: CurrentReelRaceInfo = useCurrentReelRaceInfo(slug);
  if (!currentReelRace) {
    return null;
  }

  const {
    remainingSpins,
    position,
    points,
    startTime,
    endTime,
  } = currentReelRace;

  // This returns the position suffix eg 1'st, 52'nd etc
  const ordinalSuffix = currentReelRace
    ? getOrdinalSuffix(locale, currentReelRace.position)
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
