// @flow

import React from "react";
import { JURISDICTIONS } from "Src/constants";
import { DGOJBar } from "./DGOJBar";
import { MGABar } from "./MGABar";
import { DGABar } from "./DGABar";
import { SGABar } from "./SGABar";
import { GGLBar } from "./GGLBar";
import { type PauseResumeProps } from "./PlayOkayBarContainer";
import "./PlayOkayBar.scss";

type Props = {
  jurisdiction: string,
} & PauseResumeProps;

const jurisdictionBarMapping = {
  [JURISDICTIONS.DGOJ]: DGOJBar,
  [JURISDICTIONS.MGA]: MGABar,
  [JURISDICTIONS.DGA]: DGABar,
  [JURISDICTIONS.SGA]: SGABar,
  [JURISDICTIONS.GGL]: GGLBar,
};

export const PlayOkayBar = ({ jurisdiction, pauseGame, resumeGame }: Props) => {
  const PlayOkarBarComponent = jurisdictionBarMapping[jurisdiction] || MGABar;

  return (
    <PlayOkarBarComponent
      pauseGame={pauseGame}
      resumeGame={resumeGame}
      className="c-playokay-bar t-background-grey-90 t-color-white u-padding-x u-position-relative"
    />
  );
};
