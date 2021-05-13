import * as React from "react";
import * as A from "Types/apollo";
import { useReelRaceOptIn } from "Utils/hooks/useReelRaceOptIn";
import { ReelRaceOptInPlayButton } from "./ReelRaceOptInPlayButton";

type TProps = {
  reelRace: A.ReelRaceScheduleCard_ReelRaceFragment;
};

export function ReelRaceOptInPlayButtonContainer({
  reelRace,
}: TProps) {
  const { optInAction } = useReelRaceOptIn(reelRace);
  return (
    <ReelRaceOptInPlayButton
      // expanded={expanded}
      optIn={optInAction}
      reelRace={reelRace}
    />
  );
}
