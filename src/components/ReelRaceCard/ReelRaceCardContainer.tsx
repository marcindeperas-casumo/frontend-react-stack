// @flow
import React from "react";
import { useMutation } from "@apollo/client";
import * as A from "Types/apollo";
import { ReelRaceCard } from "./ReelRaceCard";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './ReelRaceCard.graphql' or its... Remove this comment to see the full error message
import { OptInForReelRace } from "./ReelRaceCard.graphql";

type Props = {
  reelRace: A.ReelRaceCard_ReelRace,
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
