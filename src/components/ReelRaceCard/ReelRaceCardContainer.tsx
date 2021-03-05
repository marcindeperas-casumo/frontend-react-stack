import { useMutation } from "@apollo/client";
import React from "react";
import * as A from "Types/apollo";
import { ReelRaceCard } from "./ReelRaceCard";
import { OptInForReelRace } from "./ReelRaceCard.graphql";

type Props = {
  reelRace: A.ReelRaceCard_ReelRaceFragment;
};

export const ReelRaceCardContainer = ({ reelRace }: Props) => {
  const { id } = reelRace;
  const [optInForReelRace] = useMutation(OptInForReelRace, {
    variables: {
      id,
    },
    optimisticResponse: {
      __typename: "Mutation",
      optInForReelRace: {
        __typename: "ReelRace",
        id,
        optedIn: true,
      },
    },
  });

  return <ReelRaceCard reelRace={reelRace} optIn={optInForReelRace} />;
};
