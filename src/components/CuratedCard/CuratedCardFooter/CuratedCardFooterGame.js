// @flow
import React from "react";
import { MobileAndTablet, Desktop } from "Components/ResponsiveLayout";
import { CuratedCardFooterGameMobile } from "./CuratedCardFooterGameMobile";
import { CuratedCardFooterGameDesktop } from "./CuratedCardFooterGameDesktop";

export type CuratedCardFooterGame_Game = {
  logo: string,
  name: string,
  slug: string,
  backgroundImage: string,
};

export type CuratedCardFooterGameProps = {
  launchButtonText: string,
  onLaunchGame: Function,
  game: CuratedCardFooterGame_Game,
};

export const CuratedCardFooterGame = ({
  game,
  launchButtonText,
  onLaunchGame,
}: CuratedCardFooterGameProps) => (
  <>
    <MobileAndTablet>
      <CuratedCardFooterGameMobile
        game={game}
        launchButtonText={launchButtonText}
        onLaunchGame={onLaunchGame}
      />
    </MobileAndTablet>
    <Desktop>
      <CuratedCardFooterGameDesktop
        game={game}
        launchButtonText={launchButtonText}
        onLaunchGame={onLaunchGame}
      />
    </Desktop>
  </>
);
