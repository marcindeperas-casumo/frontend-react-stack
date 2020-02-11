// @flow
import React from "react";
import { useMutation } from "@apollo/react-hooks";
import * as A from "Types/apollo";
import { ReelRaceCard } from "./ReelRaceCard";
import { OptInForReelRace } from "./ReelRaceCard.graphql";

type Props = {
  item: A.ReelRaceCard_ReelRace,
};

// __FIX__: this should take a game but because of
// https://github.com/Casumo/frontend-react-stack/blob/master/src/components/ScrollableList/ScrollableList.js#L42
export const ReelRaceCardContainer = ({ item }: Props) => {
  const { id } = item;
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

  return <ReelRaceCard reelRace={item} optIn={optInForReelRace} />;
};
