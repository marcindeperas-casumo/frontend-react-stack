import React from "react";
import * as A from "Types/apollo";
import { useGameModelContext } from "Components/GamePage/Contexts";
import { isAndroidNative, isIosNative } from "Utils/utils";
import { useTranslations } from "Utils/hooks";
import { ReelRaceOptInWidget } from "./ReelRaceOptInWidget";

type TProps = {
  nextRR: Partial<A.ReelRaceCard_ReelRaceFragment>;
};

export type TTranslations = {
  schedule_next_text: string;
  leaderboard_prize: string;
} & A.ReelRaceCard_ReelRaceFragment["translations"];

export function ReelRaceOptInWidgetContainer({ nextRR: reelRaceGame }: TProps) {
  const { slug: currentGameSlug } = useGameModelContext();

  const currentGameIsClosestRROptedIn =
    reelRaceGame?.game?.slug === currentGameSlug && reelRaceGame?.optedIn;
  const isNative = isIosNative() || isAndroidNative();

  const translations: TTranslations = {
    ...reelRaceGame?.translations,

    ...useTranslations<{
      schedule_next_text: string;
      leaderboard_prize: string;
    }>("mobile.tournament-campaigns"),
  };

  if (!reelRaceGame || currentGameIsClosestRROptedIn || isNative) {
    return null;
  }

  return (
    <ReelRaceOptInWidget
      reelRace={reelRaceGame as A.ReelRaceCard_ReelRaceFragment}
      translations={translations}
    />
  );
}
