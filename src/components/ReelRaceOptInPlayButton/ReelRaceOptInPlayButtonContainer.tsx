import * as React from "react";
import * as A from "Types/apollo";
import { useReelRaceOptIn } from "Utils/hooks/useReelRaceOptIn";
import { ReelRaceOptInPlayButton } from "./ReelRaceOptInPlayButton";

type TProps = {
  reelRace: A.ReelRaceCard_ReelRaceFragment;
  variant?: "primary" | "secondary";
  showOptedIn?: boolean;
};

export function ReelRaceOptInPlayButtonContainer(props: TProps) {
  const { optInAction } = useReelRaceOptIn(props.reelRace);

  return <ReelRaceOptInPlayButton {...props} optIn={optInAction} />;
}
