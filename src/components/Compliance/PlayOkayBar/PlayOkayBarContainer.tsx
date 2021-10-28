import React from "react";
import { useJurisdiction } from "Utils/hooks";
import { PlayOkayBar } from "./PlayOkayBar";

export type PauseResumeProps = {
  pauseGame: () => Promise<void>;
  resumeGame: () => void;
};

type Props = {
  gameCategory: string;
};

export const PlayOkayBarContainer = ({ gameCategory }: Props) => {
  const { jurisdiction } = useJurisdiction();
  return (
    <PlayOkayBar jurisdiction={jurisdiction} gameCategory={gameCategory} />
  );
};
