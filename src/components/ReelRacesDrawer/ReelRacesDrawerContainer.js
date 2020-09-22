// @flow
import React from "react";
import { useSelector } from "react-redux";
import { localeSelector } from "Models/handshake";
import { useTranslationsGql, useCurrentReelRaceInfo } from "Utils/hooks";
import { getOrdinalSuffix } from "Utils";
import { CMS_SLUGS as CMS_SLUG } from "../../models/playing/playing.constants";
import { ReelRacesDrawer } from "./ReelRacesDrawer";

type Props = {
  slug: string,
};

export const ReelRacesDrawerContainer = ({ slug }: Props) => {
  const { t } = useTranslationsGql({
    reel_races_drawer_pts: `root:${CMS_SLUG.MODAL_WAGERING}:fields.reel_races_drawer_pts`,
  });
  const locale = useSelector(localeSelector);
  const ordinalSuffix = getOrdinalSuffix(locale, "3");
  const currentReelRace = useCurrentReelRaceInfo(slug);
  if (!currentReelRace) {
    return null;
  }
  return (
    <ReelRacesDrawer
      t={t}
      spinsLeft={currentReelRace.remainingSpins}
      position={currentReelRace.position}
      points={currentReelRace.points}
      ordinalSuffix={ordinalSuffix}
    />
  );
};
