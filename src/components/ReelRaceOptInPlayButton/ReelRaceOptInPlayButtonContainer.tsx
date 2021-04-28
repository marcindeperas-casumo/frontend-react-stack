import * as React from "react";
import * as A from "Types/apollo";
import { useMutation } from "@apollo/client";
import { ReelRaceOptInPlayButton } from "./ReelRaceOptInPlayButton";
import { ReelRaceOptInMutation } from "./../ReelRaceScheduleCard/ReelRaceScheduleCard.graphql";

type TProps = {
  reelRace: A.ReelRaceScheduleCard_ReelRaceFragment;
  t: A.ReelRaceOptInWidgetQuery["reelRaces"][0]["translations"];
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
