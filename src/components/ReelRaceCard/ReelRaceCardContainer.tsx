import React from "react";
import * as A from "Types/apollo";
import { useReelRaceOptIn } from "Utils/hooks/useReelRaceOptIn";
import { ReelRaceCard } from "./ReelRaceCard";

type Props = {
  reelRace: A.ReelRaceCard_ReelRaceFragment;
};

export const ReelRaceCardContainer = ({ reelRace }: Props) => {
  const { optInAction } = useReelRaceOptIn(reelRace);
  return <ReelRaceCard reelRace={reelRace} optIn={optInAction} />;
};
