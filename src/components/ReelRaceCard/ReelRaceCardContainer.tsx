import React from "react";
import * as A from "Types/apollo";
import { ReelRaceCard } from "./ReelRaceCard";
import { useReelRaceOptIn } from "./useReelRaceOptIn";

type Props = {
  reelRace: A.ReelRaceCard_ReelRaceFragment;
};

export const ReelRaceCardContainer = ({ reelRace }: Props) => {
  const { optInAction } = useReelRaceOptIn(reelRace);

  return <ReelRaceCard reelRace={reelRace} optIn={optInAction} />;
};
