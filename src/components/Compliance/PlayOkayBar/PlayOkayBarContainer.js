// @flow

import React from "react";
import { useJurisdiction } from "Utils/hooks";
import { PlayOkayBar } from "./PlayOkayBar";

export type PauseResumeProps = {
  pauseGame: () => Promise<void>,
  resumeGame: () => void,
};

export const PlayOkayBarContainer = ({
  pauseGame,
  resumeGame,
}: PauseResumeProps) => {
  const { jurisdiction } = useJurisdiction();

  return (
    <PlayOkayBar
      jurisdiction={jurisdiction}
      pauseGame={pauseGame}
      resumeGame={resumeGame}
    />
  );
};
