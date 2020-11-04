// @flow
import * as React from "react";
import * as R from "ramda";
import { useFetch } from "Utils/hooks";
import { type PauseResumeProps } from "Components/Compliance/PlayOkayBar/PlayOkayBarContainer";
import { urls } from "../blueRibbonConsts";
import { BlueRibbonChristmasCampaignNotifications } from "./BlueRibbonChristmasCampaignNotifications";

export function BlueRibbonChristmasCampaignNotificationsContainer({
  pauseGame,
  resumeGame,
}: PauseResumeProps) {
  const { response } = useFetch(urls.handshake);
  const available = R.propOr(false, "available", response);

  if (!available) {
    return null;
  }

  return (
    <BlueRibbonChristmasCampaignNotifications
      pauseGame={pauseGame}
      resumeGame={resumeGame}
    />
  );
}
