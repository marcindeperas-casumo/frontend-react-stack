// @flow
import React from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import * as A from "Types/apollo";
import { ReelRaceCard } from "./ReelRaceCard";
import { OptInForReelRace, ReelRaceCardQuery } from "./ReelRaceCard.graphql";

type Props = {
  reelRace: A.ReelRaceCard_ReelRace,
};

export const ReelRaceCardContainer = ({ reelRace }: Props) => {
  const { id } = reelRace;
  const { data, loading } = useQuery(ReelRaceCardQuery);
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

  return (
    <ReelRaceCard
      reelRace={reelRace}
      optIn={optInForReelRace}
      loading={loading}
      locale={data?.session?.locale}
    />
  );
};
