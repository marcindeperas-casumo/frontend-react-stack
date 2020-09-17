// @flow

import React from "react";
import { useJurisdiction } from "Utils/hooks";
import { PlayOkayBar } from "./PlayOkayBar";

export type GameProps = {
  slug: string,
};
export type PauseResumeProps = {
  pauseGame: () => Promise<void>,
  resumeGame: () => void,
};

export const PlayOkayBarContainer = ({
  slug,
  pauseGame,
  resumeGame,
}: PauseResumeProps & GameProps) => {
  const { jurisdiction } = useJurisdiction();

  return (
    <PlayOkayBar
      slug={slug}
      jurisdiction={jurisdiction}
      pauseGame={pauseGame}
      resumeGame={resumeGame}
    />
  );
};
