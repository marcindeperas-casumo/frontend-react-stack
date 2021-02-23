// @flow
import React from "react";
import { CuratedCardFooterGame } from "./CuratedCardFooterGame";
import { CuratedCardFooterText } from "./CuratedCardFooterText";
import type { CuratedCardFooterGame_Game } from "./CuratedCardFooterGame";

type Props = {
  isGame: boolean,
  game: CuratedCardFooterGame_Game,
  launchButtonText: string,
  onLaunchGame: Function,
  promotionLegalText: string,
};

export const CuratedCardFooter = ({
  isGame,
  game,
  launchButtonText,
  onLaunchGame,
  promotionLegalText,
}: Props) =>
  isGame ? (
    <CuratedCardFooterGame
      game={game}
      launchButtonText={launchButtonText}
      onLaunchGame={onLaunchGame}
    />
  ) : (
    <CuratedCardFooterText text={promotionLegalText} />
  );
