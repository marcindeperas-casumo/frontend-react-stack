// @flow

import React from "react";
import { JURISDICTIONS } from "Src/constants";
import { DGOJBar } from "./DGOJBar";
import { MGABar } from "./MGABar";
import { DGABar } from "./DGABar";
import { SGABar } from "./SGABar";
import { type PauseResumeProps, type GameProps } from "./PlayOkayBarContainer";
import "./PlayOkayBar.scss";

type Props = {
  jurisdiction: string,
} & PauseResumeProps &
  GameProps;

const jurisdictionBarMapping = {
  [JURISDICTIONS.DGOJ]: DGOJBar,
  [JURISDICTIONS.MGA]: MGABar,
  [JURISDICTIONS.DGA]: DGABar,
  [JURISDICTIONS.SGA]: SGABar,
};

export const PlayOkayBar = ({
  slug,
  jurisdiction,
  pauseGame,
  resumeGame,
}: Props) => {
  const PlayOkarBarComponent = jurisdictionBarMapping[jurisdiction] || MGABar;

  return (
    <PlayOkarBarComponent
      pauseGame={pauseGame}
      resumeGame={resumeGame}
      slug={slug}
    />
  );
};
