// @flow
import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { ReelRaceCard } from "./ReelRaceCard";
import { OptInForReelRace } from "./ReelRaceCard.graphql";

// __FIX__: this should take a game but because of
// https://github.com/Casumo/frontend-react-stack/blob/master/src/components/ScrollableList/ScrollableList.js#L42
export const ReelRaceCardContainer = ({ item }) => {
  const { id } = item;
  const [optInForReelRace] = useMutation(OptInForReelRace, {
    variables: {
      tournamentId: id,
    },
    optimisticResponse: {
      __typename: "Mutation",
      optInForReelRace: {
        __typename: "ReelRace",
        tournamentId: id,
        optedIn: true,
      },
    },
  });

  return <ReelRaceCard reelRace={item} optIn={optInForReelRace} />;
};
