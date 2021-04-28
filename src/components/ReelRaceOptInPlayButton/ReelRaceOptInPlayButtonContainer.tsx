import * as React from "react";
import { useMutation } from "@apollo/client";
import * as A from "Types/apollo";
import type { TReelRacesContentPage } from "Components/ReelRacesPage/ReelRacesPageContainer";
import { ReelRaceOptInPlayButton } from "./ReelRaceOptInPlayButton";
import { ReelRaceOptInMutation } from "./../ReelRaceScheduleCard/ReelRaceScheduleCard.graphql";

type TProps = {
  reelRace: A.ReelRaceScheduleCard_ReelRaceFragment;
  t: TReelRacesContentPage | null;
};

export function ReelRaceOptInPlayButtonContainer({
  reelRace,
  t,
}: TProps) {
  const [optInForReelRace] = useMutation(ReelRaceOptInMutation, {
    optimisticResponse: {
      __typename: "Mutation",
      optInForReelRace: {
        __typename: "ReelRace",
        id: reelRace.id,
        optedIn: true,
      },
    },
  });

  const optIn = () => optInForReelRace({
    variables: {
      id: reelRace.id,
    },
  });

  return (
    <ReelRaceOptInPlayButton
      optIn={optIn}
      reelRace={reelRace}
      t={t}
    />
  );
}
