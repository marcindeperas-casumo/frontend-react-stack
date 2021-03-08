import { useMutation } from "@apollo/client";
import * as React from "react";
import * as A from "Types/apollo";
import type { TReelRacesContentPage } from "Components/ReelRacesPage/ReelRacesPageContainer";
import { ReelRaceScheduleCard } from "./ReelRaceScheduleCard";
import { ReelRaceOptInMutation } from "./ReelRaceScheduleCard.graphql";

type TProps = {
  reelRace: A.ReelRaceScheduleCard_ReelRaceFragment;
  t: TReelRacesContentPage | null;
  expanded: boolean;
};

export function ReelRaceScheduleCardContainer({
  reelRace,
  t,
  expanded = false,
}: TProps) {
  const [optInForReelRace] = useMutation(ReelRaceOptInMutation, {
    variables: {
      id: reelRace.id,
    },
    optimisticResponse: {
      __typename: "Mutation",
      optInForReelRace: {
        __typename: "ReelRace",
        id: reelRace.id,
        optedIn: true,
      },
    },
  });

  return (
    <ReelRaceScheduleCard
      expanded={expanded}
      optInForReelRace={optInForReelRace}
      reelRace={reelRace}
      t={t}
    />
  );
}
